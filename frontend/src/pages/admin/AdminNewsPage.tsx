import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

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
  
  const [form, setForm] = useState<{
    title_id: string;
    title_en: string;
    category: string;
    published_date: string;
    is_published: boolean;
    thumbnail: string;
    is_headline?: boolean;
    content_id: string;
    content_en: string;
    gallery_images: string[];
  }>({ 
      title_id: "",
      title_en: "",
      category: "Kegiatan",
      published_date: new Date().toISOString().slice(0, 16),
      is_published: false,
      is_headline: false,
      thumbnail: "",
      content_id: "",
      content_en: "",
      gallery_images: [] as string[],
  });

 const loadNews = async () => {
    try {
      setLoading(true);
      const data = await newsService.getAll(false);
      setItems(Array.isArray(data) ? data.filter(Boolean) : []);
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
    title_id: "",
    title_en: "",
    category: "Kegiatan",
    published_date: new Date().toISOString().slice(0, 16),
    is_published: false,
    is_headline: false,
    thumbnail: "",
    content_id: "",
    content_en: "",
    gallery_images: [],
  }); 
  setModal(true); 
};

  const openEdit = (item: any) => { 
    setEditing(item); 
    setForm({ 
      title_id: item.title_id || '',
      title_en: item.title_en || '',
      category: item.category || '',
      published_date: item.published_date
    ? item.published_date.slice(0,16)
    : new Date().toISOString().slice(0,16),
      is_published: !!item.is_published,
      thumbnail: item.thumbnail || '',
      is_headline: !!item.is_headline,
      content_id: item.content_id || '',
      content_en: item.content_en || '',
      gallery_images: item.gallery_images || []
    }); 
    setModal(true); 
  };

  const save = async () => {
    try {
      // Decode HTML entities
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = form.content_id;
      const textContent = tempDiv.textContent || tempDiv.innerText || "";
      const excerpt = textContent.substring(0, 120) + (textContent.length > 120 ? '...' : '');
      
      if (form.is_headline && !form.is_published) {
    alert("Headline harus dipublikasikan terlebih dahulu.");
    return;
}

      const payload: NewsData = {
        title_id: form.title_id,
        category: form.category,
        published_date: form.published_date,
        is_published: form.is_published,
        thumbnail: form.thumbnail,
        is_headline: form.is_headline,
        content_id: form.content_id,
        excerpt_id: excerpt,
        gallery_images: form.gallery_images,
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
      console.error("Gagal menyimpan berita:", error);
      let errorMsg = "Terjadi masalah saat menyimpan data ke server.";
      if (error.response?.data?.errors) {
        // Extract validation errors
        const errors = error.response.data.errors;
        errorMsg = "Data tidak lengkap/valid:\n" + Object.values(errors).flat().join('\n');
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      alert(errorMsg);
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
                key: 'thumbnail', 
                label: 'Cover', 
                render: (item: any) => (
                  <img 
                    src={item.thumbnail} 
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
                    {item.title_id}
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
                render: (item) => {

                    const publishDate = new Date(item.published_date);

                    const now = new Date();

                    if (!item.is_published) {

                        return <Badge color="yellow">Draft</Badge>;

                    }

                    if (publishDate > now) {

                        return <Badge color="blue">Scheduled</Badge>;

                    }

                    return <Badge color="green">Published</Badge>;

                }
              },
              {
                key: 'is_headline',
                label: 'Headline',
                render: (item: any) => (
                  <Badge color={item.is_headline ? 'blue' : 'gray'}>
                    {item.is_headline ? 'Headline' : '-'}
                  </Badge>
                ),
              },
            ]}
            data={filtered}
            onEdit={(item: any) => openEdit(item as NewsData)}
            onDelete={(id: number) => del(id)}
          />
        )}
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
                type="datetime-local" 
                className={inputClass} 
                value={form.published_date} 
                onChange={e => setForm({ ...form, published_date: e.target.value })} 
              />
               <p className="text-xs text-gray-500 mt-1">
                  Jika tanggal di masa depan dan status Published aktif,
                  berita akan otomatis menjadi Scheduled.
              </p>
            </FormField>
          </div>
          
          <ImageUploadField 
            value={form.thumbnail} 
            onChange={url => setForm({ ...form, thumbnail: url })} 
            label="Foto Cover Artikel" 
          />
          
          <FormField label="Konten Artikel" required hint="Gunakan toolbar di bawah untuk mengatur gaya tulisan artikel">
            <div className="admin-rich-editor rounded-xl overflow-hidden border border-gray-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all bg-white">
              {/* @ts-ignore - ReactQuill types mismatch with React 18/19 */}
              <ReactQuill 
                theme="snow"
                value={form.content_id}
                onChange={(htmlValue: string) => setForm({ ...form, content_id: htmlValue })}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Tulis dan kreasikan materi konten berita sekolah di sini..."
                className="bg-white min-h-[240px]"
              />
            </div>
          </FormField>

          {/* GALLERY IMAGES SECTION */}
          <div className="space-y-3 py-2 border-t border-gray-100 mt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                Galeri Foto Berita
              </label>
              <button 
                type="button" 
                onClick={() => setForm({ ...form, gallery_images: [...form.gallery_images, ''] })}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-lg transition-colors"
              >
                <Plus className="w-3 h-3" /> Tambah Foto
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {form.gallery_images.map((img, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <ImageUploadField 
                      value={img} 
                      onChange={(url) => {
                        const newGallery = [...form.gallery_images];
                        newGallery[idx] = url;
                        setForm({ ...form, gallery_images: newGallery });
                      }} 
                      label={`Foto Galeri #${idx + 1}`}
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      const newGallery = form.gallery_images.filter((_, i) => i !== idx);
                      setForm({ ...form, gallery_images: newGallery });
                    }}
                    className="mt-8 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Hapus foto ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {form.gallery_images.length === 0 && (
                <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-2xl">
                  <p className="text-xs text-gray-400">Belum ada foto galeri. Klik "Tambah Foto" jika berita ini memiliki dokumentasi tambahan.</p>
                </div>
              )}
            </div>
          </div>
          
         <div className="rounded-xl border bg-gray-50 p-4">

          <div className="flex items-start gap-3">

              <input
                  id="news-published"
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e)=>{

                      const published = e.target.checked;

                      setForm({
                          ...form,
                          is_published: published,

                          is_headline:
                              published
                                  ? form.is_headline
                                  : false,
                      });

                  }}
                  className="mt-1 w-4 h-4 accent-indigo-600"
              />

              <label htmlFor="news-published">

                  <div className="font-medium">
                      Publish Berita
                  </div>

                  <div className="text-xs text-gray-500 mt-1">

                      Tidak dicentang = Draft

                      <br/>

                      Dicentang + tanggal hari ini = Published

                      <br/>

                      Dicentang + tanggal masa depan = Scheduled

                  </div>

              </label>

          </div>

        </div>

           <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

              <div className="flex items-start gap-3">

                  <input
                      id="headline-news"
                      type="checkbox"
                      disabled={!form.is_published}
                      checked={form.is_headline}
                      onChange={(e)=>
                          setForm({
                              ...form,
                              is_headline:e.target.checked
                          })
                      }
                      className="mt-1 w-4 h-4 accent-blue-600 disabled:opacity-40"
                  />

                  <label htmlFor="headline-news">

                      <div className="font-medium">

                          Jadikan Headline

                      </div>

                      <div className="text-xs text-gray-500 mt-1">

                          Hanya berita Published yang dapat menjadi Headline.

                          Headline lama akan otomatis diganti.

                      </div>

                  </label>

              </div>

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