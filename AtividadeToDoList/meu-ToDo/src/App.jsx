import React, { useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  function handleAddTask(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), done: false }]);
    setInput('');
  }
  function toggleTask(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function removeTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const visibleTasks = tasks.filter(t =>
    filter === 'all'     ? true :
    filter === 'pending' ? !t.done :
    t.done
  );

  const doneCount    = tasks.filter(t => t.done).length;
  const pendingCount = tasks.length - doneCount;

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '1.5rem', lineHeight: '1.4', marginBottom: '1rem' }}>
        Lista de Tarefas
      </h1>

      <p>Total: {tasks.length} | Pendentes: {pendingCount} | Concluídas: {doneCount}</p>

      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nova tarefa..."
        />
        <button type="submit">Adicionar</button>
      </form>

      <div style={{ display: 'flex', gap: 8, margin: '1rem 0' }}>
        {['all', 'pending', 'done'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{ fontWeight: filter === f ? 'bold' : 'normal' }}
          >
            {{ all: 'Todas', pending: 'Pendentes', done: 'Concluídas' }[f]}
          </button>
        ))}
      </div>

      {visibleTasks.length === 0 ? (
        <p>Nenhuma tarefa para exibir.</p>
      ) : (
        visibleTasks.map(task => (
          <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span style={{ textDecoration: task.done ? 'line-through' : 'none', flex: 1 }}>
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)}>Remover</button>
          </div>
        ))
      )}
    </div>
  );
}

export default TodoList;