import React, { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import MonthNotes from './components/Notes/MonthNotes';
import NoteModal from './components/Modal/NoteModal';
import SelectionBar from './components/Calendar/SelectionBar';
import { useCalendarData } from './hooks/useCalendarData';
import { getTheme } from './utils/theme';
import './App.css';

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  // stage: 'idle' | 'start-picked' | 'range-ready'
  const [selection, setSelection] = useState({ start: null, end: null, stage: 'idle' });
  const [modalOpen, setModalOpen] = useState(false);
  const [animDir, setAnimDir] = useState('');

  const { getDayData, saveDayData, getMonthNote, saveMonthNote } = useCalendarData();
  const theme = getTheme(currentDate);

  const navigate = (dir) => {
    setAnimDir(dir > 0 ? 'next' : 'prev');
    setTimeout(() => setAnimDir(''), 380);
    setCurrentDate(d => {
      const n = new Date(d);
      n.setMonth(n.getMonth() + dir);
      return n;
    });
    clearSelection();
  };

  const clearSelection = () => setSelection({ start: null, end: null, stage: 'idle' });

  const handleDayClick = (date) => {
    const { stage, start } = selection;
    if (stage === 'idle' || stage === 'range-ready') {
      // Step 1: pick start
      setSelection({ start: date, end: null, stage: 'start-picked' });
    } else if (stage === 'start-picked') {
      // Step 2: pick end (can be same day = single)
      const s = date < start ? date : start;
      const e = date < start ? start : date;
      setSelection({ start: s, end: e, stage: 'range-ready' });
    }
  };

  // Step 3: user clicks "Open Notes" confirm button
  const handleConfirm = () => setModalOpen(true);

  const handleSave = (data, customTargets) => {
    if (customTargets) {
      // apply to each custom target date (e.g. all Mondays)
      customTargets.forEach(d => saveDayData(d, d, data));
    } else {
      saveDayData(selection.start, selection.end, data);
    }
    setModalOpen(false);
    clearSelection();
  };

  return (
    <div className="app" style={theme.cssVars}>
      <div className="app-layout">
        <div className="calendar-col">
          <Calendar
            currentDate={currentDate}
            selection={selection}
            onDayClick={handleDayClick}
            onNavigate={navigate}
            getDayData={getDayData}
            theme={theme}
            animDir={animDir}
          />
          <SelectionBar
            selection={selection}
            onConfirm={handleConfirm}
            onClear={clearSelection}
          />
        </div>
        <MonthNotes
          currentDate={currentDate}
          note={getMonthNote(currentDate)}
          onSave={(note) => saveMonthNote(currentDate, note)}
        />
      </div>

      {modalOpen && (
        <NoteModal
          start={selection.start}
          end={selection.end}
          existing={getDayData(selection.start)}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); clearSelection(); }}
          currentDate={currentDate}
        />
      )}
    </div>
  );
}