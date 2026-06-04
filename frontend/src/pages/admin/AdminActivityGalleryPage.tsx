import React, { useState } from 'react';

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
}

export default function AdminActivityGalleryPage() {
  const [items, setItems] = useState<ActivityGallery[]>([
    { id: 1, image_url: 'https://placehold.co/300x200/6366f1/fff?text=Coding+Camp', title: 'Workshop Fullstack Web Development', major_code: 'it', activity_date: '2026-05-12', description: 'Kegiatan sinkronisasi kurikulum industri berupa pelatihan coding intensif selama 3 hari bagi siswa kelas XI.', is_featured: true },
    { id: 2, image_url: 'https://placehold.co/300x200/f59e0b/fff?text=Cooking+Class', title: 'Uji Kompetensi Keahlian (UKK) Pastry', major_code: 'culinary', activity_date: '2026-04-20', description: 'Dokumentasi penilaian pembuatan produk kue kontinental oleh asesor eksternal dari Hotel Bintang 5.', is_featured: false },
  ]);

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
    is_featured: false
  });

  // Filter pencarian berdasarkan judul kegiatan atau deskripsi dokumentasi
  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.description.toLowerCase().includes(search.toLowerCase()) ||
    i.major_code.toLowerCase().includes(search.toLowerCase())
  );

  // Aksi Buka Modal Tambah
  const openAdd = () => {
    setEditing(null);
    setForm({ image_url: '', title: '', major_code: 'it', activity_date: new Date().toISOString().split('T')[0], description: '', is_featured: false });
    setModal(true);
  };

  // Aksi Buka Modal Edit
  const openEdit = (item: ActivityGallery) => {
    setEditing(item);
    setForm({ image_url: item.image_url, title: item.title, major_code: item.major_code, activity_date: item.activity_date, description: item.description, is_featured: item.is_featured });
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
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
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
                  {majorLabels[item.major_code] || item.major_code.toUpperCase()}
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