import { Router } from 'express';
import GameController from '../controllers/games.controllers';

const router = Router();

router.post('/games', (req, res) => GameController.createGame(req, res));
router.post('/games/join', (req, res) => GameController.joinGame(req, res));
router.get('/games/:id', (req, res) => GameController.getGame(req, res));
router.post('/games/:id/start', (req, res) => GameController.startGame(req, res));
router.post('/games/:id/answer', (req, res) => GameController.submitAnswer(req, res));
router.post('/games/:id/next', (req, res) => GameController.nextQuestion(req, res));
router.get('/games/:id/leaderboard', (req, res) => GameController.leaderboard(req, res));
router.get('/games/:id/summary', (req, res) => GameController.summary(req, res));

export default router;
