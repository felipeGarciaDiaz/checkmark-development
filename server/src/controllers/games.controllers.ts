import { Request, Response } from 'express';
import Quiz from '../models/quiz.model'; // Add this import
import { store } from '../service/game-store.service';

export class GameController {
    public createGame(req: Request, res: Response) {
        try {
            const config = req.body?.config;
            const hostName = req.body?.hostName || 'Host';
            if (!config || !config.title) return res.status(400).json({ error: 'Invalid config' });

            // Save quiz to MongoDB                                                                                                                                                                                                                                                    RRR.               E.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              3R233RRXSZ.                                                          W`DSa33434
            const quiz = new Quiz(config);
            quiz.save().then((savedQuiz: Quiz) => {
                // Assuming game creation logic; adjust as needed for full game setup
                const gameId = (savedQuiz as Quiz)._id.toString(); // Use MongoDB ID as game ID
                const roomUrl = `/room/${gameId}`;
                return res.json({ gameId, code: 'generated-code', hostId: 'host-id', roomUrl }); // Generate code/hostId as per original logic
            }).catch((err) => {
                console.error('Error saving quiz:', err);
                return res.status(500).json({ error: 'Failed to save quiz' });
            });RRRRRRRR2/                                                                                                                                                                                                                                                                                          
        } catch (err: any) {
            console.error('createGame error', err);
            return res.status(500).json({ error: 'Failed to create game' });
        }
    }

    public joinGame(req: Request, res: Response) {
        try {
            const { code, name } = req.body || {};
            if (!code) return res.status(400).json({ error: 'Missing code' });
            const result = store.joinGameByCode(code, name || 'Player');
            if (!result) return res.status(404).json({ error: 'Game not found' });
            return res.json({ game: result.game, player: result.player });
        } catch (err: any) {
            console.error('joinGame error', err);
            return res.status(400).json({ error: err.message || 'Could not join game' });
        }
    }

    public getGame(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const game = store.getById(id);
            if (!game) return res.status(404).json({ error: 'Game not found' });
            return res.json(game);
        } catch (err: any) {
            console.error('getGame error', err);
            return res.status(500).json({ error: 'Failed to fetch game' });
        }
    }

    public startGame(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const game = store.startGame(id);
            return res.json(game);
        } catch (err: any) {
            console.error('startGame error', err);
            return res.status(400).json({ error: err.message || 'Could not start game' });
        }
    }

    public submitAnswer(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const { playerId, answerKey } = req.body || {};
            if (!playerId || !answerKey) return res.status(400).json({ error: 'Missing playerId or answerKey' });
            const result = store.submitAnswer(id, playerId, answerKey);
            return res.json(result);
        } catch (err: any) {
            console.error('submitAnswer error', err);
            return res.status(400).json({ error: err.message || 'Could not submit answer' });
        }
    }

    public nextQuestion(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const game = store.nextQuestion(id);
            return res.json(game);
        } catch (err: any) {
            console.error('nextQuestion error', err);
            return res.status(400).json({ error: err.message || 'Could not advance question' });
        }
    }

    public leaderboard(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const list = store.leaderboard(id);
            return res.json(list);
        } catch (err: any) {
            console.error('leaderboard error', err);
            return res.status(400).json({ error: err.message || 'Could not get leaderboard' });
        }
    }

    public summary(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const s = store.summary(id);
            return res.json(s);
        } catch (err: any) {
            console.error('summary error', err);
            return res.status(400).json({ error: err.message || 'Could not get summary' });
        }
    }
}

export default new GameController();