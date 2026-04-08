import { useState, useCallback } from 'react';
import { toKey, getMonthKey, eachDayInRange } from '../utils/dates';

const STORAGE_KEY = 'cal_data';
const MONTH_KEY = 'cal_months';

function loadData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function loadMonths() {
  try { return JSON.parse(localStorage.getItem(MONTH_KEY)) || {}; }
  catch { return {}; }
}

export function useCalendarData() {
  const [data, setData] = useState(loadData);
  const [monthNotes, setMonthNotes] = useState(loadMonths);

  const getDayData = useCallback((date) => {
    const key = toKey(date);
    return key ? data[key] || null : null;
  }, [data]);

  const saveDayData = useCallback((start, end, payload) => {
    const days = eachDayInRange(start, end);
    setData(prev => {
      const next = { ...prev };
      days.forEach(d => {
        next[toKey(d)] = payload;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getMonthNote = useCallback((date) => {
    return monthNotes[getMonthKey(date)] || '';
  }, [monthNotes]);

  const saveMonthNote = useCallback((date, note) => {
    setMonthNotes(prev => {
      const next = { ...prev, [getMonthKey(date)]: note };
      localStorage.setItem(MONTH_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { getDayData, saveDayData, getMonthNote, saveMonthNote };
}