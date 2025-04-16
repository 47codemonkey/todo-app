'use client';

import TodoModal from '@/components/TodoModal/TodoModal';
import TodoFilter from '@/components/TodoFilter/TodoFilter';
import useTodoList from './useTodoList';
import useTodoModal from '@/components/TodoModal/useTodoModal';
import { Todo } from '@/types/index';

export default function TodoList() {
  const {
    filterQuery,
    filteredTodos,
    isLoading,
    isError,
    error,
    handleFilterChange,
    handleUpdateModal,
  } = useTodoList();

  const { modalMode, selectedTodo, openModal, closeModal } = useTodoModal();

  const handleTodoClick = (todo: Todo) => {
    openModal(todo, 'edit');
  };

  const handleCreateClick = () => {
    openModal(null, 'create');
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>
      <TodoFilter filterQuery={filterQuery} onFilterChange={handleFilterChange} />
      <div className="text-center mb-4">
        <button
          onClick={handleCreateClick}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create Todo
        </button>
      </div>

      {isError && <div className="text-red-500 mb-4 text-center">Error: {error?.message}</div>}

      {isLoading ? (
        <p className="text-gray-500 text-center">Loading todos...</p>
      ) : filteredTodos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTodos.map((todo: Todo) => (
            <div
              key={todo._id}
              onClick={() => handleTodoClick(todo)}
              className="bg-white rounded shadow p-4 flex flex-col justify-between border border-black cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{todo.title}</h3>
              <p className="text-gray-700">{todo.description}</p>
              <br />
              <p className="text-gray-700">Status: {todo.completed ? 'completed' : 'pending'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No todos found.</p>
      )}

      {modalMode && (
        <TodoModal
          mode={modalMode}
          todo={modalMode === 'edit' ? selectedTodo || undefined : undefined}
          onClose={closeModal}
          onUpdate={handleUpdateModal}
        />
      )}
    </main>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import TodoModal from '@/components/TodoModal/TodoModal';

// interface Todo {
//   _id: string;
//   title: string;
//   description: string;
//   completed: boolean;
// }

// export default function TodoList() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [hasMore, setHasMore] = useState<boolean>(true);
//   const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
//   const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
//   const [filterQuery, setFilterQuery] = useState('');
//   const limit = 10;

//   const fetchTodos = async (skip: number) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/todos?skip=${skip}&limit=${limit}`);
//       const json = await res.json();

//       if (!json.success) {
//         throw new Error(json.message || 'Error fetching todos');
//       }

//       const newTodos: Todo[] = json.data;
//       if (newTodos.length < limit) {
//         setHasMore(false);
//       }
//       setTodos((prev) => [...prev, ...newTodos]);
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.error('Error fetching todos:', err);
//         setError(err.message || 'An error occurred');
//       } else {
//         console.error('Unexpected error fetching todos:', err);
//         setError('An unexpected error occurred');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTodos(0);
//   }, []);

//   const loadMore = () => {
//     fetchTodos(todos.length);
//   };

//   const filteredTodos = todos.filter((todo) => {
//     const q = filterQuery.toLowerCase();
//     return todo.title.toLowerCase().includes(q) || todo.description.toLowerCase().includes(q);
//   });

//   const handleTodoClick = (todo: Todo) => {
//     setSelectedTodo(todo);
//     setModalMode('edit');
//   };

//   const handleUpdateModal = (newTodo: Todo | null, action: 'create' | 'update' | 'delete') => {
//     if (action === 'update' && newTodo) {
//       setTodos((prev) => prev.map((t) => (t._id === newTodo._id ? newTodo : t)));
//     }
//     if (action === 'delete' && selectedTodo) {
//       setTodos((prev) => prev.filter((t) => t._id !== selectedTodo._id));
//     }
//     if (action === 'create' && newTodo) {
//       setTodos((prev) => [newTodo, ...prev]);
//     }
//   };

//   const handleCreateClick = () => {
//     setSelectedTodo(null);
//     setModalMode('create');
//   };

//   return (
//     <main className="p-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>
//       <div className="mb-6 text-center">
//         <input
//           type="text"
//           placeholder="Filter todos..."
//           value={filterQuery}
//           onChange={(e) => setFilterQuery(e.target.value)}
//           className="w-full max-w-md border border-gray-300 p-2 rounded shadow-sm"
//         />
//       </div>
//       <div className="text-center mb-4">
//         <button
//           onClick={handleCreateClick}
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Create Todo
//         </button>
//       </div>

//       {error && <div className="text-red-500 mb-4 text-center">Error: {error}</div>}

//       {todos.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredTodos.map((todo) => (
//             <div
//               key={todo._id}
//               onClick={() => handleTodoClick(todo)}
//               className="bg-white rounded shadow p-4 flex flex-col justify-between border border-black cursor-pointer"
//             >
//               <h3 className="text-xl font-semibold mb-2">{todo.title}</h3>
//               <p className="text-gray-700">{todo.description}</p>
//               <br />
//               <p className="text-gray-700">Status: {todo.completed ? 'completed' : 'pending'}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         !loading && <p className="text-gray-500 text-center">No todos found.</p>
//       )}

//       {hasMore && (
//         <div className="mt-6 text-center">
//           <button
//             onClick={loadMore}
//             disabled={loading}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             {loading ? 'Loading...' : 'Load More'}
//           </button>
//         </div>
//       )}

//       {modalMode && (
//         <TodoModal
//           mode={modalMode}
//           todo={modalMode === 'edit' ? selectedTodo || undefined : undefined}
//           onClose={() => setModalMode(null)}
//           onUpdate={handleUpdateModal}
//         />
//       )}
//     </main>
//   );
// }
