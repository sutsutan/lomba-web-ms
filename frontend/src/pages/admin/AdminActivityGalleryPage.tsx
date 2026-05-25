import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminActivityGalleryPage() {
  return <PlaceholderPage title="Galeri Kegiatan" description="Dokumentasi agenda kegiatan internal sekolah" fields={[{ name: 'title', label: 'Nama Kegiatan', type: 'text' }, { name: 'date', label: 'Tanggal Pelaksanaan', type: 'text' }]} columns={[{ key: 'title', label: 'Agenda Acara' }, { key: 'date', label: 'Tanggal Pemotretan' }]} initialData={[{ id: 1, title: 'Upacara Hari Kemerdekaan RI', date: '17 Agustus 2025' }]} />;
}