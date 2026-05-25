import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminAchievementsPage() {
  return <PlaceholderPage title="Prestasi Sekolah" description="Manajemen koleksi piala kejuaraan siswa" fields={[{ name: 'title', label: 'Nama Kejuaraan', type: 'text' }, { name: 'rank', label: 'Juara Ke', type: 'text' }, { name: 'year', label: 'Tahun', type: 'text' }]} columns={[{ key: 'title', label: 'Kejuaraan' }, { key: 'rank', label: 'Peringkat' }, { key: 'year', label: 'Tahun' }]} initialData={[{ id: 1, title: 'Lomba Kompetensi Siswa (LKS) Web Tech', rank: 'Juara 1 Nasional', year: '2025' }]} />;
}