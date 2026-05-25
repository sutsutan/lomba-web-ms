import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminMajorsPage() {
  return <PlaceholderPage title="Jurusan Sekolah" description="Daftar Kompetensi Keahlian aktif" fields={[{ name: 'name', label: 'Nama Jurusan', type: 'text' }, { name: 'desc', label: 'Deskripsi Singkat', type: 'textarea' }]} columns={[{ key: 'name', label: 'Program Keahlian' }, { key: 'desc', label: 'Keterangan Kompetensi' }]} initialData={[{ id: 1, name: 'Pengembangan Perangkat Lunak dan Gim (PPLG)', desc: 'Fokus pada pemrograman web, mobile, dan pembuatan gim interaktif.' }]} />;
}