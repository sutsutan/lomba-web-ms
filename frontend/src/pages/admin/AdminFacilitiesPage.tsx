import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminFacilitiesPage() {
  return <PlaceholderPage title="Fasilitas" description="Kelola inventaris sarana prasarana sekolah" fields={[{ name: 'facility', label: 'Nama Ruang/Fasilitas', type: 'text' }, { name: 'condition', label: 'Kondisi Kelayakan', type: 'text' }]} columns={[{ key: 'facility', label: 'Sarana/Fasilitas' }, { key: 'condition', label: 'Status Kondisi' }]} initialData={[{ id: 1, facility: 'Laboratorium Komputer Enterprise', condition: 'Sangat Baik' }]} />;
}