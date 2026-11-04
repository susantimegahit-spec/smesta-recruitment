import React from 'react';
import Icon from './Icon';

export default function StatCard({ label, value, description, icon, color }) {
  return <article className="stat card">
    <span className={`stat-icon ${color}`}><Icon name={icon}/></span>
    <div><small>{label}</small><strong>{value}</strong><p>{description}</p></div>
    <span className="spark">⌁</span>
  </article>;
}
