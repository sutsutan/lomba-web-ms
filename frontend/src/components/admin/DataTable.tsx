import React from 'react';
import { Icon } from './Icons';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
  onToggleActive?: (item: T) => void;
}

export default function DataTable<T extends { id: number }>({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onToggleActive 
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {columns.map(col => (
              <th key={col.key} className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                {col.label}
              </th>
            ))}
            <th className="text-right px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-12 text-gray-400">
                Belum ada data
              </td>
            </tr>
          ) : (
            data.map((item, i) => (
              <tr key={item.id} className={`hover:bg-gray-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 text-gray-700">
                    {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {onToggleActive && (
                      <button
                        onClick={() => onToggleActive(item)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                        title="Toggle aktif"
                      >
                        <Icon name="eye" className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1.5 hover:bg-indigo-50 rounded-lg transition-colors text-indigo-400 hover:text-indigo-600"
                    >
                      <Icon name="edit" className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-400 hover:text-red-500"
                    >
                      <Icon name="trash" className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

