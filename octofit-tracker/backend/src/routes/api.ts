import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const router = Router();

const resourceRoutes = [
  ['users', User],
  ['activities', Activity],
  ['teams', Team],
  ['leaderboard', Leaderboard],
  ['workouts', Workout],
] as const;

for (const [resource, model] of resourceRoutes) {
  router.get(`/${resource}`, async (_request, response, next) => {
    try {
      response.json(await model.find().sort({ createdAt: -1 }).lean());
    } catch (error) {
      next(error);
    }
  });

  router.post(`/${resource}`, async (request, response, next) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });
}

router.use((error: unknown, _request: unknown, response: { status: (code: number) => { json: (body: unknown) => void } }) => {
  const message = error instanceof Error ? error.message : 'Unexpected server error';
  response.status(400).json({ error: message });
});

export default router;
