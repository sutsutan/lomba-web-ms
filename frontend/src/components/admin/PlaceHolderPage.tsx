import React from 'react';
import PageHeader from '@/components/admin/PageHeader';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title={title} subtitle={description} onAdd={() => {}} />
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center shadow-sm">
        <div className="text-4xl mb-4 select-none">🚧</div>
        <p className="text-gray-500 font-medium">Halaman ini mengikuti pola CRUD yang sama.</p>
        <p className="text-sm text-gray-400 mt-2">
          Buat komponen baru di folder admin dengan menduplikasi pola dari AdminAchievementPage / AdminTeachersPage.
        </p>
      </div>
    </div>
  );
}