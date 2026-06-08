import React, { useState } from 'react';

import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';

const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors";

interface HeroBg { 
  id: number; 
  image_url: string; 
  title: string; 
  subtitle: string; 
  order: number; 
  is_active: boolean; 
}

export default function AdminHeroPage() {
  const [items, setItems] = useState<HeroBg[]>([
    { id: 1, image_url: 'https://placehold.co/1200x600/6366f1/fff?text=Hero+1', title: 'Selamat Datang', subtitle: 'SMK Nusantara Jaya', order: 1, is_active: true },
    { id: 2, image_url: 'https://placehold.co/1200x600/8b5cf6/fff?text=Hero+2', title: 'Prestasi Terbaik', subtitle: 'Bangga dengan karya siswa', order: 2, is_active: true },
  ]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<HeroBg | null>(null);
  const [form, setForm] = useState({ image_url: '', title: '', subtitle: '', order: 0, is_active: true });

  const openAdd = () => { 
    setEditing(null); 
    setForm({ image_url: '', title: '', subtitle: '', order: items.length + 1, is_active: true }); 
    setModal(true); 
  };

  const openEdit = (item: HeroBg) => { 
    setEditing(item); 
    setForm({ image_url: item.image_url, title: item.title, subtitle: item.subtitle, order: item.order, is_active: item.is_active }); 
    setModal(true); 
  };

  const save = () => {
    if (editing) setItems(items.map(i => i.id === editing.id ? { ...i, ...form } : i));
    else setItems([...items, { id: Date.now(), ...form }]);
    setModal(false);
  };

  const del = (id: number) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Hero Background" subtitle="Carousel gambar di halaman utama" onAdd={openAdd} />
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <DataTable
          columns={[
            { key: 'order', label: 'Urutan' },
            { 
              key: 'image_url', 
              label: 'Gambar', 
              render: (item: HeroBg) => (
                <img 
                  src={item.image_url} 
                  className="w-20 h-12 object-cover rounded-lg" 
                  alt="" 
                  onError={e => (e.currentTarget.src = 'https://placehold.co/80x48/e2e8f0/94a3b8?text=img')} 
                />
              )
            },
            { key: 'title', label: 'Judul' },
            { key: 'subtitle', label: 'Subjudul' },
            { 
              key: 'is_active', 
              label: 'Status', 
              render: (item: HeroBg) => (
                <Badge color={item.is_active ? 'green' : 'gray'}>
                  {item.is_active ? 'Aktif' : 'Nonaktif'}
                </Badge>
              )
            },
          ]}
          data={items}
          onEdit={openEdit}
          onDelete={del}
        />
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Hero' : 'Tambah Hero'}>
        <div className="space-y-4">
          <ImageUploadField value={form.image_url} onChange={url => setForm({ ...form, image_url: url })} label="Gambar Hero" />
          
          <FormField label="Judul">
            <input className={inputClass} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </FormField>
          
          <FormField label="Subjudul">
            <input className={inputClass} value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
          </FormField>
          
          <FormField label="Urutan">
            <input type="number" className={inputClass} value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />
          </FormField>
          
          <div className="flex items-center gap-3">
            <input type="checkbox" id="hero-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="hero-active" className="text-sm font-medium text-gray-700">Aktif</label>
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