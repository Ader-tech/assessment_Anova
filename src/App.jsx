import { useState, useEffect } from 'react';
import styles from './App.module.css';
import {
  FaEdit,
  FaTrash,
  FaUndo,
  FaCheck,
} from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';


const initialTasks = [
  {
    id: crypto.randomUUID(),
    title: 'Task Manager',
    description: 'React assessment.',
    dueDate: '2025-07-28',
    status: 'pending',
    createdAt: new Date().toISOString(),
    priority: 'high',
  },
  {
    id: crypto.randomUUID(),
    title: 'Team Meeting',
    description: 'Frontend.',
    dueDate: '2025-07-25',
    status: 'completed',
    createdAt: new Date().toISOString(),
    priority: 'medium',
  },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('tasks'));
      if (stored && stored.length) {
        setTasks(stored);
      } else {
        setTasks(initialTasks);
        localStorage.setItem('tasks', JSON.stringify(initialTasks));
      }
    } catch {
      setError('Error loading tasks.');
    } finally {
      setTimeout(() => setLoading(false), 1000); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, dueDate } = form;
    if (!title.trim()) return setError('Title is required.');
    if (!dueDate) return setError('Due date is required.');

    const taskData = {
      ...form,
      dueDate,
      priority: form.priority || 'medium',
    };

    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t))
      );
      setEditingTask(null);
    } else {
      const newTask = {
        ...taskData,
        id: crypto.randomUUID(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [...prev, newTask]);
    }

    setForm({ title: '', description: '', dueDate: '', priority: 'medium' });
    setShowModal(false);
    setError('');
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === 'completed' ? 'pending' : 'completed',
            }
          : t
      )
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'overdue') {
      return t.status !== 'completed' && new Date(t.dueDate) < new Date();
    }
    return t.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    return 0;
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIdx = result.source.index;
    const destIdx = result.destination.index;

    const newList = Array.from(sortedTasks);
    const draggedTask = newList[sourceIdx];

    if (draggedTask.status === 'completed') return;

    newList.splice(sourceIdx, 1);
    newList.splice(destIdx, 0, draggedTask);

    setTasks(newList);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.app}>
      <h1>Task Dashboard</h1>

      {error && <p className={styles.error}>{error}</p>}
      <button onClick={() => setShowModal(true)} className={styles.addBtn}>+ Add Task</button>

      <div className={styles.filters}>
        {['all', 'pending', 'completed', 'overdue'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? styles.activeFilter : ''}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <div className={styles.headerRow}>
            <span>Title</span>
            <span>Description</span>
            <span>Due Date</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Actions</span>
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="taskList">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {sortedTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                      isDragDisabled={task.status === 'completed'}
                    >
                      {(provided) => (
                        <div
                          className={`${styles.taskRow} ${task.status === 'completed' ? styles.done : ''}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span>{task.title}</span>
                          <span>{task.description}</span>
                          <span>{task.dueDate}</span>
                          <span>{task.status}</span>
                          <span>{task.priority}</span>
                          <span className={styles.actions}>
                            <button onClick={() => toggleStatus(task.id)}>
                              {task.status === 'completed' ? <FaUndo /> : <FaCheck />}
                            </button>
                            <button onClick={() => handleEdit(task)}>
                              <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(task.id)}>
                              <FaTrash />
                            </button>
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <input
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
              />
              <input
                name="dueDate"
                type="date"
                min={today}
                value={form.dueDate}
                onChange={handleChange}
                required
              />
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button type="submit">{editingTask ? 'Update' : 'Add'}</button>
              <button type="button" onClick={() => {
                setShowModal(false);
                setEditingTask(null);
              }}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
