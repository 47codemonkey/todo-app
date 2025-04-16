'use client';

import { TodoFilterProps } from '@/types/index';

export default function TodoFilter({ filterQuery, onFilterChange }: TodoFilterProps) {
  return (
    <div className="mb-6 text-center">
      <input
        type="text"
        placeholder="Filter todos..."
        value={filterQuery}
        onChange={onFilterChange}
        className="w-full max-w-md border border-gray-300 p-2 rounded shadow-sm"
      />
    </div>
  );
}
