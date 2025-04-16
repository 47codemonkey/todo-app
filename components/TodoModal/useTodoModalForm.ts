import { useState, useEffect } from 'react';
import { UseTodoModalFormProps } from '@/types/index';

export default function useTodoModalForm({ mode, todo, onClose, onUpdate }: UseTodoModalFormProps) {
  const [title, setTitle] = useState(mode === 'edit' && todo ? todo.title : '');
  const [description, setDescription] = useState(mode === 'edit' && todo ? todo.description : '');
  const [completed, setCompleted] = useState(mode === 'edit' && todo ? todo.completed : false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setCompleted(todo.completed);
    } else {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  }, [mode, todo]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.checked);
  };

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'edit' && todo && todo._id) {
        const res = await fetch(`/api/todos/${todo._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description, completed }),
        });
        const json = await res.json();
        if (!json.success) {
          throw new Error(json.message || 'Failed to update todo');
        }
        onUpdate(json.data, 'update');
        onClose();
      } else if (mode === 'create') {
        const res = await fetch('/api/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description, completed }),
        });
        const json = await res.json();
        if (!json.success) {
          throw new Error(json.message || 'Failed to create todo');
        }
        onUpdate(json.data, 'create');
        onClose();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (mode === 'edit' && todo && todo._id) {
      setLoading(true);
      try {
        const res = await fetch(`/api/todos/${todo._id}`, {
          method: 'DELETE',
        });
        const json = await res.json();
        if (!json.success) {
          throw new Error(json.message || 'Failed to delete todo');
        }
        onUpdate(todo, 'delete');
        onClose();
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as Element).id === 'modalOverlay') {
      onClose();
    }
  };

  return {
    title,
    description,
    completed,
    loading,
    error,
    handleTitleChange,
    handleDescriptionChange,
    handleCompletedChange,
    handleSave,
    handleDelete,
    handleOverlayClick,
  };
}
