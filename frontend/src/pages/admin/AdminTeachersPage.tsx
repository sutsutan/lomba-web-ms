import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminTeachersPage() {
  return <PlaceholderPage title="Guru & Staf" description="Manajemen direktori tenaga pendidik" fields={[{ name: 'name', label: 'Nama Lengkap & Gelar', type: 'text' }, { name: 'subject', label: 'Mata Pelajaran', type: 'text' }]} columns={[{ key: 'name', label: 'Nama Guru' }, { key: 'subject', label: 'Pengampu Mapel' }]} initialData={[{ id: 1, name: 'Drs. Eko Prasetyo, M.Kom.', subject: 'Pemrograman Berorientasi Objek' }]} />;
}