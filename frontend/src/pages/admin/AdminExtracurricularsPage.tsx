import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminExtracurricularsPage() {
  return <PlaceholderPage title="Ekskul" description="Kelola organisasi unit ekstrakurikuler" fields={[{ name: 'name', label: 'Nama Ekskul', type: 'text' }, { name: 'coach', label: 'Guru Pembina', type: 'text' }]} columns={[{ key: 'name', label: 'Ekstrakurikuler' }, { key: 'coach', label: 'Pembina Latihan' }]} initialData={[{ id: 1, name: 'Cyber Security Club', coach: 'Rian Hidayat, S.T.' }]} />;
}