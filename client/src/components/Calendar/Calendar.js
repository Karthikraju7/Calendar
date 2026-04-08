import React from 'react';
import HeroImage from './HeroImage';
import CalendarGrid from './CalendarGrid';
import './Calendar.css';

export default function Calendar({ currentDate, selection, onDayClick, onNavigate, getDayData, theme, animDir }) {
  return (
    <div className="calendar-card">
      <HeroImage theme={theme} currentDate={currentDate} onNavigate={onNavigate} />
      <CalendarGrid
        currentDate={currentDate}
        selection={selection}
        onDayClick={onDayClick}
        getDayData={getDayData}
        animDir={animDir}
      />
    </div>
  );
}