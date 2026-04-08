import React, { useState, useEffect } from 'react';
import { MONTHS } from '../../utils/dates';
import './MonthNotes.css';

const QUOTES = {
  0:  "Forget resolutions. Build discipline.",
  1:  "Consistency creates results.",
  2:  "Dont live like a mediocre.",
  3:  "You are never behind.",
  4:  "Discipline beats motivation.",
  5:  "The harder you work, the luckier you get.",
  6:  "Push beyond your limits.",
  7:  "You cut corners and you are not gonna make it.",
  8:  "The more often you get uncomfortable the stronger you’ll become.",
  9:  "Just Grind.",
  10: "No more taking the easy way out!",
  11: "You’ve handled worse. Keep going.",
};

export default function MonthNotes({ currentDate, note, onSave }) {
  const [text, setText] = useState(note);

  useEffect(() => { setText(note); }, [note]);

  const handleBlur = () => { if (text !== note) onSave(text); };

  const monthIndex = currentDate.getMonth();
  const month = MONTHS[monthIndex];
  const quote = QUOTES[monthIndex];

  return (
    <div className="month-notes">
      <div className="mn-header">
        <h3 className="mn-title">Notes for {month}</h3>
      </div>

      <p className="mn-quote">{quote}</p>

      <textarea
        className="mn-textarea"
        value={text}
        onChange={e => setText(e.target.value)}
        onBlur={handleBlur}
        placeholder={`Goals, reminders, reflections for ${month}…`}
      />

      <p className="mn-hint">Auto-saved on blur</p>
    </div>
  );
}