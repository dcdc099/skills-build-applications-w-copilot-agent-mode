import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { API_BASE_URL } from './api';
import './App.css';

const navigation = [
  { path: '/', label: 'Overview', icon: '⌂' },
  { path: '/activities', label: 'Activities', icon: '↗' },
  { path: '/leaderboard', label: 'Leaderboard', icon: '✦' },
  { path: '/teams', label: 'Teams', icon: '◌' },
  { path: '/users', label: 'Members', icon: '○' },
  { path: '/workouts', label: 'Workouts', icon: '＋' },
];

function Overview() {
  return <section className="overview"><div className="welcome-block"><p className="eyebrow">Thursday, August 20</p><h2>Make today<br /><em>count.</em></h2><p className="intro">Small efforts stack up. Pick a plan, move with your crew, and keep your streak alive.</p><NavLink className="primary-action" to="/workouts">Find a workout <span>↗</span></NavLink></div><div className="overview-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="art-core">OF<span>+</span></div><p>OctoFit<br /><strong>tracker</strong></p></div><div className="quick-stats"><div><strong>03</strong><span>Active members</span></div><div><strong>02</strong><span>Training teams</span></div><div><strong>∞</strong><span>Ways to move</span></div></div></section>;
}

function PageContent() {
  const location = useLocation();
  const current = navigation.find((item) => item.path === location.pathname) || navigation[0];
  return <main className="content"><header className="page-header"><div><p className="eyebrow">OctoFit / {current.label}</p><h1>{current.label}</h1></div><div className="api-status"><span /> API connected <small>{API_BASE_URL.replace('/api', '')}</small></div></header><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>;
}

function App() {
  return <div className="app-shell"><aside className="sidebar"><NavLink className="brand" to="/"><span className="brand-mark">OF</span><span>octofit<small>TRACKER</small></span></NavLink><nav className="main-nav" aria-label="Main navigation">{navigation.map((item) => <NavLink className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end={item.path === '/'} key={item.path} to={item.path}><span className="nav-icon">{item.icon}</span>{item.label}</NavLink>)}</nav><div className="sidebar-footer"><span className="pulse-dot" /> <span>School challenge<br /><strong>September sprint</strong></span></div></aside><PageContent /></div>;
}

export default App;
