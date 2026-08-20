import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetchCollection('users').then(setUsers).then(() => setStatus('ready')).catch(() => setStatus('error'));
  }, []);

  return (
    <section className="view-panel">
      <div className="section-heading"><div><p className="eyebrow">Community</p><h2>Members</h2></div><span className="count-badge">{users.length} active</span></div>
      {status === 'loading' && <p className="state-message">Loading members...</p>}
      {status === 'error' && <p className="state-message error">Could not connect to the API.</p>}
      {status === 'ready' && <div className="member-grid">{users.map((user) => <article className="member-card" key={user._id || user.id || user.username}><div className="avatar">{user.username?.slice(0, 2).toUpperCase()}</div><div><h3>{user.username}</h3><p>{user.email}</p></div><span className="level-tag">{user.fitnessLevel}</span></article>)}</div>}
    </section>
  );
}

export default Users;
