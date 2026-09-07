import React, { useState, useEffect, useRef} from 'react';
import {
  getAdminTefaProjects, createTefaProject, updateTefaProject, deleteTefaProject,
  getAdminTefaGalleries, createTefaGallery, updateTefaGallery, deleteTefaGallery,
  getAdminTefaCategoryContent, updateTefaCategoryContent,
  getAdminTefaPrograms, updateTefaProgram,  createTefaProgram, deleteTefaProgram, 
  TefaProjectData, TefaGalleryData, TefaCategoryContentData, TefaProgramData
} from '@/services/Tefa';

import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';
import api from '@/lib/api';

async function uploadFileToServer(file: File, folder = 'tefa-gallery'): Promise<string> {
  await api.get('/sanctum/csrf-cookie');
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const response = await api.post('/admin/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  const uploadedUrl = response.data.url;
  return uploadedUrl.startsWith('http') || uploadedUrl.startsWith('//')
    ? uploadedUrl
    : `http://localhost:8000${uploadedUrl.startsWith('/') ? '' : '/'}${uploadedUrl}`;
}

function toTitleCase(fileName: string) {
  const withoutExt = fileName.replace(/\.[^/.]+$/, '');
  return withoutExt
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

// ─── Konstanta Jurusan (sinkron dengan major_code di backend) ───────
const majorColors: Record<string, string> = {
  it: 'blue',
  culinary: 'amber',
  dkv: 'purple',
  hospitality: 'green',
  accounting: 'gray'
};

const majorLabels: Record<string, string> = {
  it: 'IT / PPLG',
  culinary: 'Culinary / Boga',
  dkv: 'DKV',
  hospitality: 'Hospitality',
  accounting: 'Accounting'
};

const majorOptions = Object.keys(majorLabels);

type TabKey = 'projects' | 'gallery' | 'category' | 'programs';

export default function AdminTefaPage() {
  const [tab, setTab] = useState<TabKey>('projects');

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'projects', label: 'Proyek TeFa' },
    { key: 'gallery', label: 'Galeri Fasilitas' },
    { key: 'category', label: 'Konten Kategori' },
    { key: 'programs', label: 'Kartu Program' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Teaching Factory (TeFa)"
        subtitle="Kelola proyek unggulan, galeri, deskripsi kategori, dan kartu program TeFa per jurusan"
        onAdd={undefined}
      />

      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-gray-100 overflow-x-auto">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
              tab === key
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'projects' && <TefaProjectsPanel />}
      {tab === 'gallery' && <TefaGalleryPanel />}
      {tab === 'category' && <TefaCategoryContentPanel />}
      {tab === 'programs' && <TefaProgramsPanel />}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PANEL 1: TEFA PROJECTS  (tidak berubah dari versi sebelumnya)
// ══════════════════════════════════════════════════════════════════
function TefaProjectsPanel() {
  const [items, setItems] = useState<TefaProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<TefaProjectData | null>(null);
  const [search, setSearch] = useState('');

  const emptyForm = {
    preview_url: '',
    student: '',
    class: '',
    title: '',
    title_id: '',
    description: '',
    description_id: '',
    major_code: 'it',
    is_active: true,
    sort_order: 0,
  };
  const [form, setForm] = useState(emptyForm);

  const filtered = items.filter(i =>
    String(i.title || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.student || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.description || '').toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setModal(true);
  };

  const openEdit = (item: TefaProjectData) => {
    setEditing(item);
    setForm({
      preview_url: item.preview_url,
      student: item.student,
      class: item.class,
      title: item.title,
      title_id: item.title_id || '',
      description: item.description,
      description_id: item.description_id || '',
      major_code: item.major_code,
      is_active: item.is_active,
      sort_order: item.sort_order ?? 0,
    });
    setModal(true);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAdminTefaProjects();
      setItems(Array.isArray(data) ? data.filter(Boolean) : []);
    } catch (error) {
      console.error('Gagal memuat data proyek TeFa:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const save = async () => {
    try {
      if (editing) {
        await updateTefaProject(editing.id, form);
      } else {
        await createTefaProject(form);
      }
      setModal(false);
      fetchData();
    } catch (error) {
      console.error('Gagal menyimpan proyek TeFa:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
    }
  };

  const del = async (id: number) => {
    if (!confirm('Yakin ingin menghapus proyek TeFa ini?')) return;
    try {
      await deleteTefaProject(id);
      fetchData();
    } catch (error) {
      console.error('Gagal menghapus proyek TeFa:', error);
      alert('Gagal menghapus data. Silakan coba lagi.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={openAdd}
          className="px-4 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          + Tambah Proyek TeFa
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama proyek, atau siswa pelaksana..." />
        </div>

        <DataTable
          columns={[
            {
              key: 'preview_url',
              label: 'Foto Proyek',
              render: (item: TefaProjectData) => (
                <img
                  src={item.preview_url}
                  className="w-16 h-12 object-cover rounded-xl border border-gray-100 shadow-sm bg-gray-50"
                  alt=""
                  onError={e => (e.currentTarget.src = 'https://placehold.co/64x48/e2e8f0/94a3b8?text=TeFa')}
                />
              )
            },
            {
              key: 'title',
              label: 'Nama Proyek',
              render: (item: TefaProjectData) => (
                <div className="whitespace-nowrap">
                  <span className="font-semibold text-gray-900">{item.title}</span>
                  {item.title_id && <p className="text-xs text-gray-400">{item.title_id}</p>}
                </div>
              )
            },
            {
              key: 'student',
              label: 'Pelaksana',
              render: (item: TefaProjectData) => (
                <div>
                  <span className="whitespace-nowrap font-medium">{item.student}</span>
                  <p className="text-xs text-gray-400">{item.class}</p>
                </div>
              )
            },
            {
              key: 'major_code',
              label: 'Jurusan',
              render: (item: TefaProjectData) => (
                <Badge color={majorColors[item.major_code] || 'gray'}>
                  {majorLabels[item.major_code] || String(item.major_code || '').toUpperCase()}
                </Badge>
              )
            },
            {
              key: 'description',
              label: 'Deskripsi',
              render: (item: TefaProjectData) => (
                <span className="text-xs text-gray-500 max-w-xs block line-clamp-2">{item.description || '-'}</span>
              )
            },
            {
              key: 'is_active',
              label: 'Status Tampilan',
              render: (item: TefaProjectData) => (
                <Badge color={item.is_active ? 'green' : 'gray'}>{item.is_active ? 'Publik' : 'Draft'}</Badge>
              )
            },
          ]}
          data={filtered}
          onEdit={openEdit}
          onDelete={del}
        />
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Proyek TeFa' : 'Tambah Proyek TeFa Baru'}>
        <div className="space-y-4">
          <ImageUploadField value={form.preview_url} onChange={url => setForm({ ...form, preview_url: url })} label="Foto Dokumentasi Proyek" />

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Judul Proyek (EN)" required>
              <input className={inputClass} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Contoh: School Website Redesign" />
            </FormField>
            <FormField label="Judul Proyek (ID)" hint="Opsional, untuk versi Bahasa Indonesia">
              <input className={inputClass} value={form.title_id} onChange={e => setForm({ ...form, title_id: e.target.value })} placeholder="Contoh: Redesain Website Sekolah" />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nama Siswa Pelaksana" required>
              <input className={inputClass} value={form.student} onChange={e => setForm({ ...form, student: e.target.value })} placeholder="Contoh: budi rajasa" />
            </FormField>
            <FormField label="Kelas" hint="Opsional">
              <input className={inputClass} value={form.class} onChange={e => setForm({ ...form, class: e.target.value })} placeholder="Contoh: XI PPLG 1" />
            </FormField>
          </div>

          <FormField label="Jurusan" required>
            <select className={selectClass} value={form.major_code} onChange={e => setForm({ ...form, major_code: e.target.value })}>
              {majorOptions.map(code => (
                <option key={code} value={code}>{majorLabels[code]}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Deskripsi Proyek (EN)" required>
            <textarea className={textareaClass} rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Jelaskan proyek yang dikerjakan..." />
          </FormField>

          <FormField label="Deskripsi Proyek (ID)" hint="Opsional, untuk versi Bahasa Indonesia">
            <textarea className={textareaClass} rows={3} value={form.description_id} onChange={e => setForm({ ...form, description_id: e.target.value })} placeholder="Terjemahan deskripsi dalam Bahasa Indonesia..." />
          </FormField>

          <FormField label="Urutan Tampil" hint="Angka lebih kecil tampil lebih dulu">
            <input type="number" className={inputClass} value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} />
          </FormField>

          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" id="proj-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="proj-active" className="text-sm font-medium text-gray-700 select-none">Publikasikan proyek ini di halaman TeFa</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Proyek</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PANEL 2: TEFA GALLERY — dengan tambahan Multi-Upload per jurusan
// ══════════════════════════════════════════════════════════════════
function TefaGalleryPanel() {
  const [items, setItems] = useState<TefaGalleryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<TefaGalleryData | null>(null);
  const [search, setSearch] = useState('');

  const emptyForm = {
    preview_url: '',
    title: '',
    title_id: '',
    subtitle: '',
    subtitle_id: '',
    major_code: 'it',
    sort_order: 0,
    is_active: true,
  };
  const [form, setForm] = useState(emptyForm);

  // ─── State untuk Multi-Upload ───
  const [bulkModal, setBulkModal] = useState(false);
  const [bulkMajorCode, setBulkMajorCode] = useState('it');
  const [bulkItems, setBulkItems] = useState<{
    file: File;
    previewUrl: string;
    title: string;
    title_id: string;
    subtitle: string;
    subtitle_id: string;
    status: 'pending' | 'uploading' | 'done' | 'error';
    errorMsg?: string;
  }[]>([]);
  const [bulkSaving, setBulkSaving] = useState(false);
  const bulkFileInputRef = useRef<HTMLInputElement>(null);

  const filtered = items.filter(i =>
    String(i.title || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.subtitle || '').toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setModal(true);
  };

  const openEdit = (item: TefaGalleryData) => {
    setEditing(item);
    setForm({
      preview_url: item.preview_url,
      title: item.title,
      title_id: item.title_id || '',
      subtitle: item.subtitle || '',
      subtitle_id: item.subtitle_id || '',
      major_code: item.major_code,
      sort_order: item.sort_order ?? 0,
      is_active: item.is_active,
    });
    setModal(true);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setFetchError('');
      const data = await getAdminTefaGalleries();
      setItems(Array.isArray(data) ? data.filter(Boolean) : []);
    } catch (error: any) {
      console.error('Gagal memuat data galeri TeFa:', error);
      setFetchError(
        error?.response?.status === 403
          ? 'Akses ditolak. Akun Anda mungkin tidak memiliki izin untuk modul TeFa (perlu role admin).'
          : 'Gagal memuat data galeri TeFa dari server.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const save = async () => {
    try {
      if (editing) {
        await updateTefaGallery(editing.id, form);
      } else {
        await createTefaGallery(form);
      }
      setModal(false);
      fetchData();
    } catch (error) {
      console.error('Gagal menyimpan galeri TeFa:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
    }
  };

  const del = async (id: number) => {
    if (!confirm('Yakin ingin menghapus foto galeri ini?')) return;
    try {
      await deleteTefaGallery(id);
      fetchData();
    } catch (error) {
      console.error('Gagal menghapus galeri TeFa:', error);
      alert('Gagal menghapus data. Silakan coba lagi.');
    }
  };

  // ─── Multi-Upload handlers ───
  const openBulk = () => {
    setBulkMajorCode('it');
    setBulkItems([]);
    setBulkModal(true);
  };

  const closeBulk = () => {
    bulkItems.forEach(b => URL.revokeObjectURL(b.previewUrl));
    setBulkItems([]);
    setBulkModal(false);
  };

  const handleBulkFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
      title: toTitleCase(file.name),
      title_id: '',
      subtitle: '',
      subtitle_id: '',
      status: 'pending' as const,
    }));

    setBulkItems(prev => [...prev, ...newItems]);
    if (bulkFileInputRef.current) bulkFileInputRef.current.value = '';
  };

  const updateBulkField = (index: number, field: 'title' | 'title_id' | 'subtitle' | 'subtitle_id', value: string) => {
    setBulkItems(prev => prev.map((it, i) => i === index ? { ...it, [field]: value } : it));
  };

  const removeBulkItem = (index: number) => {
    setBulkItems(prev => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const submitBulk = async () => {
    if (bulkItems.length === 0) return;
    setBulkSaving(true);

    const baseSortOrder = items.filter(i => i.major_code === bulkMajorCode).length;

    for (let i = 0; i < bulkItems.length; i++) {
      setBulkItems(prev => prev.map((it, idx) => idx === i ? { ...it, status: 'uploading' } : it));
      try {
        const url = await uploadFileToServer(bulkItems[i].file, 'tefa-gallery');
        await createTefaGallery({
          preview_url: url,
          title: bulkItems[i].title || `Foto ${i + 1}`,
          title_id: bulkItems[i].title_id,
          subtitle: bulkItems[i].subtitle,
          subtitle_id: bulkItems[i].subtitle_id,
          major_code: bulkMajorCode,
          sort_order: baseSortOrder + i,
          is_active: true,
        });
        setBulkItems(prev => prev.map((it, idx) => idx === i ? { ...it, status: 'done' } : it));
      } catch (err: any) {
        console.error('Gagal upload foto galeri:', err);
        setBulkItems(prev => prev.map((it, idx) => idx === i ? {
          ...it, status: 'error', errorMsg: err?.response?.data?.message || 'Upload gagal'
        } : it));
      }
    }

    setBulkSaving(false);
    fetchData();
  };

  const allBulkDone = bulkItems.length > 0 && bulkItems.every(b => b.status === 'done' || b.status === 'error');

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <button
          onClick={openBulk}
          className="px-4 py-2.5 bg-white border border-indigo-200 rounded-xl text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
        >
          📤 Upload Banyak Foto
        </button>
        <button
          onClick={openAdd}
          className="px-4 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          + Tambah Foto Galeri
        </button>
      </div>

      {fetchError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
          {fetchError}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama fasilitas / kegiatan..." />
        </div>

        <DataTable
          columns={[
            {
              key: 'preview_url',
              label: 'Foto',
              render: (item: TefaGalleryData) => (
                <img
                  src={item.preview_url}
                  className="w-16 h-12 object-cover rounded-xl border border-gray-100 shadow-sm bg-gray-50"
                  alt=""
                  onError={e => (e.currentTarget.src = 'https://placehold.co/64x48/e2e8f0/94a3b8?text=Galeri')}
                />
              )
            },
            {
              key: 'title',
              label: 'Nama Fasilitas / Kegiatan',
              render: (item: TefaGalleryData) => (
                <div className="whitespace-nowrap">
                  <span className="font-semibold text-gray-900">{item.title}</span>
                  {item.title_id && <p className="text-xs text-gray-400">{item.title_id}</p>}
                </div>
              )
            },
            {
              key: 'subtitle',
              label: 'Subjudul',
              render: (item: TefaGalleryData) => (
                <span className="text-xs text-gray-500 max-w-xs block">{item.subtitle || '-'}</span>
              )
            },
            {
              key: 'major_code',
              label: 'Jurusan',
              render: (item: TefaGalleryData) => (
                <Badge color={majorColors[item.major_code] || 'gray'}>
                  {majorLabels[item.major_code] || String(item.major_code || '').toUpperCase()}
                </Badge>
              )
            },
            {
              key: 'sort_order',
              label: 'Urutan',
              render: (item: TefaGalleryData) => <span className="text-xs text-gray-500">{item.sort_order}</span>
            },
            {
              key: 'is_active',
              label: 'Status',
              render: (item: TefaGalleryData) => (
                <Badge color={item.is_active ? 'green' : 'gray'}>{item.is_active ? 'Publik' : 'Draft'}</Badge>
              )
            },
          ]}
          data={filtered}
          onEdit={openEdit}
          onDelete={del}
        />
      </div>

      {/* Modal Tambah/Edit Satuan */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Foto Galeri TeFa' : 'Tambah Foto Galeri Baru'}>
        <div className="space-y-4">
          <ImageUploadField value={form.preview_url} onChange={url => setForm({ ...form, preview_url: url })} label="Foto Fasilitas / Kegiatan" />

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Judul (EN)" required>
              <input className={inputClass} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Contoh: IoT & Robotics Lab" />
            </FormField>
            <FormField label="Judul (ID)" hint="Opsional">
              <input className={inputClass} value={form.title_id} onChange={e => setForm({ ...form, title_id: e.target.value })} placeholder="Contoh: Lab IoT & Robotika" />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Subjudul (EN)" hint="Opsional">
              <input className={inputClass} value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="Contoh: Applied Embedded Systems" />
            </FormField>
            <FormField label="Subjudul (ID)" hint="Opsional">
              <input className={inputClass} value={form.subtitle_id} onChange={e => setForm({ ...form, subtitle_id: e.target.value })} placeholder="Contoh: Sistem Tertanam Terapan" />
            </FormField>
          </div>

          <FormField label="Jurusan" required>
            <select className={selectClass} value={form.major_code} onChange={e => setForm({ ...form, major_code: e.target.value })}>
              {majorOptions.map(code => (
                <option key={code} value={code}>{majorLabels[code]}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Urutan Tampil" hint="Menentukan posisi kartu mini-gallery (0 = ditampilkan pertama)">
            <input type="number" className={inputClass} value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} />
          </FormField>

          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" id="gal-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="gal-active" className="text-sm font-medium text-gray-700 select-none">Tampilkan foto ini di halaman TeFa</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Foto</button>
          </div>
        </div>
      </Modal>

      {/* Modal Multi-Upload */}
      <Modal isOpen={bulkModal} onClose={closeBulk} title="Upload Banyak Foto Galeri Sekaligus">
        <div className="space-y-4">
          <FormField label="Jurusan Tujuan" required hint="Semua foto yang dipilih akan masuk ke jurusan ini">
            <select className={selectClass} value={bulkMajorCode} onChange={e => setBulkMajorCode(e.target.value)} disabled={bulkSaving}>
              {majorOptions.map(code => (
                <option key={code} value={code}>{majorLabels[code]}</option>
              ))}
            </select>
          </FormField>

          <div>
            <input
              type="file"
              ref={bulkFileInputRef}
              accept="image/*"
              multiple
              onChange={handleBulkFilesSelected}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => bulkFileInputRef.current?.click()}
              disabled={bulkSaving}
              className="w-full py-3 border-2 border-dashed border-indigo-200 rounded-xl text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors disabled:opacity-50"
            >
              + Pilih Beberapa Foto (bisa pilih banyak sekaligus)
            </button>
          </div>

          {bulkItems.length > 0 && (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {bulkItems.map((it, idx) => (
                <div key={idx} className="flex gap-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                  <img src={it.previewUrl} className="w-16 h-16 object-cover rounded-lg border border-gray-200 shrink-0" alt="" />
                  <div className="flex-1 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        className={`${inputClass} text-xs py-1.5`}
                        value={it.title}
                        onChange={e => updateBulkField(idx, 'title', e.target.value)}
                        placeholder="Judul (EN)"
                        disabled={it.status === 'uploading' || it.status === 'done'}
                      />
                      <input
                        className={`${inputClass} text-xs py-1.5`}
                        value={it.title_id}
                        onChange={e => updateBulkField(idx, 'title_id', e.target.value)}
                        placeholder="Judul (ID) — opsional"
                        disabled={it.status === 'uploading' || it.status === 'done'}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        className={`${inputClass} text-xs py-1.5`}
                        value={it.subtitle}
                        onChange={e => updateBulkField(idx, 'subtitle', e.target.value)}
                        placeholder="Subjudul (EN) — opsional"
                        disabled={it.status === 'uploading' || it.status === 'done'}
                      />
                      <input
                        className={`${inputClass} text-xs py-1.5`}
                        value={it.subtitle_id}
                        onChange={e => updateBulkField(idx, 'subtitle_id', e.target.value)}
                        placeholder="Subjudul (ID) — opsional"
                        disabled={it.status === 'uploading' || it.status === 'done'}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-semibold ${
                        it.status === 'done' ? 'text-green-600'
                        : it.status === 'error' ? 'text-red-500'
                        : it.status === 'uploading' ? 'text-indigo-500'
                        : 'text-gray-400'
                      }`}>
                        {it.status === 'pending' && 'Menunggu'}
                        {it.status === 'uploading' && 'Mengunggah...'}
                        {it.status === 'done' && '✓ Berhasil'}
                        {it.status === 'error' && `✗ ${it.errorMsg}`}
                      </span>
                      {it.status === 'pending' && (
                        <button type="button" onClick={() => removeBulkItem(idx)} className="text-[11px] text-red-500 hover:underline">
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={closeBulk}
              className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {allBulkDone ? 'Tutup' : 'Batal'}
            </button>
            {!allBulkDone && (
              <button
                type="button"
                onClick={submitBulk}
                disabled={bulkSaving || bulkItems.length === 0}
                className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {bulkSaving ? 'Mengunggah...' : `Upload ${bulkItems.length} Foto`}
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PANEL 3: KONTEN KATEGORI (intro / detail / closing per jurusan) — BARU
// ══════════════════════════════════════════════════════════════════
function TefaCategoryContentPanel() {
  const [majorCode, setMajorCode] = useState('it');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const emptyForm = {
    intro: '', intro_id: '',
    detail: '', detail_id: '',
    closing: '', closing_id: '',
  };
  const [form, setForm] = useState(emptyForm);

  const fetchData = async (code: string) => {
    try {
      setLoading(true);
      const data: TefaCategoryContentData = await getAdminTefaCategoryContent(code);
      setForm({
        intro: data.intro || '',
        intro_id: data.intro_id || '',
        detail: data.detail || '',
        detail_id: data.detail_id || '',
        closing: data.closing || '',
        closing_id: data.closing_id || '',
      });
    } catch (error) {
      console.error('Gagal memuat konten kategori TeFa:', error);
      setForm(emptyForm);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(majorCode); }, [majorCode]);

  const save = async () => {
    try {
      setSaving(true);
      await updateTefaCategoryContent(majorCode, form);
      alert('Konten kategori berhasil disimpan.');
    } catch (error) {
      console.error('Gagal menyimpan konten kategori TeFa:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5">
        <FormField label="Pilih Jurusan" required>
          <select className={selectClass} value={majorCode} onChange={e => setMajorCode(e.target.value)}>
            {majorOptions.map(code => (
              <option key={code} value={code}>{majorLabels[code]}</option>
            ))}
          </select>
        </FormField>

        <p className="text-xs text-gray-400 -mt-2">
          Teks di bawah ini tampil di halaman TeFa publik pada bagian deskripsi kategori (paragraf pembuka, detail, dan penutup).
        </p>

        {loading ? (
          <div className="py-10 text-center text-sm text-gray-400">Memuat konten...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Intro (EN)" required>
                <textarea className={textareaClass} rows={3} value={form.intro} onChange={e => setForm({ ...form, intro: e.target.value })} />
              </FormField>
              <FormField label="Intro (ID)" hint="Opsional">
                <textarea className={textareaClass} rows={3} value={form.intro_id} onChange={e => setForm({ ...form, intro_id: e.target.value })} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Detail (EN)" required>
                <textarea className={textareaClass} rows={4} value={form.detail} onChange={e => setForm({ ...form, detail: e.target.value })} />
              </FormField>
              <FormField label="Detail (ID)" hint="Opsional">
                <textarea className={textareaClass} rows={4} value={form.detail_id} onChange={e => setForm({ ...form, detail_id: e.target.value })} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Closing (EN)" required>
                <textarea className={textareaClass} rows={3} value={form.closing} onChange={e => setForm({ ...form, closing: e.target.value })} />
              </FormField>
              <FormField label="Closing (ID)" hint="Opsional">
                <textarea className={textareaClass} rows={3} value={form.closing_id} onChange={e => setForm({ ...form, closing_id: e.target.value })} />
              </FormField>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="px-6 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : 'Simpan Konten Kategori'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PANEL 4: KARTU PROGRAM (maks 3 per jurusan) — bisa tambah dari form, tanpa seeder
// ══════════════════════════════════════════════════════════════════
function TefaProgramsPanel() {
  const [majorCode, setMajorCode] = useState('it');
  const [programs, setPrograms] = useState<TefaProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);

  const emptyNewForm = { title: '', title_id: '', description: '', description_id: '' };
  const [newForm, setNewForm] = useState(emptyNewForm);

  const fetchData = async (code: string) => {
    try {
      setLoading(true);
      setFetchError('');
      const data = await getAdminTefaPrograms(code);
      setPrograms(Array.isArray(data) ? data.sort((a, b) => a.program_order - b.program_order) : []);
    } catch (error: any) {
      console.error('Gagal memuat program TeFa:', error);
      setFetchError(
        error?.response?.status === 403
          ? 'Akses ditolak. Akun Anda perlu role admin untuk mengakses modul ini.'
          : error?.response?.data?.message || 'Gagal memuat data program dari server.'
      );
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(majorCode); }, [majorCode]);

  const updateField = (id: number, field: keyof TefaProgramData, value: string) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const saveProgram = async (program: TefaProgramData) => {
    try {
      setSavingId(program.id);
      await updateTefaProgram(program.id, {
        major_code: program.major_code,
        program_order: program.program_order,
        title: program.title,
        title_id: program.title_id,
        description: program.description,
        description_id: program.description_id,
      });
      alert(`Kartu program #${program.program_order} berhasil disimpan.`);
    } catch (error) {
      console.error('Gagal menyimpan program TeFa:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
    } finally {
      setSavingId(null);
    }
  };

  const deleteProgram = async (program: TefaProgramData) => {
    if (!confirm(`Yakin ingin menghapus kartu program "${program.title}"?`)) return;
    try {
      setDeletingId(program.id);
      await deleteTefaProgram(program.id);
      fetchData(majorCode);
    } catch (error) {
      console.error('Gagal menghapus program TeFa:', error);
      alert('Gagal menghapus data. Silakan coba lagi.');
    } finally {
      setDeletingId(null);
    }
  };

  const nextOrder = () => {
    const usedOrders = programs.map(p => p.program_order);
    for (let i = 1; i <= 3; i++) {
      if (!usedOrders.includes(i)) return i;
    }
    return null; // sudah penuh 3
  };

  const addProgram = async () => {
    const order = nextOrder();
    if (!order) {
      alert('Jurusan ini sudah memiliki 3 kartu program (maksimum).');
      return;
    }
    if (!newForm.title.trim() || !newForm.description.trim()) {
      alert('Judul (EN) dan Deskripsi (EN) wajib diisi.');
      return;
    }
    try {
      setAdding(true);
      await createTefaProgram({
        major_code: majorCode,
        program_order: order,
        title: newForm.title,
        title_id: newForm.title_id,
        description: newForm.description,
        description_id: newForm.description_id,
      });
      setNewForm(emptyNewForm);
      fetchData(majorCode);
    } catch (error: any) {
      console.error('Gagal menambah program TeFa:', error);
      alert(error?.response?.data?.message || 'Gagal menambah data. Silakan coba lagi.');
    } finally {
      setAdding(false);
    }
  };

  const slotAvailable = nextOrder() !== null;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <FormField label="Pilih Jurusan" required>
          <select className={selectClass} value={majorCode} onChange={e => setMajorCode(e.target.value)}>
            {majorOptions.map(code => (
              <option key={code} value={code}>{majorLabels[code]}</option>
            ))}
          </select>
        </FormField>
        <p className="text-xs text-gray-400 -mt-2">
          Maksimal 3 kartu program yang tampil di halaman TeFa publik untuk jurusan ini ({programs.length}/3 terisi).
        </p>
      </div>

      {fetchError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
          {fetchError}
        </div>
      )}

      {loading ? (
        <div className="py-10 text-center text-sm text-gray-400">Memuat program...</div>
      ) : (
        <div className="space-y-4">
          {programs.map(program => (
            <div key={program.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <Badge color="blue">Kartu #{program.program_order}</Badge>
                <button
                  type="button"
                  onClick={() => deleteProgram(program)}
                  disabled={deletingId === program.id}
                  className="text-xs text-red-500 hover:underline disabled:opacity-50"
                >
                  {deletingId === program.id ? 'Menghapus...' : 'Hapus'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Judul (EN)" required>
                  <input className={inputClass} value={program.title} onChange={e => updateField(program.id, 'title', e.target.value)} />
                </FormField>
                <FormField label="Judul (ID)" hint="Opsional">
                  <input className={inputClass} value={program.title_id || ''} onChange={e => updateField(program.id, 'title_id', e.target.value)} />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Deskripsi (EN)" required>
                  <textarea className={textareaClass} rows={3} value={program.description} onChange={e => updateField(program.id, 'description', e.target.value)} />
                </FormField>
                <FormField label="Deskripsi (ID)" hint="Opsional">
                  <textarea className={textareaClass} rows={3} value={program.description_id || ''} onChange={e => updateField(program.id, 'description_id', e.target.value)} />
                </FormField>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => saveProgram(program)}
                  disabled={savingId === program.id}
                  className="px-5 py-2 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {savingId === program.id ? 'Menyimpan...' : `Simpan Kartu #${program.program_order}`}
                </button>
              </div>
            </div>
          ))}

          {/* Form Tambah Kartu Baru — tidak butuh seeder */}
          {slotAvailable ? (
            <div className="bg-indigo-50/50 rounded-2xl border-2 border-dashed border-indigo-200 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Badge color="green">+ Kartu Baru #{nextOrder()}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Judul (EN)" required>
                  <input
                    className={inputClass}
                    value={newForm.title}
                    onChange={e => setNewForm({ ...newForm, title: e.target.value })}
                    placeholder="Contoh: Web Development Studio"
                  />
                </FormField>
                <FormField label="Judul (ID)" hint="Opsional">
                  <input
                    className={inputClass}
                    value={newForm.title_id}
                    onChange={e => setNewForm({ ...newForm, title_id: e.target.value })}
                    placeholder="Contoh: Studio Pengembangan Web"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Deskripsi (EN)" required>
                  <textarea
                    className={textareaClass}
                    rows={3}
                    value={newForm.description}
                    onChange={e => setNewForm({ ...newForm, description: e.target.value })}
                    placeholder="Jelaskan program ini..."
                  />
                </FormField>
                <FormField label="Deskripsi (ID)" hint="Opsional">
                  <textarea
                    className={textareaClass}
                    rows={3}
                    value={newForm.description_id}
                    onChange={e => setNewForm({ ...newForm, description_id: e.target.value })}
                    placeholder="Terjemahan deskripsi..."
                  />
                </FormField>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={addProgram}
                  disabled={adding}
                  className="px-5 py-2 bg-green-600 rounded-xl text-sm font-medium text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {adding ? 'Menambahkan...' : `+ Tambah Kartu Program #${nextOrder()}`}
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-gray-400 bg-gray-50 rounded-2xl border border-gray-100">
              Jurusan ini sudah memiliki 3 kartu program (maksimum tercapai).
            </div>
          )}
        </div>
      )}
    </div>
  );
}