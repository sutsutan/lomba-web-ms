import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminTestimoniesPage() {
  return <PlaceholderPage title="Testimoni" description="Kelola ulasan dari para alumni dan orang tua murid" fields={[{ name: 'name', label: 'Nama Lengkap', type: 'text' }, { name: 'role', label: 'Status/Jabatan', type: 'text' }, { name: 'content', label: 'Isi Testimoni', type: 'textarea' }]} columns={[{ key: 'name', label: 'Nama' }, { key: 'role', label: 'Status' }, { key: 'content', label: 'Pesan Singkat' }]} initialData={[{ id: 1, name: 'Budi Santoso', role: 'Alumni 2022 / Software Engineer', content: 'Fasilitas pembelajaran sangat modern!' }]} />;
}