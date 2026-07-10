import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';
import { TestimonyBackend } from '@/services/Testimony';
import { toYoutubeEmbedUrl } from '@/lib/youtube';

export default function AdminTestimonyPage() {
  const [items, setItems] = useState<TestimonyBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<TestimonyBackend | null>(null);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    profile_picture: '',
    from_type: 'student',
    name: '',
    alias: '',
    quote: '',
    video_url: '',
    is_active: true,
  });

  const videoUrlPreview = toYoutubeEmbedUrl(form.video_url);

  const loadTestimonies = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/testimonies?per_page=1000');
      const data = res.data.data || res.data;
      setItems(Array.isArray(data) ? data.filter(Boolean) : []);
    } catch (err) {
      console.error("Gagal mengambil data testimoni:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonies();
  }, []);

  const filtered = items.filter(i =>
    String(i.name || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.quote || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.alias || '').toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ profile_picture: '', from_type: 'student', name: '', alias: '', quote: '', video_url: '', is_active: true });
    setModal(true);
  };

  const openEdit = (item: TestimonyBackend) => {
    setEditing(item);
    setForm({
      profile_picture: item.profile_picture || '',
      from_type: item.from_type,
      name: item.name,
      alias: item.alias || '',
      quote: item.quote,
      video_url: item.video_url || '',
      is_active: item.is_active,
    });
    setModal(true);
  };

  const save = async () => {
    try {
      if (editing) {
        await api.put(`/admin/testimonies/${editing.id}`, form);
      } else {
        await api.post('/admin/testimonies', form);
      }
      setModal(false);
      loadTestimonies();
    } catch (err: any) {
      console.error("Gagal menyimpan testimoni:", err.response?.data);
      alert(JSON.stringify(err.response?.data, null, 2));
    }
  };

  const del = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data testimoni ini?")) {
      try {
        await api.delete(`/admin/testimonies/${id}`);
        loadTestimonies();
      } catch (err) {
        console.error("Gagal menghapus testimoni:", err);
      }
    }
  };

  const roleColors: Record<string, string> = {
    student: 'blue',
    parents: 'green',
    teacher: 'purple',
    alumni: 'yellow',
    industry: 'gray',
  };

  const roleLabels: Record<string, string> = {
    student: 'Siswa',
    parents: 'Orang Tua',
    teacher: 'Guru / Staf',
    alumni: 'Alumni',
    industry: 'Dunia Industri',
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
                key: 'profile_picture',
                label: 'Foto / Avatar',
                render: (item: TestimonyBackend) => (
                  <img
                    src={item.profile_picture || ''}
                    className="w-10 h-10 object-cover rounded-full border border-gray-100 shadow-sm"
                    alt=""
                    onError={e => (e.currentTarget.src = 'https://placehold.co/40x40/e2e8f0/94a3b8?text=User')}
                  />
                )
              },
              {
                key: 'name',
                label: 'Nama & Keterangan',
                render: (item: TestimonyBackend) => (
                  <div>
                    <span className="font-semibold text-gray-900 block">{item.name}</span>
                    <span className="text-gray-400 text-[11px] block">{item.alias}</span>
                  </div>
                )
              },
              {
                key: 'from_type',
                label: 'Kategori',
                render: (item: TestimonyBackend) => (
                  <Badge color={roleColors[item.from_type] || 'gray'}>
                    {roleLabels[item.from_type] || String(item.from_type || '').toUpperCase()}
                  </Badge>
                )
              },
              {
                key: 'quote',
                label: 'Isi Testimoni',
                render: (item: TestimonyBackend) => (
                  <span className="text-gray-600 text-xs line-clamp-2 max-w-xs block font-normal">
                    "{item.quote}"
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
          <ImageUploadField value={form.profile_picture} onChange={url => setForm({ ...form, profile_picture: url })} label="Foto Profil / Logo Instansi" />

          <FormField label="Nama Lengkap Penulis" required>
            <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Budi Santoso / Dra. Siti" />
          </FormField>

          <FormField label="Keterangan Jabatan / Status" hint="Keterangan tambahan di bawah nama">
            <input className={inputClass} value={form.alias} onChange={e => setForm({ ...form, alias: e.target.value })} placeholder="Contoh: Alumni 2022 / HRD PT ABC / Orang Tua Siswa" />
          </FormField>

          <FormField label="Kategori Penestimoni" required>
            <select className={selectClass} value={form.from_type} onChange={e => setForm({ ...form, from_type: e.target.value })}>
              <option value="student">Siswa Aktif</option>
              <option value="parents">Orang Tua Siswa</option>
              <option value="teacher">Guru / Staf Sekolah</option>
              <option value="alumni">Alumni Sekolah</option>
              <option value="industry">Mitra Industri / Perusahaan</option>
            </select>
          </FormField>

          <FormField label="Tautan Video YouTube" hint="Tempel link apa saja: youtube.com/watch?v=..., youtu.be/..., atau link share biasa">
            <input
              className={inputClass}
              value={form.video_url}
              onChange={e => setForm({ ...form, video_url: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            {form.video_url && !videoUrlPreview && (
              <p className="mt-1 text-xs text-red-500">
                Link tidak dikenali sebagai video YouTube yang valid.
              </p>
            )}
            {videoUrlPreview && (
              <p className="mt-1 text-xs text-green-600">✓ Link valid, siap ditampilkan.</p>
            )}
          </FormField>

          <FormField label="Isi Pesan Testimoni" required>
            <textarea className={textareaClass} rows={4} value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} placeholder="Tuliskan ulasan atau kutipan testimoni di sini..." />
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