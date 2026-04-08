import React, { useState } from 'react';
import TodoList from './TodoList';
import { formatDisplay } from '../../utils/dates';
import './NoteModal.css';

const DAY_OPTIONS = [
  { label: 'Selected range only', value: 'range' },
  { label: 'All Mondays',   value: 1 },
  { label: 'All Tuesdays',  value: 2 },
  { label: 'All Wednesdays',value: 3 },
  { label: 'All Thursdays', value: 4 },
  { label: 'All Fridays',   value: 5 },
  { label: 'All Saturdays', value: 6 },
  { label: 'All Sundays',   value: 0 },
];

export default function NoteModal({ start, end, existing, onSave, onClose, currentDate }) {
  const [note,    setNote]    = useState(existing?.note  || '');
  const [todos,   setTodos]   = useState(existing?.todos || []);
  const [tab,     setTab]     = useState('all');
  const [applyTo, setApplyTo] = useState('range');

  const handleSave = () => {
    const data = { note, todos };
    if (applyTo === 'range') {
      onSave(data);
    } else {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const targets = [];
      for (let d = 1; d <= daysInMonth; d++) {
        const dt = new Date(year, month, d);
        if (dt.getDay() === applyTo) targets.push(dt);
      }
      onSave(data, targets);
    }
  };

  const isSingle   = !end || end.getTime() === start.getTime();
  const rangeLabel = isSingle
    ? formatDisplay(start)
    : `${formatDisplay(start)} — ${formatDisplay(end)}`;

  const displayTodos = tab === 'pending'
    ? todos.filter(t => !t.completed)
    : todos;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        {/* header */}
        <div className="modal-header">
          <div className="modal-header-text">
            <p className="modal-range-label">{rangeLabel}</p>
            <h2 className="modal-title">Notes & Tasks</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* apply-to */}
        <div className="modal-apply">
          <span className="apply-label">Apply to</span>
          <select
            className="apply-select"
            value={applyTo}
            onChange={e => setApplyTo(e.target.value === 'range' ? 'range' : Number(e.target.value))}
          >
            {DAY_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* body */}
        <div className="modal-body">
          {/* notes */}
          <div className="modal-left">
            <label className="field-label">Notes</label>
            <textarea
              className="modal-textarea"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Write anything about this period…"
              autoFocus
            />
          </div>

          {/* todos */}
          <div className="modal-right">
            <div className="modal-right-header">
              <label className="field-label">Tasks</label>
              <div className="tab-pills">
                <button className={`tab-pill ${tab === 'all'     ? 'active' : ''}`} onClick={() => setTab('all')}>All</button>
                <button className={`tab-pill ${tab === 'pending' ? 'active' : ''}`} onClick={() => setTab('pending')}>Pending</button>
              </div>
            </div>
            <TodoList todos={displayTodos} allTodos={todos} setTodos={setTodos} />
          </div>
        </div>

        {/* footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save"   onClick={handleSave}>Save</button>
        </div>

      </div>
    </div>
  );
}