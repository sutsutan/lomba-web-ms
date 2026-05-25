import React from 'react';
import { Icon } from './Icons';

interface DataItem {
    id: number;
    [key: string]: any;
}

interface DataTableProps<T> {
    columns: {
        key: string;
        label: string;
        render?: (item: T) => React.ReactNode;
    }[];
    data: T[];
    onEdit: (item: T) => void;
    onDelete: (id: number) => void;
    onToggleActive?: (item: T) => void;
}

export function DataTable<T extends DataItem>({
    columns,
    data,
    onEdit,
    onDelete,
    onToggleActive,
}: DataTableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600"
                            >
                                {col.label}
                            </th>
                        ))}
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + 1}
                                className="py-12 text-center text-gray-400"
                            >
                                Belum ada data
                            </td>
                        </tr>
                    ) : (
                        data.map((item, i) => (
                            <tr
                                key={item.id}
                                className={`transition-colors hover:bg-gray-50/70 ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className="px-4 py-3 text-gray-700"
                                    >
                                        {col.render
                                            ? col.render(item)
                                            : String(item[col.key] ?? '')}
                                    </td>
                                ))}
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-end gap-2">
                                        {onToggleActive && (
                                            <button
                                                onClick={() =>
                                                    onToggleActive(item)
                                                }
                                                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                                title="Toggle aktif"
                                            >
                                                <Icon
                                                    name="eye"
                                                    className="h-4 w-4"
                                                />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="rounded-lg p-1.5 text-indigo-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                                        >
                                            <Icon
                                                name="edit"
                                                className="h-4 w-4"
                                            />
                                        </button>
                                        <button
                                            onClick={() => onDelete(item.id)}
                                            className="rounded-lg p-1.5 text-red-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                        >
                                            <Icon
                                                name="trash"
                                                className="h-4 w-4"
                                            />
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
