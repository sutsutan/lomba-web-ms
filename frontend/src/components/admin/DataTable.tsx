import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';

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
  extraActions?: (item: T) => React.ReactNode;
}

export default function DataTable<T extends { id: number }>({
  columns,
  data,
  onEdit,
  onDelete,
  onToggleActive,
  extraActions,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide"
              >
                {col.label}
              </th>
            ))}

            <th className="text-right px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-12 text-gray-400"
              >
                Belum ada data
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-50 transition-colors ${
                  index % 2 ? "bg-gray-50/30" : ""
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-gray-700">
                    {col.render
                      ? col.render(item)
                      : String(
                          (item as Record<string, unknown>)[col.key] ?? ""
                        )}
                  </td>
                ))}

                <td className="px-4 py-3">
                  <div className="flex justify-end items-center gap-2">

                    {onToggleActive && (
                      <button
                        onClick={() => onToggleActive(item)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="Lihat"
                      >
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                    )}

                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-lg hover:bg-indigo-100 transition"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4 text-indigo-600" />
                    </button>

                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-2 rounded-lg hover:bg-red-100 transition"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>

                    {extraActions && extraActions(item)}

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