import React from 'react';
import DayCell from './DayCell';
import { DAYS, getCalendarDays } from '../../utils/dates';

export default function CalendarGrid({ currentDate, selection, onDayClick, getDayData, animDir }) {
  const cells = getCalendarDays(currentDate);

  return (
    <div className={`grid-wrap ${animDir ? `anim-${animDir}` : ''}`}>
      {/* day headers */}
      <div className="day-headers">
        {DAYS.map(d => (
          <div key={d} className={`day-header ${d === 'Sun' || d === 'Sat' ? 'weekend' : ''}`}>
            {d}
          </div>
        ))}
      </div>

      {/* day cells */}
      <div className="day-grid">
        {cells.map((cell, i) => (
          <DayCell
            key={i}
            cell={cell}
            selection={selection}
            onClick={() => cell.current && onDayClick(cell.date)}
            data={cell.current ? getDayData(cell.date) : null}
          />
        ))}
      </div>
    </div>
  );
}