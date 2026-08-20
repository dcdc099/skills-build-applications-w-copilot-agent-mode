import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

// Codespaces endpoint: -8000.app.github.dev/api/teams/
function Teams() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetchCollection('teams').then(setTeams).then(() => setStatus('ready')).catch(() => setStatus('error'));
  }, []);

  return <section className="view-panel"><div className="section-heading"><div><p className="eyebrow">Find your crew</p><h2>Training teams</h2></div><span className="count-badge">{teams.length} teams</span></div>
    {status === 'loading' && <p className="state-message">Loading teams...</p>}
    {status === 'error' && <p className="state-message error">Could not connect to the API.</p>}
    {status === 'ready' && <div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id || team.id || team.name}><div className="team-mark">✦</div><div><h3>{team.name}</h3><p>{team.memberIds?.length || team.members?.length || 0} members</p></div><span className="arrow">↗</span></article>)}</div>}
  </section>;
}

export default Teams;
