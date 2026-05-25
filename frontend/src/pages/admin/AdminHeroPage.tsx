import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminHeroPage() {
  return <PlaceholderPage title="Hero Background" description="Kelola latar utama website depan" fields={[{ name: 'imageUrl', label: 'URL Gambar Hero', type: 'text' }, { name: 'caption', label: 'Teks Keterangan', type: 'text' }]} columns={[{ key: 'imageUrl', label: 'Tautan Gambar' }, { key: 'caption', label: 'Keterangan Utama' }]} initialData={[{ id: 1, imageUrl: 'https://images.unsplash.com/school', caption: 'Selamat Datang di SMK Unggul' }]} />;
}