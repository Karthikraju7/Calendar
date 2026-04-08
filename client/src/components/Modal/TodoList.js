import React, { useState } from 'react';

export default function TodoList({ todos, allTodos, setTodos }) {
  const [input, setInput] = useState('');

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos([...allTodos, { text, completed: false }]);
    setInput('');
  };

  const toggle = (visIdx) => {
    const item = todos[visIdx];
    const idx  = allTodos.indexOf(item);
    if (idx === -1) return;
    const next = [...allTodos];
    next[idx] = { ...next[idx], completed: !next[idx].completed };
    setTodos(next);
  };

  const remove = (visIdx) => {
    const item = todos[visIdx];
    setTodos(allTodos.filter(t => t !== item));
  };

  return (
    <div className="todo-list">
      {/* add input */}
      <div className="todo-input-row">
        <input
          className="todo-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a task and press Enter…"
        />
        <button className="todo-add-btn" onClick={addTodo} aria-label="Add task">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* items */}
      <div className="todo-items">
        {todos.length === 0 && (
          <p className="todo-empty">No tasks yet — add one above</p>
        )}
        {todos.map((todo, i) => (
          <div key={i} className={`todo-item ${todo.completed ? 'done' : ''}`}>
            <button
              className={`todo-check ${todo.completed ? 'checked' : ''}`}
              onClick={() => toggle(i)}
              aria-label="Toggle task"
            >
              {todo.completed && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <span className="todo-text">{todo.text}</span>
            <button className="todo-remove" onClick={() => remove(i)} aria-label="Remove task">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}