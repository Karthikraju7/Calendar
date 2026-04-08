import React from 'react';
import { isSameDay, inRange } from '../../utils/dates';

function hasContent(data) {
  if (!data) return false;
  return (data.note && data.note.trim().length > 0) ||
         (data.todos && data.todos.length > 0);
}

export default function DayCell({ cell, selection, onClick, data }) {
  const { date, current } = cell;
  const { start, end } = selection;

  const isStart  = isSameDay(date, start);
  const isEnd    = isSameDay(date, end);
  const isIn     = inRange(date, start, end);
  const isToday  = isSameDay(date, new Date());
  const isSun    = date.getDay() === 0;
  const isSat    = date.getDay() === 6;

  let cls = 'day-cell';
  if (!current)                           cls += ' faded';
  if (isToday && current)                 cls += ' today';
  if (isStart)                            cls += ' sel-start';
  if (isEnd)                              cls += ' sel-end';
  if (isIn)                               cls += ' in-range';
  if (current && (isSun||isSat) && !isStart && !isEnd) cls += ' weekend';
  if (isStart && isEnd)                   cls += ' sel-single';

  return (
    <button className={cls} onClick={onClick} disabled={!current}>
      <span className="day-num">{date.getDate()}</span>
      {hasContent(data) && <span className="dot" />}
    </button>
  );
}