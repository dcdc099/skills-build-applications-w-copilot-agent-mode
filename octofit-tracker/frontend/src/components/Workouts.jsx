import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

// Codespaces endpoint: -8000.app.github.dev/api/workouts/
function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).then(() => setStatus('ready')).catch(() => setStatus('error'));
  }, []);

  return <section className="view-panel"><div className="section-heading"><div><p className="eyebrow">Built for your level</p><h2>Workout library</h2></div><span className="count-badge">{workouts.length} plans</span></div>
    {status === 'loading' && <p className="state-message">Loading workouts...</p>}
    {status === 'error' && <p className="state-message error">Could not connect to the API.</p>}
    {status === 'ready' && <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id || workout.title}><div className={`workout-stripe ${workout.fitnessLevel}`} /><p className="eyebrow">{workout.fitnessLevel}</p><h3>{workout.title}</h3><p>{workout.description}</p><footer><span>{workout.durationMinutes} min</span><button type="button" aria-label={`Start ${workout.title}`}>Start ↗</button></footer></article>)}</div>}
  </section>;
}

export default Workouts;
