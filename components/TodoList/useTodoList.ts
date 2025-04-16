import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Todo } from '@/types/index';

export default function useTodoList() {
  const queryClient = useQueryClient();
  const [filterQuery, setFilterQuery] = useState('');

  const { data, error, isError, isLoading } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch('/api/todos');
      const json = await res.json();
      if (!json.success) {
        throw new Error(json.message || 'Error fetching todos');
      }
      return json.data as Todo[];
    },
  });

  const todos: Todo[] = data ?? [];

  const filteredTodos = todos.filter((todo) => {
    const q = filterQuery.toLowerCase();
    return todo.title.toLowerCase().includes(q) || todo.description.toLowerCase().includes(q);
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(e.target.value);
  };

  const handleUpdateModal = (newTodo: Todo | null, action: 'create' | 'update' | 'delete') => {
    queryClient.setQueryData<Todo[]>(['todos'], (oldData) => {
      if (!oldData) return oldData;
      switch (action) {
        case 'update':
          if (newTodo) {
            return oldData.map((todo) => (todo._id === newTodo._id ? newTodo : todo));
          }
          break;
        case 'delete':
          if (newTodo) {
            return oldData.filter((todo) => todo._id !== newTodo._id);
          }
          break;
        case 'create':
          if (newTodo) {
            return [newTodo, ...oldData];
          }
          break;
        default:
          break;
      }
      return oldData;
    });
  };

  return {
    filterQuery,
    filteredTodos,
    isLoading,
    isError,
    error,
    handleFilterChange,
    handleUpdateModal,
  };
}
