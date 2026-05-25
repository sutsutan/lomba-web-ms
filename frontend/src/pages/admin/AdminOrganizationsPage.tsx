import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminOrganizationsPage() {
  return <PlaceholderPage title="Organisasi" description="Daftar induk organisasi resmi kesiswaan" fields={[{ name: 'name', label: 'Nama Organisasi', type: 'text' }, { name: 'leader', label: 'Ketua Umum', type: 'text' }]} columns={[{ key: 'name', label: 'Nama Organisasi' }, { key: 'leader', label: 'Ketua Terpilih' }]} initialData={[{ id: 1, name: 'OSIS (Organisasi Siswa Intra Sekolah)', leader: 'Zidan Alamsyah' }]} />;
}