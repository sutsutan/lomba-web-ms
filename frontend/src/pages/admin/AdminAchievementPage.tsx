import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

// Komponen admin dari folder components
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
    is_active: true 
  });

  const loadData = async () => {
  try {
    setLoading(true);
    const res = await api.get('/admin/achievements');
    
    const responseData = res.data.data || res.data;
    
    setItems(Array.isArray(responseData) ? responseData : []);
  } catch (err) {
    console.error("Gagal memuat data admin:", err);
    setItems([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadData();
  }, []);

  const filtered = Array.isArray(items) 
  ? items.filter(i => 
      i.holder_name?.toLowerCase().includes(search.toLowerCase()) || 
      i.description?.toLowerCase().includes(search.toLowerCase())
    ) 
  : [];

  const openAdd = () => { 
    setEditing(null); 
    setForm({ image_url: '', category: 'tech', holder_name: '', description: '', year: new Date().getFullYear(), is_active: true }); 
    setModal(true); 
  };

  const openEdit = (item: AchievementData) => { 
    setEditing(item); 
    setForm({ image_url: item.image_url, category: item.category, holder_name: item.holder_name, description: item.description, year: item.year, is_active: item.is_active }); 
    setModal(true); 
  };

  const save = async () => {
    try {
      if (editing) {
        await api.put(`/api/admin/achievements/${editing.id}`, form);
      } else {
        await api.post('/api/admin/achievements', form);
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
      await api.delete(`/api/admin/achievements/${id}`);
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
    accounting: 'gray' 
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Prestasi" subtitle="Daftar prestasi siswa berdasarkan bidang" onAdd={openAdd} />
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama atau deskripsi..." />
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm font-medium">Sedang memproses data...</div>
        ) : (
          <DataTable
            columns={[
              { 
                key: 'image_url', 
                label: 'Foto', 
                render: (item: AchievementData) => (
                  <img 
                    src={item.image_url} 
                    className="w-12 h-12 object-cover rounded-xl border border-gray-100 shadow-sm" 
                    alt="" 
                    onError={e => (e.currentTarget.src = 'https://placehold.co/48x48/e2e8f0/94a3b8?text=?')} 
                  />
                ) 
              },
              { key: 'holder_name', label: 'Nama' },
              { 
                key: 'category', 
                label: 'Kategori', 
                render: (item: AchievementData) => (
                  <Badge color={catColors[item.category] || 'gray'}>
                    {item.category.toUpperCase()}
                  </Badge>
                ) 
              },
              { 
                key: 'description', 
                label: 'Deskripsi', 
                render: (item: AchievementData) => (
                  <span className="text-gray-600 text-xs line-clamp-2 max-w-xs block font-normal">
                    {item.description}
                  </span>
                ) 
              },
              { key: 'year', label: 'Tahun' },
              { 
                key: 'is_active', 
                label: 'Status', 
                render: (item: AchievementData) => (
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

      {/* Modal form input tetap sama */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Prestasi' : 'Tambah Prestasi'}>
         {/* Konten form di dalam modal Anda tetap utuh seperti sebelumnya */}
         <div className="space-y-4">
          <ImageUploadField value={form.image_url} onChange={url => setForm({ ...form, image_url: url })} label="Foto Prestasi" />
          
          <FormField label="Nama Pemegang" required>
            <input className={inputClass} value={form.holder_name} onChange={e => setForm({ ...form, holder_name: e.target.value })} placeholder="Masukkan nama siswa..." />
          </FormField>
          
          <FormField label="Kategori" required>
            <select className={selectClass} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="tech">Technology (IT)</option>
              <option value="arts">Arts (Seni)</option>
              <option value="culinary">Culinary (Kuliner)</option>
              <option value="hospitality">Hospitality (Perhotelan)</option>
              <option value="accounting">Accounting (Akuntansi)</option>
            </select>
          </FormField>
          
          <FormField label="Deskripsi">
            <textarea className={textareaClass} rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Detail prestasi yang diraih..." />
          </FormField>
          
          <FormField label="Tahun">
            <input type="number" className={inputClass} value={form.year} onChange={e => setForm({ ...form, year: Number(e.target.value) })} />
          </FormField>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="achievement-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="achievement-active" className="text-sm font-medium text-gray-700 select-none">Tampilkan di halaman utama</label>
          </div>
          
          <div className="flex gap-3 pt-2">
            <button onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan</button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 