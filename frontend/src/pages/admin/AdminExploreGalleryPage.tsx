import React from 'react';
import PlaceholderPage from '../../components/admin/PlaceHolderPage';
export default function AdminExploreGalleryPage() {
  return <PlaceholderPage title="Galeri Eksplorasi" description="Terhubung dengan jejaring organisasi dan media luar" fields={[{ name: 'event', label: 'Nama Event Eksplorasi', type: 'text' }, { name: 'source', label: 'Instansi Terkait', type: 'text' }]} columns={[{ key: 'event', label: 'Nama Event' }, { key: 'source', label: 'Mitra Eksternal' }]} initialData={[{ id: 1, event: 'Kunjungan Studi Banding Politeknik', source: 'Humas Politeknik Negeri' }]} />;
}