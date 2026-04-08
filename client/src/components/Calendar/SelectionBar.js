import React from 'react';
import { formatDisplay } from '../../utils/dates';
import './SelectionBar.css';

export default function SelectionBar({ selection, onConfirm, onClear }) {
  const { start, end, stage } = selection;

  return (
    <div className={`sel-bar stage-${stage}`}>
      {stage === 'idle' && (
        <span className="sel-hint">Click a date to begin selection</span>
      )}

      {stage === 'start-picked' && (
        <>
          <div className="sel-pills">
            <div className="sel-pill active">
              <span className="pill-label">Start</span>
              <span className="pill-date">{formatDisplay(start)}</span>
            </div>
            <span className="sel-divider">→</span>
            <div className="sel-pill ghost">
              <span className="pill-label">End</span>
              <span className="pill-date">pick a date</span>
            </div>
          </div>
          <button className="sel-action-btn clear" onClick={onClear}>Cancel</button>
        </>
      )}

      {stage === 'range-ready' && (
        <>
          <div className="sel-pills">
            <div className="sel-pill active">
              <span className="pill-label">Start</span>
              <span className="pill-date">{formatDisplay(start)}</span>
            </div>
            <span className="sel-divider">→</span>
            <div className="sel-pill active">
              <span className="pill-label">End</span>
              <span className="pill-date">{formatDisplay(end)}</span>
            </div>
          </div>
          <div className="sel-actions">
            <button className="sel-action-btn clear" onClick={onClear}>✕</button>
            <button className="sel-action-btn confirm" onClick={onConfirm}>Add Notes</button>
          </div>
        </>
      )}
    </div>
  );
}