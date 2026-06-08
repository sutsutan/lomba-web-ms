// src/pages/admin/AdminNewsPage.tsx
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
    category: 'Kegiatan', 
    published_date: '', 
    is_published: false, 
    thumbnail: '', 
    content_id: '' 
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
      title_id: '', category: 'Kegiatan', 
      published_date: new Date().toISOString().split('T')[0], 
      is_published: false, thumbnail: '', content_id: '' 
    }); 
    setModal(true); 
  };

  const openEdit = (item: any) => { 
    setEditing(item); 
    setForm({ 
      title_id: item.title_id,
      category: item.category,
      published_date: item.published_date,
      is_published: !!item.is_published,
      thumbnail: item.thumbnail,
      content_id: item.content_id
    }); 
    setModal(true); 
  };

  const save = async () => {
    try {
      // 1. Generate excerpt secara otomatis jika belum ada
      const cleanText = form.content_id.replace(/<[^>]*>/g, '');
      const excerpt = cleanText.substring(0, 120) + (cleanText.length > 120 ? '...' : '');
      
     const payload: NewsData = {
        title_id: form.title_id,
        category: form.category,
        thumbnail: form.thumbnail,
        content_id: form.content_id,
        excerpt_id: excerpt, // Menambahkan excerpt yang sudah dibersihkan
        is_published: !!form.is_published,
        published_date: form.published_date || new Date().toISOString().split('T')[0]
      };

      // 3. Eksekusi API
      if (editing?.id) {
        await newsService.update(editing.id, payload);
      } else {
        await newsService.create(payload);
      }

      // 4. Refresh data dan tutup modal
      await loadNews();
      setModal(false);
      setEditing(null);
    } catch (error: any) {
      console.error("Error saving news:", error);
      // Menampilkan pesan error yang lebih informatif dari Laravel
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
      key: 'title_id', // Ubah dari title ke title_id
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

    <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Berita' : 'Tulis Berita Baru'} size="xl">
  <div className="space-y-4">
    <FormField label="Judul Berita" required>
      <input 
        className={inputClass} 
        value={form.title_id} 
        onChange={e => setForm({ ...form, title_id: e.target.value })} 
        placeholder="Masukkan judul berita utama..." 
      />
    </FormField>
    
    <div className="grid grid-cols-2 gap-4">
      <FormField label="Kategori" required>
        <input 
          className={inputClass} 
          value={form.category} 
          onChange={e => setForm({ ...form, category: e.target.value })} 
          placeholder="Contoh: Prestasi, Kegiatan, Pengumuman" 
        />
      </FormField>
      <FormField label="Tanggal Publish" required>
        <input 
          type="date" 
          className={inputClass} 
          value={form.published_date} 
          onChange={e => setForm({ ...form, published_date: e.target.value })} 
        />
      </FormField>
    </div>
    
    <ImageUploadField 
      value={form.thumbnail} 
      onChange={url => setForm({ ...form, thumbnail: url })} 
      label="Foto Cover Artikel" 
    />
    
    <FormField label="Konten Artikel" required hint="Gunakan toolbar di bawah untuk mengatur gaya tulisan artikel">
      <div className="admin-rich-editor rounded-xl overflow-hidden border border-gray-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all bg-white">
        <ReactQuill 
          theme="snow"
          value={form.content_id}
          onChange={htmlValue => setForm({ ...form, content_id: htmlValue })}
          modules={quillModules}
          formats={quillFormats}
          placeholder="Tulis dan kreasikan materi konten berita sekolah di sini..."
          className="bg-white min-h-[240px]"
        />
      </div>
    </FormField>
    
    <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
      <input 
        type="checkbox" 
        id="news-published" 
        checked={!!form.is_published} 
        onChange={e => setForm({ ...form, is_published: e.target.checked })} 
        className="w-4 h-4 rounded accent-indigo-600" 
      />
      <label htmlFor="news-published" className="text-sm font-medium text-gray-700 select-none">Publikasikan sekarang (tampil di modul berita utama website)</label>
    </div>
    
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
      <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Berita</button>
    </div>
  </div>
</Modal>
    </div>
  );
}