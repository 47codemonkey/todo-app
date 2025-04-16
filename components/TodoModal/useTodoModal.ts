import { useState } from 'react';
import { UseTodoModalReturn } from '@/types/index';
import { Todo } from '@/types/index';

export default function useTodoModal(): UseTodoModalReturn {
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const openModal = (todo: Todo | null, mode: 'create' | 'edit') => {
    setSelectedTodo(todo);
    setModalMode(mode);
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setModalMode(null);
  };

  return { modalMode, selectedTodo, openModal, closeModal };
}
