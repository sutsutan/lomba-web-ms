import React, { useState } from 'react';

// Import komponen admin dari folder components
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';

// Interface Data Karya / Inovasi Siswa
interface StudentWork {
  id: number;
  preview_url: string;    // Foto produk / mock-up karya
  title: string;          // Nama Produk / Judul Projek
  major_code: string;     // 'it' | 'culinary' | 'vcd' | 'hospitality' | 'accounting'
  creators: string;       // Nama siswa pencipta (bisa individu atau tim)
  project_url: string;    // Link demo (GitHub, Behance, Drive, dll - Opsional)
  description: string;    // Detail fitur / bahan / proses pembuatan
  is_active: boolean;     
}

export default function AdminStudentWorkPage() {
  const [items, setItems] = useState<StudentWork[]>([
    { id: 1, preview_url: 'https://placehold.co/300x200/6366f1/fff?text=App+E-Commerce', title: 'Sistem Informasi Koperasi Sekolah Terintegrasi', major_code: 'it', creators: 'Andi Wijaya & Tim Kelas XII RPL 1', project_url: 'https://github.com', description: 'Aplikasi kasir dan inventory berbasis web menggunakan React dan Node.js untuk mendigitalisasi transaksi koperasi sekolah.', is_active: true },
    { id: 2, preview_url: 'https://placehold.co/300x200/purple/fff?text=Branding+Pack', title: 'Rebranding Identitas Visual UMKM Kripik Lokal', major_code: 'vcd', creators: 'Siti Aminah', project_url: 'https://behance.net', description: 'Projek portofolio perancangan logo baru, kemasan produk (packaging layout), dan strategi aset konten promosi digital.', is_active: true },
  ]);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<StudentWork | null>(null);
  const [search, setSearch] = useState('');

  // Inisialisasi form default
  const [form, setForm] = useState({
    preview_url: '',
    title: '',
    major_code: 'it',
    creators: '',
    project_url: '',
    description: '',
    is_active: true
  });

  // Filter pencarian berdasarkan judul projek, nama pencipta, atau deskripsi produk
  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.creators.toLowerCase().includes(search.toLowerCase()) ||
    i.description.toLowerCase().includes(search.toLowerCase())
  );

  // Aksi Buka Modal Tambah
  const openAdd = () => {
    setEditing(null);
    setForm({ preview_url: '', title: '', major_code: 'it', creators: '', project_url: '', description: '', is_active: true });
    setModal(true);
  };

  // Aksi Buka Modal Edit
  const openEdit = (item: StudentWork) => {
    setEditing(item);
    setForm({ preview_url: item.preview_url, title: item.title, major_code: item.major_code, creators: item.creators, project_url: item.project_url, description: item.description, is_active: item.is_active });
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

  // Mapping warna badge sesuai jurusan karya
  const majorColors: Record<string, string> = {
    it: 'blue',
    culinary: 'amber',
    vcd: 'purple',
    hospitality: 'green',
    accounting: 'gray'
  };

  // Mapping label singkatan jurusan
  const majorLabels: Record<string, string> = {
    it: 'IT / RPL',
    culinary: 'Culinary / Boga',
    vcd: 'VCD / DKV',
    hospitality: 'Hospitality',
    accounting: 'Accounting'
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Karya & Inovasi Siswa" subtitle="Kelola portofolio produk kreatif, aplikasi, dan hasil projek unggulan siswa" onAdd={openAdd} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama projek, atau siswa pencipta..." />
        </div>

        <DataTable
          columns={[
            {
              key: 'preview_url',
              label: 'Mockup / Produk',
              render: (item: StudentWork) => (
                <img 
                  src={item.preview_url} 
                  className="w-16 h-12 object-cover rounded-xl border border-gray-100 shadow-sm bg-gray-50" 
                  alt="" 
                  onError={e => (e.currentTarget.src = 'https://placehold.co/64x48/e2e8f0/94a3b8?text=Projek')} 
                />
              )
            },
            {
              key: 'title',
              label: 'Nama Karya & Kreator',
              render: (item: StudentWork) => (
                <div>
                  <span className="font-semibold text-gray-900 block leading-tight mb-0.5">{item.title}</span>
                  <span className="text-gray-400 text-[11px] block font-normal">Oleh: {item.creators}</span>
                </div>
              )
            },
            {
              key: 'major_code',
              label: 'Asal Jurusan',
              render: (item: StudentWork) => (
                <Badge color={majorColors[item.major_code] || 'gray'}>
                  {majorLabels[item.major_code] || item.major_code.toUpperCase()}
                </Badge>
              )
            },
            {
              key: 'project_url',
              label: 'Tautan Demo',
              render: (item: StudentWork) => item.project_url ? (
                <a 
                  href={item.project_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex text-indigo-600 hover:text-indigo-800 text-xs font-semibold underline truncate max-w-[120px]"
                >
                  Buka Tautan ↗
                </a>
              ) : (
                <span className="text-gray-400 text-xs font-normal">-</span>
              )
            },
            {
              key: 'is_active',
              label: 'Status Tampilan',
              render: (item: StudentWork) => (
                <Badge color={item.is_active ? 'green' : 'gray'}>
                  {item.is_active ? 'Publik' : 'Draft'}
                </Badge>
              )
            },
          ]}
          data={filtered}
          onEdit={openEdit}
          onDelete={del}
        />
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Portofolio Karya' : 'Tambah Karya Siswa Baru'}>
        <div className="space-y-4">
          <ImageUploadField value={form.preview_url} onChange={url => setForm({ ...form, preview_url: url })} label="Foto Sampul / Gambar Produk Karya" />

          <FormField label="Nama Produk / Judul Inovasi" required>
            <input className={inputClass} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Contoh: Aplikasi Smart Trash, Food Truck Pastry Concept" />
          </FormField>

          <FormField label="Nama Pencipta / Kreator" required hint="Gunakan tanda '&' atau 'Tim' jika dikerjakan kelompok">
            <input className={inputClass} value={form.creators} onChange={e => setForm({ ...form, creators: e.target.value })} placeholder="Contoh: Rian Gunawan / Tim Kelas XII DKV 2" />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Rumpun Kompetensi (Jurusan)" required>
              <select className={selectClass} value={form.major_code} onChange={e => setForm({ ...form, major_code: e.target.value })}>
                <option value="it">IT (Informatika)</option>
                <option value="culinary">Culinary (Tata Boga)</option>
                <option value="vcd">VCD (DKV)</option>
                <option value="hospitality">Hospitality (Perhotelan)</option>
                <option value="accounting">Accounting (Akuntansi)</option>
              </select>
            </FormField>

            <FormField label="URL Tautan Eksternal (Opsional)" hint="Link portofolio/video/live demo">
              <input type="url" className={inputClass} value={form.project_url} onChange={e => setForm({ ...form, project_url: e.target.value })} placeholder="https://github.com/... atau lainnya" />
            </FormField>
          </div>

          <FormField label="Spesifikasi & Rincian Deskripsi Karya" required>
            <textarea className={textareaClass} rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Jelaskan keunggulan projek, alat/bahan yang dipakai, tantangan yang diselesaikan, atau fitur utama produk di sini..." />
          </FormField>

          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" id="work-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="work-active" className="text-sm font-medium text-gray-700 select-none">Publikasikan karya ini di halaman portofolio siswa utama</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Portofolio</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}