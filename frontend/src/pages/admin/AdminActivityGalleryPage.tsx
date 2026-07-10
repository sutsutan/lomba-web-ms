import React, { useState, useEffect } from 'react';
import { getAdminActivityGalleries, createActivityGallery, updateActivityGallery, deleteActivityGallery, archiveActivityGallery, unarchiveActivityGallery } from '@/services/ActivityGallery';

// Import komponen admin dari folder components
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';

// Interface Data Galeri Kegiatan
interface ActivityGallery {
  id: number;
  image_url: string;
  title: string;          // Nama/Judul Kegiatan
  major_code: string;     // 'it' | 'culinary' | 'vcd' | 'hospitality' | 'accounting' | 'general'
  activity_date: string;  // Tanggal Pelaksanaan Kegiatan
  description: string;    // Keterangan singkat foto Dokumentasi
  is_featured: boolean;   // Tampil di highlight beranda utama
  is_archived?: boolean;  // Apakah masuk ke arsip
}

export default function AdminActivityGalleryPage() {
  const [items, setItems] = useState<ActivityGallery[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<ActivityGallery | null>(null);
  const [search, setSearch] = useState('');

  // Inisialisasi form default
  const [form, setForm] = useState({
    image_url: '',
    title: '',
    major_code: 'it',
    activity_date: new Date().toISOString().split('T')[0],
    description: '',
    is_featured: false,
    is_archived: false
  });

  const [viewMode, setViewMode] = useState<'active' | 'archived'>('active');

  // Filter pencarian + arsip
  const filtered = items.filter(i => {
    const matchSearch = String(i.title || '').toLowerCase().includes(search.toLowerCase()) ||
      String(i.description || '').toLowerCase().includes(search.toLowerCase()) ||
      String(i.major_code || '').toLowerCase().includes(search.toLowerCase());
    const matchArchive = viewMode === 'archived' ? i.is_archived : !i.is_archived;
    return matchSearch && matchArchive;
  });

  // Aksi Buka Modal Tambah
  const openAdd = () => {
    setEditing(null);
    setForm({ image_url: '', title: '', major_code: 'it', activity_date: new Date().toISOString().split('T')[0], description: '', is_featured: false, is_archived: false });
    setModal(true);
  };

  // Aksi Buka Modal Edit
  const openEdit = (item: ActivityGallery) => {
    setEditing(item);
    setForm({ image_url: item.image_url, title: item.title, major_code: item.major_code, activity_date: item.activity_date, description: item.description, is_featured: item.is_featured, is_archived: item.is_archived || false });
    setModal(true);
  };

  // Fetch data dari API
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAdminActivityGalleries();
      setItems(Array.isArray(data) ? data.filter(Boolean) : []);
    } catch (error) {
      console.error('Gagal memuat data galeri kegiatan:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Aksi Simpan (Create / Update)
  const save = async () => {
    try {
      if (editing) {
        await updateActivityGallery(editing.id, form);
      } else {
        await createActivityGallery(form);
      }
      setModal(false);
      fetchData();
    } catch (error) {
      console.error('Gagal menyimpan data galeri kegiatan:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
    }
  };

  // Aksi Hapus
  const del = async (id: number) => {
    if (!confirm('Yakin ingin menghapus dokumentasi ini?')) return;
    try {
      await deleteActivityGallery(id);
      fetchData();
    } catch (error) {
      console.error('Gagal menghapus data galeri kegiatan:', error);
      alert('Gagal menghapus data. Silakan coba lagi.');
    }
  };

  // Aksi Arsipkan / Kembalikan
  const toggleArchive = async (item: ActivityGallery) => {
    try {
      if (item.is_archived) {
        await unarchiveActivityGallery(item.id);
      } else {
        await archiveActivityGallery(item.id);
      }
      fetchData();
    } catch (error) {
      console.error('Gagal mengubah status arsip:', error);
      alert('Gagal mengubah status arsip. Silakan coba lagi.');
    }
  };

  // Mapping warna badge berdasarkan klaster jurusan kegiatan
  const majorColors: Record<string, string> = {
    it: 'blue',
    culinary: 'amber',
    vcd: 'purple',
    hospitality: 'green',
    accounting: 'gray',
    general: 'indigo'
  };

  // Mapping teks label untuk penamaan jurusan
  const majorLabels: Record<string, string> = {
    it: 'IT',
    culinary: 'Culinary',
    vcd: 'VCD',
    hospitality: 'Hospitality',
    accounting: 'Accounting',
    general: 'Kegiatan Umum'
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Galeri Kegiatan" subtitle="Dokumentasi foto dan publikasi album kegiatan praktik per jurusan" onAdd={openAdd} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 space-y-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setViewMode('active')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${viewMode === 'active' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Aktif ({items.filter(i => !i.is_archived).length})
            </button>
            <button
              type="button"
              onClick={() => setViewMode('archived')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${viewMode === 'archived' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              📦 Arsip ({items.filter(i => i.is_archived).length})
            </button>
          </div>
          <SearchBar value={search} onChange={setSearch} placeholder="Cari judul kegiatan atau isi dokumentasi..." />
        </div>

        <DataTable
          columns={[
            {
              key: 'image_url',
              label: 'Foto Dokumentasi',
              render: (item: ActivityGallery) => (
                <img 
                  src={item.image_url} 
                  className="w-20 h-12 object-cover rounded-xl border border-gray-100 shadow-sm" 
                  alt="" 
                  onError={e => (e.currentTarget.src = 'https://placehold.co/80x48/e2e8f0/94a3b8?text=No+Image')} 
                />
              )
            },
            {
              key: 'title',
              label: 'Nama Kegiatan & Agenda',
              render: (item: ActivityGallery) => (
                <div>
                  <span className="font-semibold text-gray-900 block">{item.title}</span>
                  <span className="text-gray-400 text-[11px] block">
                    📅 {new Date(item.activity_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              )
            },
            {
              key: 'major_code',
              label: 'Klaster / Jurusan',
              render: (item: ActivityGallery) => (
                <Badge color={majorColors[item.major_code] || 'gray'}>
                  {majorLabels[item.major_code] || String(item.major_code || '').toUpperCase()}
                </Badge>
              )
            },
            {
              key: 'description',
              label: 'Keterangan Foto',
              render: (item: ActivityGallery) => (
                <span className="text-gray-500 text-xs line-clamp-2 max-w-xs block font-normal">
                  {item.description || '-'}
                </span>
              )
            },
            {
              key: 'is_featured',
              label: 'Sorotan',
              render: (item: ActivityGallery) => (
                <Badge color={item.is_featured ? 'purple' : 'gray'}>
                  {item.is_featured ? 'Headline' : 'Reguler'}
                </Badge>
              )
            },
          ]}
          data={filtered}
          onEdit={openEdit}
          onDelete={del}
          extraActions={(item: ActivityGallery) => (
            <button
              type="button"
              onClick={() => toggleArchive(item)}
              title={item.is_archived ? 'Kembalikan dari Arsip' : 'Arsipkan'}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                item.is_archived 
                  ? 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200' 
                  : 'bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              {item.is_archived ? '↩ Pulihkan' : '📦 Arsipkan'}
            </button>
          )}
        />
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Album Kegiatan' : 'Unggah Foto Kegiatan Baru'}>
        <div className="space-y-4">
          <ImageUploadField value={form.image_url} onChange={url => setForm({ ...form, image_url: url })} label="Foto Utama Kegiatan" />

          <FormField label="Nama / Judul Kegiatan Dokumentasi" required>
            <input className={inputClass} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Contoh: Kunjungan Industri PT Telkom, Lomba Masak Tradisional" />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Kategori Pelaksana (Jurusan)" required>
              <select className={selectClass} value={form.major_code} onChange={e => setForm({ ...form, major_code: e.target.value })}>
                <option value="it">IT (Informatika)</option>
                <option value="culinary">Culinary (Tata Boga)</option>
                <option value="vcd">VCD (DKV)</option>
                <option value="hospitality">Hospitality (Perhotelan)</option>
                <option value="accounting">Accounting (Akuntansi)</option>
                <option value="general">Umum (Non-Jurusan)</option>
              </select>
            </FormField>

            <FormField label="Tanggal Pelaksanaan" required>
              <input type="date" className={inputClass} value={form.activity_date} onChange={e => setForm({ ...form, activity_date: e.target.value })} />
            </FormField>
          </div>

          <FormField label="Caption / Keterangan Singkat Dokumentasi" required>
            <textarea className={textareaClass} rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Tuliskan latar belakang acara, peserta yang ikut, atau ringkasan momen penting dalam foto tersebut..." />
          </FormField>

          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" id="gallery-featured" checked={form.is_featured} onChange={e => setForm({ ...form, is_featured: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="gallery-featured" className="text-sm font-medium text-gray-700 select-none">Pin / Sematkan di beranda utama (Sorotan)</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Dokumentasi</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}