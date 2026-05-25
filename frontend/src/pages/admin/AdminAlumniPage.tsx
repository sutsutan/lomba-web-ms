import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminAlumniPage() {
  return <PlaceholderPage title="Data Alumni" description="Penelusuran penyerapan karir alumni (Tracer Study)" fields={[{ name: 'name', label: 'Nama Alumni', type: 'text' }, { name: 'graduationYear', label: 'Tahun Kelulusan', type: 'text' }, { name: 'status', label: 'Status Sekarang (Kerja/Kuliah)', type: 'text' }]} columns={[{ key: 'name', label: 'Nama Alumni' }, { key: 'graduationYear', label: 'Angkatan' }, { key: 'status', label: 'Status Karir' }]} initialData={[{ id: 1, name: 'Siti Aminah', graduationYear: '2024', status: 'Bekerja di Google Indonesia' }]} />;
}