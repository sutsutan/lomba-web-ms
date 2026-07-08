import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';
import { AchievementData } from '@/services/Achievement';

export default function AdminAchievementPage() {
  const [items, setItems] = useState<AchievementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<AchievementData | null>(null);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    image_url: '',
    category: 'tech',
    holder_name: '',
    description: '',
    year: new Date().getFullYear(),
    is_active: true,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/achievements');
      const data = res.data.data || res.data;
      setItems(Array.isArray(data) ? data.filter(Boolean) : []);
    } catch (err) {
      console.error('Gagal mengambil data prestasi:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = items.filter(i =>
    String(i?.holder_name || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i?.description || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i?.category || '').toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ image_url: '', category: 'tech', holder_name: '', description: '', year: new Date().getFullYear(), is_active: true });
    setModal(true);
  };

  const openEdit = (item: AchievementData) => {
    setEditing(item);
    setForm({
      image_url: item.image_url || '',
      category: item.category || 'tech',
      holder_name: item.holder_name || '',
      description: item.description || '',
      year: item.year || new Date().getFullYear(),
      is_active: item.is_active,
    });
    setModal(true);
  };

  const save = async () => {
    try {
      if (editing) {
        await api.put(`/api/achievements/${editing.id}`, form);
      } else {
        await api.post('/api/achievements', form);
      }
      setModal(false);
      loadData();
    } catch (err) {
      console.error('Gagal menyimpan data prestasi:', err);
      alert('Gagal menyimpan data. Pastikan semua field terisi dengan benar.');
    }
  };

  const del = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus prestasi ini?')) return;
    try {
      await api.delete(`/api/achievements/${id}`);
      loadData();
    } catch (err) {
      console.error('Gagal menghapus data prestasi:', err);
    }
  };

  const catColors: Record<string, string> = {
    tech: 'blue',
    arts: 'purple',
    culinary: 'yellow',
    hospitality: 'green',
    accounting: 'gray',
  };

  const catLabels: Record<string, string> = {
    tech: 'Teknologi / IT',
    arts: 'Seni & Kreatif',
    culinary: 'Kuliner / Tata Boga',
    hospitality: 'Perhotelan',
    accounting: 'Akuntansi',
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Prestasi Siswa" subtitle="Kelola data prestasi dan pencapaian siswa di berbagai bidang" onAdd={openAdd} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama peraih, deskripsi, atau kategori..." />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm font-medium">Memuat data prestasi...</div>
        ) : (
          <DataTable
            columns={[
              {
                key: 'image_url',
                label: 'Foto',
                render: (item: AchievementData) => (
                  <img
                    src={item.image_url}
                    className="w-16 h-10 object-cover rounded-lg border border-gray-100 shadow-sm"
                    alt=""
                    onError={e => (e.currentTarget.src = 'https://placehold.co/64x40/e2e8f0/94a3b8?text=🏆')}
                  />
                ),
              },
              {
                key: 'holder_name',
                label: 'Peraih Prestasi',
                render: (item: AchievementData) => (
                  <div>
                    <span className="font-semibold text-gray-900 block">{item.holder_name}</span>
                    <span className="text-gray-400 text-[11px] block">Tahun {item.year}</span>
                  </div>
                ),
              },
              {
                key: 'category',
                label: 'Kategori',
                render: (item: AchievementData) => (
                  <Badge color={catColors[item.category] || 'gray'}>
                    {catLabels[item.category] || String(item.category || '').toUpperCase()}
                  </Badge>
                ),
              },
              {
                key: 'description',
                label: 'Deskripsi',
                render: (item: AchievementData) => (
                  <span className="text-gray-600 text-xs line-clamp-2 max-w-xs block font-normal">
                    {item.description || '-'}
                  </span>
                ),
              },
              {
                key: 'is_active',
                label: 'Status',
                render: (item: AchievementData) => (
                  <Badge color={item.is_active ? 'green' : 'gray'}>
                    {item.is_active ? 'Aktif' : 'Nonaktif'}
                  </Badge>
                ),
              },
            ]}
            data={filtered}
            onEdit={openEdit}
            onDelete={del}
          />
        )}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}>
        <div className="space-y-4">
          <ImageUploadField value={form.image_url} onChange={url => setForm({ ...form, image_url: url })} label="Foto Dokumentasi Prestasi" />

          <FormField label="Nama Peraih Prestasi" required>
            <input className={inputClass} value={form.holder_name} onChange={e => setForm({ ...form, holder_name: e.target.value })} placeholder="Contoh: Tim Robotik XII RPL 2" />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Kategori Bidang" required>
              <select className={selectClass} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="tech">Teknologi / IT</option>
                <option value="arts">Seni & Kreatif (DKV)</option>
                <option value="culinary">Kuliner / Tata Boga</option>
                <option value="hospitality">Perhotelan</option>
                <option value="accounting">Akuntansi</option>
              </select>
            </FormField>

            <FormField label="Tahun Pencapaian" required>
              <input type="number" className={inputClass} value={form.year} onChange={e => setForm({ ...form, year: parseInt(e.target.value) || new Date().getFullYear() })} placeholder="2026" />
            </FormField>
          </div>

          <FormField label="Deskripsi Prestasi" required>
            <textarea className={textareaClass} rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Jelaskan detail prestasi, nama kejuaraan, peringkat, dan penyelenggara..." />
          </FormField>

          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" id="achievement-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="achievement-active" className="text-sm font-medium text-gray-700 select-none">Tampilkan di halaman prestasi publik</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Prestasi</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
