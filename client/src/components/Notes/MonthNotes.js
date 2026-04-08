import React, { useState, useEffect } from 'react';
import { MONTHS } from '../../utils/dates';
import './MonthNotes.css';

const QUOTES = {
  0:  "New year, new discipline.",
  1:  "Stay consistent, no matter what.",
  2:  "Growth begins outside comfort.",
  3:  "Small steps, big change.",
  4:  "Discipline beats motivation.",
  5:  "Stay focused, stay sharp.",
  6:  "Push beyond limits.",
  7:  "Keep going, no excuses.",
  8:  "Consistency creates results.",
  9:  "Embrace the grind.",
  10: "Stay locked in.",
  11: "Finish strong.",
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