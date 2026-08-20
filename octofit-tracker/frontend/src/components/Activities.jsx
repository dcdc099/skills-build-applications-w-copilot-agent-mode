import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetchCollection('activities').then(setActivities).then(() => setStatus('ready')).catch(() => setStatus('error'));
  }, []);

  return (
    <section className="view-panel"><div className="section-heading"><div><p className="eyebrow">Movement log</p><h2>Recent activities</h2></div><span className="count-badge">{activities.length} logged</span></div>
      {status === 'loading' && <p className="state-message">Loading activity...</p>}
      {status === 'error' && <p className="state-message error">Could not connect to the API.</p>}
      {status === 'ready' && <div className="activity-list">{activities.map((activity) => <article className="activity-row" key={activity._id || activity.id}><div className={`activity-icon ${activity.type}`}>{activity.type === 'running' ? '↗' : activity.type === 'walking' ? '→' : '＋'}</div><div className="activity-info"><h3>{activity.type}</h3><p>{activity.durationMinutes} minutes</p></div><strong>+{activity.points} pts</strong></article>)}</div>}
    </section>
  );
}

export default Activities;
