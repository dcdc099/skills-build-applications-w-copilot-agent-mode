import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maya_runner', email: 'maya@example.com', fitnessLevel: 'intermediate' },
      { username: 'jordan_moves', email: 'jordan@example.com', fitnessLevel: 'beginner' },
      { username: 'casey_strength', email: 'casey@example.com', fitnessLevel: 'advanced' },
    ]);

    await Team.create([
      { name: 'Trail Blazers', memberIds: [users[0]._id, users[1]._id] },
      { name: 'Power Pack', memberIds: [users[2]._id] },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'running', durationMinutes: 30, points: 45 },
      { userId: users[1]._id, type: 'walking', durationMinutes: 25, points: 20 },
      { userId: users[2]._id, type: 'strength', durationMinutes: 40, points: 50 },
    ]);

    await Leaderboard.create([
      { userId: users[0]._id, points: 245, period: 'monthly' },
      { userId: users[2]._id, points: 220, period: 'monthly' },
      { userId: users[1]._id, points: 180, period: 'monthly' },
    ]);

    await Workout.create([
      {
        title: 'Easy Start Walk',
        description: 'A low-impact walk with a gentle mobility warm-up.',
        fitnessLevel: 'beginner',
        durationMinutes: 20,
      },
      {
        title: 'Steady State Run',
        description: 'Build endurance with a comfortable, consistent running pace.',
        fitnessLevel: 'intermediate',
        durationMinutes: 30,
      },
      {
        title: 'Full Body Strength Circuit',
        description: 'Challenge every major muscle group with a structured circuit.',
        fitnessLevel: 'advanced',
        durationMinutes: 45,
      },
    ]);

    console.log('Database seeding complete: 3 users, 3 activities, 2 teams, 3 leaderboard entries, 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
