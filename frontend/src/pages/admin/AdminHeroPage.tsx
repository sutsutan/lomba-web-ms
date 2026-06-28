//AdminHeroPage.tsx

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import api from '@/lib/api'; 
import { useToast } from '@/components/ui/use-toast';

const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors";

interface HeroBg { 
  id: number; 
  image_url: string; 
  title_id: string | null; 
  title_en: string | null; 
  subtitle_id: string | null; 
  subtitle_en: string | null; 
  description_id: string | null; // Added
  description_en: string | null; // Added
  category: string | null; 
  order: number; 
  is_active: boolean; 
}

export default function AdminHeroPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<HeroBg[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<HeroBg | null>(null);
  
  const initialForm: Omit<HeroBg, 'id'> = { 
    image_url: '', 
    title_id: '', 
    title_en: '', 
    subtitle_id: '', 
    subtitle_en: '', 
    description_id: '', 
    description_en: '', 
    category: 'home', 
    order: 0, 
    is_active: true 
  };
  const [form, setForm] = useState(initialForm);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/hero-backgrounds');
      const items = response.data.data || response.data || [];
      setItems(items); 
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm(initialForm); setModal(true); };
  const openEdit = (item: HeroBg) => { setEditing(item); setForm({ ...item }); setModal(true); };

  const save = async () => {
    const isHome = form.category === 'home';
    const payload = {
        image_url: form.image_url,
        category: form.category,
        is_active: form.is_active,
        title_id: isHome ? null : form.title_id,
        title_en: isHome ? null : form.title_en,
        subtitle_id: isHome ? null : form.subtitle_id,
        subtitle_en: isHome ? null : form.subtitle_en,
        description_id: isHome ? null : form.description_id, // Added
        description_en: isHome ? null : form.description_en, // Added
        order: isHome ? form.order : 0
    };

    try {
      if (editing) {
        await api.put(`/admin/hero-backgrounds/${editing.id}`, payload);
        toast({ title: "Berhasil", description: "Data berhasil diperbarui" });
      } else {
        await api.post('/admin/hero-backgrounds', payload);
        toast({ title: "Berhasil", description: "Data berhasil ditambahkan" });
      }
      await fetchData(); 
      setModal(false);
    } catch (error: any) {
      toast({ title: "Error", description: "Gagal menyimpan", variant: "destructive" });
    }
  };

  const del = async (id: number) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    try {
      await api.delete(`/admin/hero-backgrounds/${id}`);
      await fetchData();
      toast({ title: "Berhasil", description: "Data dihapus" });
    } catch (error) {
      toast({ title: "Error", description: "Gagal menghapus", variant: "destructive" });
    }
  };

  const homeItems = items.filter(i => (i.category || '').toLowerCase() === 'home');
  const universalItems = items.filter(i => (i.category || '').toLowerCase() !== 'home');

  return (
    <div className="p-6 space-y-8">
      <PageHeader title="Manajemen Hero" subtitle="Atur carousel untuk Home dan Halaman Statis" onAdd={openAdd} />
      
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Halaman Utama (Home)</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <DataTable
            columns={[
              { key: 'order', label: 'Urutan' },
              { key: 'image_url', label: 'Gambar', render: (i) => <img src={i.image_url} className="w-16 h-10 object-cover rounded-lg" alt="" /> },
              { key: 'is_active', label: 'Status', render: (i) => <Badge color={i.is_active ? 'green' : 'gray'}>{i.is_active ? 'Aktif' : 'Nonaktif'}</Badge> },
            ]}
            data={homeItems}
            onEdit={openEdit}
            onDelete={del}
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Halaman Lainnya (Universal)</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? <div className="p-8 text-center">Memuat...</div> : (
            <DataTable
              columns={[
                { key: 'category', label: 'Kategori' },
                { key: 'image_url', label: 'Gambar', render: (i) => <img src={i.image_url} className="w-16 h-10 object-cover rounded-lg" alt="" /> },
                { key: 'title_id', label: 'Judul (ID/EN)', render: (i) => <div>{i.title_id}<div className="text-gray-400">{i.title_en}</div></div> },
                { key: 'subtitle_id', label: 'Subjudul (ID/EN)', render: (i) => <div>{i.subtitle_id}<div className="text-gray-400">{i.subtitle_en}</div></div> },
                { key: 'description_id', label: 'Deskripsi (ID/EN)', render: (i) => <div className="text-xs truncate max-w-[150px]">{i.description_id || '-'}<br/><span className="text-gray-400">{i.description_en || '-'}</span></div> },
                { key: 'is_active', label: 'Status', render: (i) => <Badge color={i.is_active ? 'green' : 'gray'}>{i.is_active ? 'Aktif' : 'Nonaktif'}</Badge> },
              ]}
              data={universalItems}
              onEdit={openEdit}
              onDelete={del}
            />
          )}
        </div>
      </section>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Hero' : 'Tambah Hero'}>
        <div className="space-y-4">
          <ImageUploadField value={form.image_url} onChange={url => setForm({ ...form, image_url: url })} label="Gambar Hero" />
          
          {form.category !== 'home' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Judul (ID)"><input className={inputClass} value={form.title_id || ''} onChange={e => setForm({ ...form, title_id: e.target.value })} /></FormField>
                <FormField label="Title (EN)"><input className={inputClass} value={form.title_en || ''} onChange={e => setForm({ ...form, title_en: e.target.value })} /></FormField>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Subjudul (ID)"><input className={inputClass} value={form.subtitle_id || ''} onChange={e => setForm({ ...form, subtitle_id: e.target.value })} /></FormField>
                <FormField label="Subtitle (EN)"><input className={inputClass} value={form.subtitle_en || ''} onChange={e => setForm({ ...form, subtitle_en: e.target.value })} /></FormField>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Deskripsi (ID)"><textarea className={inputClass} rows={2} value={form.description_id || ''} onChange={e => setForm({ ...form, description_id: e.target.value })} /></FormField>
                <FormField label="Description (EN)"><textarea className={inputClass} rows={2} value={form.description_en || ''} onChange={e => setForm({ ...form, description_en: e.target.value })} /></FormField>
              </div>
            </>
          )}

          <FormField label="Kategori Halaman">
            <select className={inputClass} value={form.category || 'home'} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="home">Halaman Utama (Home)</option>
              <option value="vision-mission">Vision & Mission</option>
              <option value="our-values">Our Values</option>
              <option value="contact">Contact</option>
              <option value="about">About</option>
              <option value="academics">Academics</option>
            </select>
          </FormField>

          {form.category === 'home' && (
            <FormField label="Urutan (1-4)">
                <input type="number" min="1" max="4" className={inputClass} value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />
            </FormField>
          )}

          <div className="flex items-center gap-3">
            <input type="checkbox" id="hero-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="hero-active" className="text-sm font-medium text-gray-700">Aktif</label>
          </div>
          
          <div className="flex gap-3 pt-2">
            <button onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600">Batal</button>
            <button onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white">Simpan</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}