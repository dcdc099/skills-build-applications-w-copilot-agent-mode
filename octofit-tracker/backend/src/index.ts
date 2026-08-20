import express from 'express';
import apiRouter from './routes/api.js';
import { connectDatabase, default as database } from './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: database.readyState === 1 ? 'connected' : 'disconnected' });
});

app.use('/api', apiRouter);

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  void connectDatabase();
});