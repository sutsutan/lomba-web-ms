import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminPartnershipsPage() {
  return <PlaceholderPage title="Kemitraan Industri" description="Kelola hubungan kerja sama Dunia Usaha & Industri (DUDI)" fields={[{ name: 'company', label: 'Nama Perusahaan', type: 'text' }, { name: 'type', label: 'Bentuk Kerja Sama', type: 'text' }]} columns={[{ key: 'company', label: 'Nama Instansi/Perusahaan' }, { key: 'type', label: 'Jenis Hubungan' }]} initialData={[{ id: 1, company: 'PT Teknologi Maju Global', type: 'Penyaluran Kerja & Magang' }]} />;
}