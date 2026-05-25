import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminNewsPage() {
  return <PlaceholderPage title="Berita Sekolah" description="Tulis dan publikasikan artikel portal berita" fields={[{ name: 'title', label: 'Judul Artikel', type: 'text' }, { name: 'date', label: 'Tanggal Rilis', type: 'text' }]} columns={[{ key: 'title', label: 'Judul Berita' }, { key: 'date', label: 'Tanggal Terbit' }]} initialData={[{ id: 1, title: 'SMK Kita Borong Medali Emas LKS Wilayah', date: '12 Mei 2026' }]} />;
}