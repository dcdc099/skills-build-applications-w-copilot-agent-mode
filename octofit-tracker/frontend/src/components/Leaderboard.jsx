import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetchCollection('leaderboard').then(setEntries).then(() => setStatus('ready')).catch(() => setStatus('error'));
  }, []);

  return <section className="view-panel"><div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h2>Monthly leaderboard</h2></div><span className="count-badge">{entries.length} contenders</span></div>
    {status === 'loading' && <p className="state-message">Loading leaderboard...</p>}
    {status === 'error' && <p className="state-message error">Could not connect to the API.</p>}
    {status === 'ready' && <div className="leaderboard-list">{entries.map((entry, index) => <article className={`leaderboard-row rank-${index + 1}`} key={entry._id || entry.id || entry.userId}><span className="rank">{String(index + 1).padStart(2, '0')}</span><div><h3>{entry.userId?.username || `Athlete ${String(entry.userId).slice(-4)}`}</h3><p>{entry.period || 'monthly'} challenge</p></div><strong>{entry.points} pts</strong></article>)}</div>}
  </section>;
}

export default Leaderboard;
