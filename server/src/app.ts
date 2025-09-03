
// Create a new game
import express, { Request, Response } from "express";
import cors from "cors";
import { store } from "./service/game-store.service";
import { QuizConfig, GameState } from "./models/types";
import crypto from 'crypto'
import { readFileSync } from "fs";
import { join } from "path";
const app = express();

// --- Logging middleware ---
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Body:`, req.body);
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Allow requests from anywhere (or replace with your Codespace URL)
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "1mb" }));

// --- Type helpers ---
interface CreateGameRequest {
  config: QuizConfig;
  hostName?: string;
}

interface JoinGameRequest {
  code: string;
  playerName?: string;
}

interface SubmitAnswerRequest {
  playerId: string;
  answerKey: string;
}

// --- REST ENDPOINTS ---

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  console.log("Health check requested");
  res.json({ ok: true, time: Date.now() });
});

// Create a new game
app.post("/api/games", (req: Request<{}, {}, any>, res: Response) => {
  // Accept either a JSON payload with `config` or a submitted form with fields:
  // - title
  // - questions (JSON string or array)
  // - any other config fields
  const hostName = req.body?.hostName;
  console.log("Create game (form/json) request:", { body: req.body });

  let config: QuizConfig | undefined;

  // If client submitted the full config as JSON { config: { ... } }
  if (req.body?.config) {
    config = req.body.config as QuizConfig;
  } else {
    // Try to build a config from form fields
    const { title, questions, ...rest } = req.body || {};
    if (title) {
      let parsedQuestions: any = questions;
      if (typeof questions === "string") {
        try {
          parsedQuestions = JSON.parse(questions);
        } catch (err) {
          console.warn("Failed to parse questions JSON string:", err);
          parsedQuestions = undefined;
        }
      }
      if (Array.isArray(parsedQuestions)) {
        config = { title, questions: parsedQuestions, ...rest } as QuizConfig;
      }
    }
  }

  if (!config?.title || !Array.isArray(config?.questions) || config.questions.length === 0) {
    console.warn("Invalid config in create game");
    return res.status(400).json({ error: "Invalid config" });
  }

  try {
    const { game, host } = store.createGame(config, hostName || "Host");
    const roomUrl = `/room/${game.id}?code=${encodeURIComponent(game.code)}`;

    console.log("Game created:", { gameId: game.id, code: game.code, hostId: host.id, roomUrl });

    // If the client expects JSON (AJAX), return details including a room URL.
    // Otherwise redirect the user to a room page that can show join instructions (code).
    const acceptsJson = req.headers.accept?.includes("application/json");
    if (acceptsJson) {
      return res.status(201).json({ gameId: game.id, code: game.code, hostId: host.id, roomUrl });
    } else {
      return res.redirect(303, roomUrl);
    }
  } catch (err: any) {
    console.error("Failed to create game:", err?.message ?? err);
    return res.status(500).json({ error: "Failed to create game", details: err?.message ?? String(err) });
  }
});


// Join an existing game
app.post("/api/games/join", (req: Request<{}, {}, JoinGameRequest>, res: Response) => {
  const { code } = req.body;
  const playerName = crypto.randomUUID().slice(0,8).toString();
  console.log("Join game request:", { code, playerName });
  try {
    const result = store.joinGameByCode(code, playerName || "");
    if (!result) {
      console.warn("Game not found for code:", code);
      return res.status(404).json({ error: "Game not found" });
    }
    console.log("Player joined game:", { gameId: result.game.id, player: result.player });
    res.json({ gameId: result.game.id, player: result.player });
  } catch (err: any) {
    console.error("Error joining game:", err.message);
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/games/dc", (req: Request, res: Response) => {
  console.log("Create game from default config requested");
  try {
    const configPath = join(__dirname, "..", "..", "config", "config.json");
    const configData = readFileSync(configPath, "utf-8");
    const config = JSON.parse(configData);
    if (!config?.title || !Array.isArray(config?.questions) || config.questions.length === 0) {
      console.warn("Invalid config in /api/games/dc");
      return res.status(400).json({ error: "Invalid config" });
    }
    const { game, host } = store.createGame(config, "Host");
    console.log("Game created from default config:", { gameId: game.id, code: game.code, hostId: host.id });
    res.json({ gameId: game.id, code: game.code, hostId: host.id });
  } catch (err: any) {
    console.error("Failed to create game from default config:", err.message);
    res.status(500).json({ error: "Failed to create game from default config", details: err.message });
  }
});

// Get game state
app.get("/api/games/:id", (req: Request<{ id: string }>, res: Response<GameState | { error: string }>) => {
  const gameId = req.params.id;
  console.log("Get game state requested:", { gameId });
  const game = store.getById(gameId);
  if (!game) {
    console.warn("Game not found:", gameId);
    return res.status(404).json({ error: "Not found" });
  }
  res.json(game);
});

// Start game
app.post("/api/games/:id/start", (req: Request<{ id: string }>, res: Response<GameState | { error: string }>) => {
  const gameId = req.params.id;
  console.log("Start game requested:", { gameId });
  try {
    const game = store.startGame(gameId);
    console.log("Game started:", { gameId });
    res.json(game);
  } catch (err: any) {
    console.error("Error starting game:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Submit answer
app.post("/api/games/:id/answer", (req: Request<{ id: string }, {}, SubmitAnswerRequest>, res: Response) => {
  const gameId = req.params.id;
  const { playerId, answerKey } = req.body;
  console.log("Submit answer requested:", { gameId, playerId, answerKey });
  try {
    const result = store.submitAnswer(gameId, playerId, answerKey);
    console.log("Answer submitted:", { gameId, playerId, answerKey });
    res.json(result);
  } catch (err: any) {
    console.error("Error submitting answer:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Next question
app.post("/api/games/:id/next", (req: Request<{ id: string }>, res: Response) => {
  const gameId = req.params.id;
  console.log("Next question requested:", { gameId });
  try {
    const game = store.nextQuestion(gameId);
    if (game.phase === "finished") {
      console.log("Game finished, returning summary:", { gameId });
      res.json(store.summary(game.id));
    } else {
      console.log("Advanced to next question:", { gameId, currentQuestionIndex: game.currentQuestionIndex });
      res.json({ currentQuestionIndex: game.currentQuestionIndex });
    }
  } catch (err: any) {
    console.error("Error advancing to next question:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Leaderboard
app.get("/api/games/:id/leaderboard", (req: Request<{ id: string }>, res: Response) => {
  const gameId = req.params.id;
  console.log("Leaderboard requested:", { gameId });
  try {
    res.json(store.leaderboard(gameId));
  } catch (err: any) {
    console.error("Error getting leaderboard:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Summary
app.get("/api/games/:id/summary", (req: Request<{ id: string }>, res: Response) => {
  const gameId = req.params.id;
  console.log("Summary requested:", { gameId });
  try {
    res.json(store.summary(gameId));
  } catch (err: any) {
    console.error("Error getting summary:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Quiz backend running at http://localhost:${PORT}`);
});