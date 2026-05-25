import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminStudentWorksPage() {
  return <PlaceholderPage title="Karya Siswa" description="Etalase portofolio projek kreatif siswa" fields={[{ name: 'workTitle', label: 'Judul Projek', type: 'text' }, { name: 'student', label: 'Siswa Pembuat', type: 'text' }]} columns={[{ key: 'workTitle', label: 'Nama Aplikasi/Karya' }, { key: 'student', label: 'Kreator' }]} initialData={[{ id: 1, workTitle: 'Aplikasi Manajemen SKS Sekolah berbasis IoT', student: 'Andi Wijaya' }]} />;
}