import React from 'react';
import { Icon } from './Icons';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Cari..." }: SearchBarProps) {
  return (
    <div className="relative mb-5">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon name="search" className="w-4 h-4" />
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}