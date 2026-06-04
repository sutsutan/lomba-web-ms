import React, { useState } from 'react';

// Import komponen admin dari folder components
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';

// Interface Data Explore Gallery
interface ExploreGallery {
  id: number;
  image_url: string;
  title: string;            // Judul/Keterangan Foto Jelajah
  relation_type: string;    // 'organization' | 'news'
  related_to: string;       // Menghubungkan ke kelompok organisasi (leadership, arts, dll) atau judul berita
  publish_date: string;     // Tanggal publikasi galeri
  description: string;      // Detail narasi/konten pelengkap
  is_active: boolean;
}

export default function AdminExploreGalleryPage() {
  const [items, setItems] = useState<ExploreGallery[]>([
    { id: 1, image_url: 'https://placehold.co/300x200/6366f1/fff?text=LDKS', title: 'Pelantikan Pengurus OSIS & LDKS Angkatan Terbaru', relation_type: 'organization', related_to: 'leadership', publish_date: '2026-06-01', description: 'Dokumentasi keseruan dan ketegasan momen Latihan Dasar Kepemimpinan Siswa (LDKS) gabungan di Bumi Perkemahan.', is_active: true },
    { id: 2, image_url: 'https://placehold.co/300x200/10b981/fff?text=Juara+Paskib', title: 'Aksi Tim Paskibraka Sabet Piala Bergilir Provinsi', relation_type: 'news', related_to: 'Berita: Juara Umum Paskibra 2026', publish_date: '2026-05-28', description: 'Foto selebrasi pasukan pengibar bendera sekolah sesaat setelah penyerahan piala juara umum perlombaan baris-berbaris.', is_active: true },
  ]);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<ExploreGallery | null>(null);
  const [search, setSearch] = useState('');

  // Inisialisasi form default
  const [form, setForm] = useState({
    image_url: '',
    title: '',
    relation_type: 'organization',
    related_to: 'leadership',
    publish_date: new Date().toISOString().split('T')[0],
    description: '',
    is_active: true
  });

  // Filter pencarian berdasarkan judul galeri, keterhubungan, atau deskripsi
  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.related_to.toLowerCase().includes(search.toLowerCase()) ||
    i.description.toLowerCase().includes(search.toLowerCase())
  );

  // Aksi Buka Modal Tambah
  const openAdd = () => {
    setEditing(null);
    setForm({ image_url: '', title: '', relation_type: 'organization', related_to: 'leadership', publish_date: new Date().toISOString().split('T')[0], description: '', is_active: true });
    setModal(true);
  };

  // Aksi Buka Modal Edit
  const openEdit = (item: ExploreGallery) => {
    setEditing(item);
    setForm({ image_url: item.image_url, title: item.title, relation_type: item.relation_type, related_to: item.related_to, publish_date: item.publish_date, description: item.description, is_active: item.is_active });
    setModal(true);
  };

  // Aksi Simpan (Create / Update)
  const save = () => {
    if (editing) {
      setItems(items.map(i => i.id === editing.id ? { ...i, ...form } : i));
    } else {
      setItems([...items, { id: Date.now(), ...form }]);
    }
    setModal(false);
  };

  // Aksi Hapus
  const del = (id: number) => setItems(items.filter(i => i.id !== id));

  // Warna badge pembeda tipe keterhubungan
  const typeColors: Record<string, string> = {
    organization: 'blue',
    news: 'purple'
  };

  // Label konversi tipe keterhubungan
  const typeLabels: Record<string, string> = {
    organization: '🔗 Organisasi Siswa',
    news: '📰 Berita & Artikel'
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Jelajah Galeri" subtitle="Kelola dokumentasi visual interaktif yang terhubung langsung dengan Organisasi dan Berita" onAdd={openAdd} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari judul galeri, nama berita/organisasi terkait..." />
        </div>

        <DataTable
          columns={[
            {
              key: 'image_url',
              label: 'Foto Media',
              render: (item: ExploreGallery) => (
                <img 
                  src={item.image_url} 
                  className="w-20 h-12 object-cover rounded-xl border border-gray-100 shadow-sm bg-gray-50" 
                  alt="" 
                  onError={e => (e.currentTarget.src = 'https://placehold.co/80x48/e2e8f0/94a3b8?text=No+Media')} 
                />
              )
            },
            {
              key: 'title',
              label: 'Judul Galeri & Tanggal',
              render: (item: ExploreGallery) => (
                <div>
                  <span className="font-semibold text-gray-900 block leading-tight mb-0.5">{item.title}</span>
                  <span className="text-gray-400 text-[11px] block font-normal">
                    Dipublikasikan: {new Date(item.publish_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              )
            },
            {
              key: 'relation_type',
              label: 'Sumber Terhubung',
              render: (item: ExploreGallery) => (
                <Badge color={typeColors[item.relation_type] || 'gray'}>
                  {typeLabels[item.relation_type] || item.relation_type}
                </Badge>
              )
            },
            {
              key: 'related_to',
              label: 'Nama Relasi / Target',
              render: (item: ExploreGallery) => (
                <span className="text-xs font-medium text-gray-700 capitalize bg-gray-100 px-2 py-1 rounded-md inline-block max-w-[180px] truncate">
                  {item.related_to}
                </span>
              )
            },
            {
              key: 'is_active',
              label: 'Visibilitas',
              render: (item: ExploreGallery) => (
                <Badge color={item.is_active ? 'green' : 'gray'}>
                  {item.is_active ? 'Tampil' : 'Arsip'}
                </Badge>
              )
            },
          ]}
          data={filtered}
          onEdit={openEdit}
          onDelete={del}
        />
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Galeri Jelajah' : 'Unggah Konten Galeri Jelajah'}>
        <div className="space-y-4">
          <ImageUploadField value={form.image_url} onChange={url => setForm({ ...form, image_url: url })} label="File Gambar/Foto Galeri" />

          <FormField label="Judul / Keterangan Singkat Foto" required>
            <input className={inputClass} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Contoh: Penampilan Band Sekolah di Pensi, Liputan Upacara 17 Agustus" />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Hubungkan Konten Ke" required>
              <select className={selectClass} value={form.relation_type} onChange={e => setForm({ ...form, relation_type: e.target.value, related_to: e.target.value === 'organization' ? 'leadership' : '' })}>
                <option value="organization">Organisasi & Ekstrakurikuler</option>
                <option value="news">Berita Utama / Artikel Sekolah</option>
              </select>
            </FormField>

            {form.relation_type === 'organization' ? (
              <FormField label="Rumpun Organisasi Target" required>
                <select className={selectClass} value={form.related_to} onChange={e => setForm({ ...form, related_to: e.target.value })}>
                  <option value="leadership">Leadership (OSIS/MPK)</option>
                  <option value="arts">Arts (Media/Desain/Seni Rupa)</option>
                  <option value="performance">Performance (Musik/Teater/Tari)</option>
                  <option value="character">Character (Pramuka/PMR/Paskib)</option>
                </select>
              </FormField>
            ) : (
              <FormField label="Kata Kunci / Judul Berita Terkait" required>
                <input className={inputClass} value={form.related_to} onChange={e => setForm({ ...form, related_to: e.target.value })} placeholder="Masukkan judul berita terkait..." />
              </FormField>
            )}
          </div>

          <FormField label="Tanggal Dokumentasi" required>
            <input type="date" className={inputClass} value={form.publish_date} onChange={e => setForm({ ...form, publish_date: e.target.value })} />
          </FormField>

          <FormField label="Deskripsi / Kronologi Singkat" required>
            <textarea className={textareaClass} rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Tuliskan ulasan pelengkap dari foto ini yang dapat memandu pengguna saat mengklik gambar..." />
          </FormField>

          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" id="explore-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="explore-active" className="text-sm font-medium text-gray-700 select-none">Aktifkan konten di halaman ekplorasi interaktif umum</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Eksplorasi</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}