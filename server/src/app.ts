import express, { Request, Response } from 'express';
import cors from 'cors';
import gamesRoutes from './routes/games.routes';
import securityRoutes from './routes/security.routes';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose'; // Add this import

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/checkmark', {
  // For lightweight setup, no additional options needed; adjust for production
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/health', (_req: Request, res: Response) => res.json({ status: 'ok' }));

app.use('/api', gamesRoutes);
app.use('/general', securityRoutes);

// Simple waiting room HTML (server-rendered) for hosts
app.get('/room/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  res.redirect(`/quiz/${id}`);
});

export default app;
