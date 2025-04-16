'use client';

import useTodoModalForm from './useTodoModalForm';
import { TodoModalProps } from '@/types/index';

export default function TodoModal({ mode, todo, onClose, onUpdate }: TodoModalProps) {
  const {
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
  } = useTodoModalForm({ mode, todo, onClose, onUpdate });

  return (
    <div
      id="modalOverlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      <div className="bg-white p-6 rounded border-2 border-blue-500 shadow-lg w-11/12 max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold">
          &times;
        </button>
        <h2 className="text-2xl mb-4">{mode === 'edit' ? 'Edit Todo' : 'Create Todo'}</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={handleCompletedChange}
            className="mr-2"
          />
          <label htmlFor="completed" className="text-sm">
            Completed
          </label>
        </div>
        <div className="flex justify-end space-x-2">
          {mode === 'edit' && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading
              ? mode === 'edit'
                ? 'Saving...'
                : 'Creating...'
              : mode === 'edit'
              ? 'Save'
              : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}
