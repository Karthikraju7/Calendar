import React from 'react';
import { MONTHS } from '../../utils/dates';

export default function HeroImage({ theme, currentDate, onNavigate }) {
  const month = MONTHS[currentDate.getMonth()];
  const year  = currentDate.getFullYear();

  return (
    <div className="hero">
      {/* photo */}
      <div className="hero-photo">
        <img src={theme.image} alt={theme.imageAlt} className="hero-img" />
        {/* subtle bottom gradient so badge text is always legible */}
        <div className="hero-scrim" />
      </div>

      {/* month + year badge — bottom right */}
      <div className="hero-badge">
        <span className="badge-year">{year}</span>
        <span className="badge-month">{month.toUpperCase()}</span>
      </div>

      {/* nav arrows */}
      <button className="nav-btn nav-prev" onClick={() => onNavigate(-1)} aria-label="Previous month">&#8249;</button>
      <button className="nav-btn nav-next" onClick={() => onNavigate(1)}  aria-label="Next month">&#8250;</button>
    </div>
  );
}