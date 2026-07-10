import React, { useState, useEffect } from 'react';
import { getAdminMajors, createMajor, updateMajor, deleteMajor } from '@/services/Major';
import { getPublicActivityGalleriesByMajor, ActivityGalleryData } from '@/services/ActivityGallery';
import { Archive, X } from 'lucide-react';

// Import komponen admin dari folder components
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';

// Interface Data Jurusan
interface Major {
  id: number;
  code: string; // 'it' | 'culinary' | 'vcd' | 'hospitality' | 'accounting'
  name: string; // Nama Lengkap Jurusan
  head_of_major: string; // Ketua Kompetensi Keahlian (Kakomli)
  description: string;
  total_students: number;
  total_partners: number;
  lab_image?: string;
  lab_title?: string;
  activity_image?: string;
  curriculum_image?: string;
  is_active: boolean;
}

export default function AdminMajorPage() {
  const [items, setItems] = useState<Major[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Major | null>(null);
  const [search, setSearch] = useState('');

  // State untuk modal arsip gallery
  const [archiveModal, setArchiveModal] = useState(false);
  const [archiveMajor, setArchiveMajor] = useState<Major | null>(null);
  const [archiveItems, setArchiveItems] = useState<ActivityGalleryData[]>([]);
  const [archiveLoading, setArchiveLoading] = useState(false);

  // Inisialisasi form default
  const [form, setForm] = useState({
    code: 'it',
    name: '',
    head_of_major: '',
    description: '',
    total_students: 0,
    total_partners: 0,
    lab_image: '',
    lab_title: '',
    activity_image: '',
    curriculum_image: '',
    is_active: true
  });

  // Filter pencarian berdasarkan nama jurusan atau nama ketua jurusan
  const filtered = items.filter(i =>
    String(i.name || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.head_of_major || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.code || '').toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ code: 'it', name: '', head_of_major: '', description: '', total_students: 0, total_partners: 0, lab_image: '', lab_title: '', activity_image: '', curriculum_image: '', is_active: true });
    setModal(true);
  };

  const openEdit = (item: Major) => {
    setEditing(item);
    setForm({ code: item.code, name: item.name, head_of_major: item.head_of_major, description: item.description, total_students: item.total_students, total_partners: item.total_partners || 0, lab_image: item.lab_image || '', lab_title: item.lab_title || '', activity_image: item.activity_image || '', curriculum_image: item.curriculum_image || '', is_active: item.is_active });
    setModal(true);
  };

  // Fetch data dari API
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAdminMajors();
      setItems(Array.isArray(data) ? data.filter(Boolean) : []);
    } catch (error) {
      console.error('Gagal memuat data jurusan:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Aksi Simpan (Create / Update)
  const save = async () => {
    if (!form.name || !form.head_of_major) {
      alert('Mohon lengkapi field Nama Lengkap dan Ketua Program (*).');
      return;
    }
    try {
      if (editing) {
        await updateMajor(editing.id, form);
      } else {
        await createMajor(form);
      }
      setModal(false);
      fetchData();
    } catch (error: any) {
      console.error('Gagal menyimpan data jurusan:', error);
      alert(error.response?.data?.message || 'Gagal menyimpan data. Silakan coba lagi.');
    }
  };

  // Aksi Hapus
  const del = async (id: number) => {
    if (!confirm('Yakin ingin menghapus jurusan ini?')) return;
    try {
      await deleteMajor(id);
      fetchData();
    } catch (error) {
      console.error('Gagal menghapus data jurusan:', error);
      alert('Gagal menghapus data. Silakan coba lagi.');
    }
  };

  // Buka modal arsip gallery per jurusan
  const openArchive = async (item: Major) => {
    setArchiveMajor(item);
    setArchiveModal(true);
    setArchiveLoading(true);
    try {
      const data = await getPublicActivityGalleriesByMajor(item.code);
      setArchiveItems(data.filter(g => g.is_archived));
    } catch {
      setArchiveItems([]);
    } finally {
      setArchiveLoading(false);
    }
  };

  // Mapping warna badge berdasarkan kode kode jurusan
  const majorColors: Record<string, string> = {
    it: 'blue',
    culinary: 'amber',
    vcd: 'purple',
    hospitality: 'green',
    accounting: 'gray'
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Jurusan & Program Keahlian" subtitle="Kelola data jurusan, deskripsi kompetensi, dan ketua program studi" onAdd={openAdd} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama jurusan atau ketua kompetensi..." />
        </div>

        <DataTable
          columns={[
            {
              key: 'code',
              label: 'Kode',
              render: (item: Major) => (
                <Badge color={majorColors[item.code] || 'gray'}>
                  {String(item.code || '').toUpperCase()}
                </Badge>
              )
            },
            {
              key: 'name',
              label: 'Nama Program Keahlian',
              render: (item: Major) => <span className="font-semibold text-gray-900 block">{item.name}</span>
            },
            { key: 'head_of_major', label: 'Ketua Jurusan (Kakomli)' },
            {
              key: 'total_students',
              label: 'Total Siswa',
              render: (item: Major) => <span className="text-sm font-medium text-gray-700">{item.total_students} Siswa</span>
            },
            {
              key: 'is_active',
              label: 'Status',
              render: (item: Major) => (
                <Badge color={item.is_active ? 'green' : 'gray'}>
                  {item.is_active ? 'Aktif' : 'Nonaktif'}
                </Badge>
              )
            },
          ]}
          data={filtered}
          onEdit={openEdit}
          onDelete={del}
          extraActions={(item: Major) => (
            <button
              type="button"
              onClick={() => openArchive(item)}
              title={`Lihat Arsip Gallery ${item.name}`}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1"
            >
              <Archive size={12} />
              Arsip
            </button>
          )}
        />
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Informasi Jurusan' : 'Tambah Jurusan Baru'}>
        <div className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Identifikasi Kode" required>
              <select className={selectClass} value={form.code} onChange={e => setForm({ ...form, code: e.target.value })}>
                <option value="it">IT (Information Technology)</option>
                <option value="culinary">Culinary (Tata Boga)</option>
                <option value="vcd">VCD (Visual Communication Design)</option>
                <option value="hospitality">Hospitality (Perhotelan)</option>
                <option value="accounting">Accounting (Akuntansi)</option>
              </select>
            </FormField>

            <FormField label="Estimasi Jumlah Siswa">
              <input type="number" className={inputClass} value={form.total_students} onChange={e => setForm({ ...form, total_students: Number(e.target.value) })} placeholder="0" />
            </FormField>

            <FormField label="Estimasi Jumlah Mitra (Partners)">
              <input type="number" className={inputClass} value={form.total_partners} onChange={e => setForm({ ...form, total_partners: Number(e.target.value) })} placeholder="0" />
            </FormField>
          </div>

          <FormField label="Nama Lengkap Jurusan (Sesuai Kurikulum)" required>
            <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Pengembangan Perangkat Lunak dan Gim" />
          </FormField>

          <FormField label="Ketua Program Keahlian / Kakomli" required>
            <input className={inputClass} value={form.head_of_major} onChange={e => setForm({ ...form, head_of_major: e.target.value })} placeholder="Nama Guru beserta gelar..." />
          </FormField>

          <div className="flex flex-col gap-2">
            <ImageUploadField 
              label="Gambar Practical Lab Facilities" 
              value={form.lab_image} 
              onChange={(url) => setForm({ ...form, lab_image: url })} 
              folder="majors" 
            />
            {form.lab_image && (
              <button 
                type="button" 
                onClick={() => setForm({ ...form, lab_image: '' })} 
                className="self-start text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition-colors"
              >
                Hapus Gambar Practical Lab Facilities
              </button>
            )}
          </div>

          <FormField label="Title Ruangan (Practical Lab Facilities)">
            <input className={inputClass} value={form.lab_title} onChange={e => setForm({ ...form, lab_title: e.target.value })} placeholder="Contoh: Lab Komputer Jaringan..." />
          </FormField>

          <div className="flex flex-col gap-2">
            <ImageUploadField 
              label="Gambar Curriculum Focus" 
              value={form.curriculum_image} 
              onChange={(url) => setForm({ ...form, curriculum_image: url })} 
              folder="majors" 
            />
            {form.curriculum_image && (
              <button 
                type="button" 
                onClick={() => setForm({ ...form, curriculum_image: '' })} 
                className="self-start text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition-colors"
              >
                Hapus Gambar Curriculum Focus
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <ImageUploadField 
              label="Gambar Activity Gallery" 
              value={form.activity_image} 
              onChange={(url) => setForm({ ...form, activity_image: url })} 
              folder="majors" 
            />
            {form.activity_image && (
              <button 
                type="button" 
                onClick={() => setForm({ ...form, activity_image: '' })} 
                className="self-start text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition-colors"
              >
                Hapus Gambar Activity Gallery
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" id="major-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="major-active" className="text-sm font-medium text-gray-700 select-none">Aktif (Tampilkan di menu profil program keahlian)</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Jurusan</button>
          </div>
        </div>
      </Modal>

      {/* MODAL ARSIP GALLERY */}
      {archiveModal && (
        <div className="fixed inset-0 z-[300] flex flex-col bg-gray-950/95 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-500/20 p-2.5">
                <Archive size={20} className="text-amber-400" />
              </div>
              <div>
                <h2 className="text-lg font-black uppercase tracking-tight text-white">
                  Activity Archive
                </h2>
                <p className="text-xs font-medium text-white/40">
                  {archiveMajor?.name} ({String(archiveMajor?.code || '').toUpperCase()}) — {archiveItems.length} foto arsip
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => { setArchiveModal(false); setArchiveItems([]); }}
              className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {archiveLoading ? (
              <div className="flex h-full items-center justify-center text-white/40">
                <p className="text-sm font-medium">Memuat arsip...</p>
              </div>
            ) : archiveItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-white/30">
                <Archive size={40} />
                <p className="text-sm font-semibold">Belum ada foto di arsip untuk jurusan ini</p>
                <p className="text-xs text-white/20">Arsipkan foto dari halaman Galeri Kegiatan</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {archiveItems.map(item => (
                  <div key={item.id} className="group relative h-48 overflow-hidden rounded-xl bg-gray-800 shadow-md">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={e => (e.currentTarget.src = 'https://placehold.co/300x200/1f2937/6b7280?text=Archived')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 w-full p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="text-xs font-bold leading-tight text-white">{item.title}</p>
                      {item.activity_date && (
                        <p className="mt-0.5 text-[10px] text-white/50">
                          {new Date(item.activity_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                    <div className="absolute left-2 top-2">
                      <span className="rounded-full bg-amber-500/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-amber-300 backdrop-blur-sm">
                        Archive
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}