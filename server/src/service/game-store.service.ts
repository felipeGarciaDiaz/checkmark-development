// server/src/gameStore.ts
import { customAlphabet } from "nanoid";
import { GameState, Player, QuizConfig } from "../models/types";

const nanoId = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 6);
const idGen = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12);

class GameStore {
  private games = new Map<string, GameState>();
  private codeToId = new Map<string, string>();

  createGame(config: QuizConfig, hostName: string) {
    const id = idGen();
    let code = nanoId();
    // ensure unique code
    while (this.codeToId.has(code)) code = nanoId();

    const host: Player = {
      id: idGen(),
      name: hostName || "Host",
      joinedAt: Date.now(),
      score: 0,
      answers: {}
    };

    const game: GameState = {
      id,
      code,
      hostId: host.id,
      createdAt: Date.now(),
      config,
      phase: "lobby",
      currentQuestionIndex: -1,
      players: { [host.id]: host }
    };

    this.games.set(id, game);
    this.codeToId.set(code, id);
    return { game, host };
  }

  getById(id: string) {
    return this.games.get(id) || null;
  }

  getByCode(code: string) {
    const id = this.codeToId.get(code);
    return id ? this.getById(id) : null;
  }

  joinGameByCode(code: string, playerName: string) {
    const game = this.getByCode(code);
    if (!game) return null;
    if (game.phase !== "lobby") throw new Error("Game already started");

    const player: Player = {
      id: idGen(),
      name: playerName?.trim() || `Player-${Math.floor(Math.random() * 1000)}`,
      joinedAt: Date.now(),
      score: 0,
      answers: {}
    };
    game.players[player.id] = player;
    return { game, player };
  }

  startGame(id: string) {
    const game = this.getById(id);
    if (!game) throw new Error("Game not found");
    if (game.phase !== "lobby") throw new Error("Game not in lobby");
    game.phase = "in-progress";
    game.currentQuestionIndex = 0;
    return game;
  }

  submitAnswer(gameId: string, playerId: string, answerKey: string) {
    const game = this.getById(gameId);
    if (!game) throw new Error("Game not found");
    if (game.phase !== "in-progress") throw new Error("Game not in progress");
    const player = game.players[playerId];
    if (!player) throw new Error("Player not found");

    const qi = game.currentQuestionIndex;
    if (qi < 0 || qi >= game.config.questions.length) throw new Error("No active question");

    // prevent resubmission
    if (player.answers[qi]) return { game, alreadyAnswered: true };

    const q = game.config.questions[qi];
    const correct = q.correct === answerKey;
    player.answers[qi] = { answerKey, correct, at: Date.now() };
    if (correct) player.score += 1;

    return { game, correct };
  }

  nextQuestion(gameId: string) {
    const game = this.getById(gameId);
    if (!game) throw new Error("Game not found");
    if (game.phase !== "in-progress") throw new Error("Game not in progress");

    if (game.currentQuestionIndex + 1 < game.config.questions.length) {
      game.currentQuestionIndex += 1;
    } else {
      game.phase = "finished";
    }
    return game;
  }

  leaderboard(gameId: string) {
    const game = this.getById(gameId);
    if (!game) throw new Error("Game not found");
    const list = Object.values(game.players)
      .map(p => ({ id: p.id, name: p.name, score: p.score }))
      .sort((a, b) => b.score - a.score);
    return list;
  }

  summary(gameId: string) {
    const game = this.getById(gameId);
    if (!game) throw new Error("Game not found");
    const total = game.config.questions.length;
    const passPct = game.config.settings.passPercentage ?? 60;

    const players = Object.values(game.players).map(p => {
      const pct = total > 0 ? Math.round((p.score / total) * 100) : 0;
      const pass = pct >= passPct;
      return {
        id: p.id,
        name: p.name,
        score: p.score,
        percentage: pct,
        pass
      };
    });

    return { id: game.id, code: game.code, phase: game.phase, total, players };
  }
}

export const store = new GameStore();