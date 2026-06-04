import React from 'react';
import { Icon } from './Icons';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onAdd?: () => void;
}

export default function PageHeader({ title, subtitle, onAdd }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm shadow-indigo-200"
        >
          <Icon name="plus" className="w-4 h-4" />
          Tambah
        </button>
      )}
    </div>
  );
}