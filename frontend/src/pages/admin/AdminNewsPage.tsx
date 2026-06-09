import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';

// 🛠️ HUBUNGKAN KE SERVICE API
import { newsService, NewsData } from '@/services/News';

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'clean']
  ],
};

const quillFormats = [
  'header', 'bold', 'italic', 'underline', 'blockquote',
  'list', 'align', 'link'
];

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true); // ➕ Status Loading
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<NewsData | null>(null);
  const [search, setSearch] = useState('');
  
  const [form, setForm] = useState({ 
  title_id: '', 
  title_en: '',
  category: 'Kegiatan', 
  published_date: '', 
  is_published: false, 
  thumbnail: '', 
  content_id: '',
  content_en: ''
});

 const loadNews = async () => {
    try {
      setLoading(true);
      const data = await newsService.getAll(false);
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadNews(); }, []);

  const filtered = items.filter(i => 
    i.title_id?.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { 
  setEditing(null); 
  setForm({ 
    title_id: '', title_en: '', category: 'Kegiatan', 
    published_date: new Date().toISOString().split('T')[0], 
    is_published: false, thumbnail: '', content_id: '', content_en: '' 
  }); 
  setModal(true); 
};

const openEdit = (item: any) => { 
  setEditing(item); 
  setForm({ 
    title_id: item.title_id,
    title_en: item.title_en || '',
    category: item.category,
    published_date: item.published_date,
    is_published: !!item.is_published,
    thumbnail: item.thumbnail,
    content_id: item.content_id,
    content_en: item.content_en || ''
  }); 
  setModal(true); 
};

 const save = async () => {
  try {
    const cleanTextId = form.content_id.replace(/<[^>]*>/g, '');
    const cleanTextEn = form.content_en.replace(/<[^>]*>/g, '');
    
    const excerptId = cleanTextId.substring(0, 120) + (cleanTextId.length > 120 ? '...' : '');
    const excerptEn = cleanTextEn.substring(0, 120) + (cleanTextEn.length > 120 ? '...' : '');
    
    const slug = form.title_id.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const payload: any = {
            title_id: form.title_id,
            title_en: form.title_en || form.title_id,
            excerpt_id: excerptId,
            excerpt_en: excerptEn || excerptId,
            category: form.category,
            content_id: form.content_id,
            content_en: form.content_en || form.content_id,
            thumbnail: form.thumbnail,
            slug: slug,
            is_published: !!form.is_published,
            published_date: form.published_date,
            user_id: 1
    };

      if (editing?.id) {
        await newsService.update(editing.id, payload);
      } else {
        await newsService.create(payload);
      }

      await loadNews();
      setModal(false);
      setEditing(null);
    } catch (error: any) {
      console.error("Error saving news:", error);
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat menyimpan data.";
      alert("Gagal menyimpan: " + errorMessage);
    }
  };

  const del = async (id: number) => {
    if (confirm("Hapus berita ini?")) {
      try {
        await newsService.delete(id);
        loadNews();
      } catch (error) { console.error(error); }
    }
  };

  const getCategoryColor = (cat: string) => {
    const categoryLower = String(cat).toLowerCase();
    if (categoryLower.includes('prestasi')) return 'blue';
    if (categoryLower.includes('kegiatan') || categoryLower.includes('acara')) return 'green';
    if (categoryLower.includes('pengumuman')) return 'red';
    return 'purple';
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Berita & Artikel" subtitle="Kelola konten berita dan artikel sekolah" onAdd={openAdd} />
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari judul berita..." />
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500 font-medium">Memuat database berita...</div>
        ) : (
         <DataTable
  columns={[
    { 
      key: 'thumbnail', // Ubah dari cover_image ke thumbnail
      label: 'Cover', 
      render: (item: any) => (
        <img 
          src={item.thumbnail} // Sesuaikan key-nya
          className="w-20 h-12 object-cover rounded-lg border border-gray-100 shadow-sm" 
          alt="" 
          onError={e => (e.currentTarget.src = 'https://placehold.co/80x48/e2e8f0/94a3b8?text=img')} 
        />
      ) 
    },
    { 
      key: 'title_id',
      label: 'Judul Berita', 
      render: (item: any) => (
        <span className="font-semibold text-gray-900 line-clamp-2 max-w-xs block">
          {item.title_id} {/* Sesuaikan key-nya */}
        </span>
      ) 
    },
    { 
      key: 'category', 
      label: 'Kategori', 
      render: (item: any) => (
        <Badge color={getCategoryColor(item.category)}>
          {item.category}
        </Badge>
      ) 
    },
    { key: 'published_date', label: 'Tanggal Terbit' },
    { 
      key: 'is_published', 
      label: 'Status', 
      render: (item: any) => (
        <Badge color={item.is_published ? 'green' : 'yellow'}>
          {item.is_published ? 'Published' : 'Draft'}
        </Badge>
      ) 
    },
  ]}
  data={filtered}
  onEdit={(item: any) => openEdit(item as NewsData)}
  onDelete={(item: any) => item.id && del(item.id)}
/>        )}
      </div>

    <Modal isOpen={modal} 
  onClose={() => setModal(false)} 
  title={editing ? 'Edit Berita' : 'Tulis Berita Baru'} 
  size="2xl">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* KOLOM KIRI: BAHASA INDONESIA */}
    <div className="space-y-4 border-r border-gray-100 pr-0 md:pr-6">
      <h3 className="font-bold text-gray-900 border-b pb-2">Bahasa Indonesia (ID)</h3>
      <FormField label="Judul (ID)" required>
        <input className={inputClass} value={form.title_id} onChange={e => setForm({ ...form, title_id: e.target.value })} />
      </FormField>
      <FormField label="Konten (ID)" required>
        <ReactQuill 
          theme="snow" value={form.content_id} 
          onChange={val => setForm({ ...form, content_id: val })}
          modules={quillModules} formats={quillFormats} className="h-64"
        />
      </FormField>
    </div>

    {/* KOLOM KANAN: BAHASA INGGRIS */}
    <div className="space-y-4">
      <h3 className="font-bold text-gray-900 border-b pb-2">English (EN)</h3>
      <FormField label="Title (EN)" required>
        <input className={inputClass} value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} />
      </FormField>
      <FormField label="Content (EN)" required>
        <ReactQuill 
          theme="snow" value={form.content_en} 
          onChange={val => setForm({ ...form, content_en: val })}
          modules={quillModules} formats={quillFormats} className="h-64"
        />
      </FormField>
    </div>
  </div>

  {/* PENGATURAN UMUM */}
  <div className="grid grid-cols-2 gap-4 mt-6">
    <FormField label="Kategori" required>
      <input className={inputClass} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
    </FormField>
    <FormField label="Tanggal Publish" required>
      <input type="date" className={inputClass} value={form.published_date} onChange={e => setForm({ ...form, published_date: e.target.value })} />
    </FormField>
  </div>

  <ImageUploadField value={form.thumbnail} onChange={url => setForm({ ...form, thumbnail: url })} label="Foto Cover Artikel" />

  <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
    <input type="checkbox" id="news-published" checked={!!form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
    <label htmlFor="news-published" className="text-sm font-medium text-gray-700">Publikasikan sekarang</label>
  </div>

  <div className="flex gap-3 pt-4">
    <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border rounded-xl text-sm font-medium hover:bg-gray-50">Batal</button>
    <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700">Simpan Berita</button>
  </div>
</Modal>
    </div>
  );
}