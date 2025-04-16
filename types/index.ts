export interface TodoFilterProps {
  filterQuery: string;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface TodoModalProps {
  mode: 'create' | 'edit';
  todo?: Todo;
  onClose: () => void;
  onUpdate: (newTodo: Todo | null, action: 'create' | 'update' | 'delete') => void;
}

export interface UseTodoModalFormProps {
  mode: 'create' | 'edit';
  todo?: Todo;
  onClose: () => void;
  onUpdate: (newTodo: Todo | null, action: 'create' | 'update' | 'delete') => void;
}

export interface UseTodoModalReturn {
  modalMode: 'create' | 'edit' | null;
  selectedTodo: Todo | null;
  openModal: (todo: Todo | null, mode: 'create' | 'edit') => void;
  closeModal: () => void;
}
