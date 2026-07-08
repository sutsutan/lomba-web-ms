// AdminTestimoniesPage.tsx
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

// Import komponen admin dari folder components
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';
import { TestimonyBackend } from '@/services/Testimony';

export default function AdminTestimonyPage() {
  const [items, setItems] = useState<TestimonyBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<TestimonyBackend | null>(null);
  const [search, setSearch] = useState('');
  
  const [form, setForm] = useState({ 
    avatar_url: '', 
    role_category: 'student', 
    author_name: '', 
    title_suffix: '', 
    message: '', 
    video_url: '',
    is_active: true 
  });

  const loadTestimonies = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/testimonies');
      const data = res.data.data || res.data;
      setItems(Array.isArray(data) ? data.filter(Boolean) : []);
    } catch (err) {
      console.error("Gagal mengambil data testimoni:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonies();
  }, []);

  const filtered = items.filter(i => 
    StringString(i.author_name || '').toLowerCase().includes(search.toLowerCase()) || 
    StringString(i.message || '').toLowerCase().includes(search.toLowerCase()) ||
    StringString(i.title_suffix || '').toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { 
    setEditing(null); 
    setForm({ avatar_url: '', role_category: 'student', author_name: '', title_suffix: '', message: '', video_url: '', is_active: true }); 
    setModal(true); 
  };

  const openEdit = (item: TestimonyBackend) => { 
    setEditing(item); 
    setForm({ 
      avatar_url: item.avatar_url, 
      role_category: item.role_category, 
      author_name: item.author_name, 
      title_suffix: item.title_suffix, 
      message: item.message, 
      video_url: item.video_url || '',
      is_active: item.is_active 
    }); 
    setModal(true); 
  };

  const save = async () => {
    try {
      if (editing) {
        await api.put(`/api/testimonies/${editing.id}`, form);
      } else {
        await api.post('/api/testimonies', form);
      }
      setModal(false);
      loadTestimonies();
    } catch (err) {
      console.error("Gagal menyimpan testimoni:", err);
      alert("Terjadi kesalahan sistem, silakan periksa kelengkapan form.");
    }
  };

  const del = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data testimoni ini?")) {
      try {
        await api.delete(`/api/testimonies/${id}`);
        loadTestimonies();
      } catch (err) {
        console.error("Gagal menghapus testimoni:", err);
      }
    }
  };

  const roleColors: Record<string, string> = { 
    student: 'blue', 
    parent: 'green', 
    teacher: 'purple', 
    alumni: 'yellow', 
    industry: 'gray' 
  };

  const roleLabels: Record<string, string> = {
    student: 'Siswa',
    parent: 'Orang Tua',
    teacher: 'Guru / Staf',
    alumni: 'Alumni',
    industry: 'Dunia Industri'
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Testimoni" subtitle="Kelola data testimoni dari siswa, orang tua, guru, alumni, dan industri" onAdd={openAdd} />
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama, jabatan, atau isi testimoni..." />
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm font-medium">Memuat data testimoni...</div>
        ) : (
          <DataTable
            columns={[
              { 
                key: 'avatar_url', 
                label: 'Foto / Avatar', 
                render: (item: TestimonyBackend) => (
                  <img 
                    src={item.avatar_url} 
                    className="w-10 h-10 object-cover rounded-full border border-gray-100 shadow-sm" 
                    alt="" 
                    onError={e => (e.currentTarget.src = 'https://placehold.co/40x40/e2e8f0/94a3b8?text=User')} 
                  />
                ) 
              },
              { 
                key: 'author_name', 
                label: 'Nama & Keterangan',
                render: (item: TestimonyBackend) => (
                  <div>
                    <span className="font-semibold text-gray-900 block">{item.author_name}</span>
                    <span className="text-gray-400 text-[11px] block">{item.title_suffix}</span>
                  </div>
                )
              },
              { 
                key: 'role_category', 
                label: 'Kategori', 
                render: (item: TestimonyBackend) => (
                  <Badge color={roleColors[item.role_category] || 'gray'}>
                    {roleLabels[item.role_category] || String(item.role_category || '').toUpperCase()}
                  </Badge>
                ) 
              },
              { 
                key: 'message', 
                label: 'Isi Testimoni', 
                render: (item: TestimonyBackend) => (
                  <span className="text-gray-600 text-xs line-clamp-2 max-w-xs block font-normal">
                    "{item.message}"
                  </span>
                ) 
              },
              { 
                key: 'is_active', 
                label: 'Status', 
                render: (item: TestimonyBackend) => (
                  <Badge color={item.is_active ? 'green' : 'gray'}>
                    {item.is_active ? 'Aktif' : 'Nonaktif'}
                  </Badge>
                ) 
              },
            ]}
            data={filtered}
            onEdit={openEdit}
            onDelete={del}
          />
        )}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Testimoni' : 'Tambah Testimoni'}>
        <div className="space-y-4">
          <ImageUploadField value={form.avatar_url} onChange={url => setForm({ ...form, avatar_url: url })} label="Foto Profil / Logo Instansi" />
          
          <FormField label="Nama Lengkap Penulis" required>
            <input className={inputClass} value={form.author_name} onChange={e => setForm({ ...form, author_name: e.target.value })} placeholder="Contoh: Budi Santoso / Dra. Siti" />
          </FormField>

          <FormField label="Keterangan Jabatan / Status" required hint="Keterangan tambahan di bawah nama">
            <input className={inputClass} value={form.title_suffix} onChange={e => setForm({ ...form, title_suffix: e.target.value })} placeholder="Contoh: Alumni 2022 / HRD PT ABC / Orang Tua Siswa" />
          </FormField>
          
          <FormField label="Kategori Penestimoni" required>
            <select className={selectClass} value={form.role_category} onChange={e => setForm({ ...form, role_category: e.target.value })}>
              <option value="student">Siswa Aktif</option>
              <option value="parent">Orang Tua Siswa</option>
              <option value="teacher">Guru / Staf Sekolah</option>
              <option value="alumni">Alumni Sekolah</option>
              <option value="industry">Mitra Industri / Perusahaan</option>
            </select>
          </FormField>

          <FormField label="Tautan Embed Video YouTube" hint="Contoh: https://www.youtube.com/embed/Ech9a-wIzTM?...">
            <input className={inputClass} value={form.video_url} onChange={e => setForm({ ...form, video_url: e.target.value })} placeholder="Masukkan URL embed pemutar video YouTube" />
          </FormField>
          
          <FormField label="Isi Pesan Testimoni" required>
            <textarea className={textareaClass} rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tuliskan ulasan atau kutipan testimoni di sini..." />
          </FormField>

          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" id="testimony-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="testimony-active" className="text-sm font-medium text-gray-700 select-none">Tampilkan di halaman testimoni utama</label>
          </div>
          
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}