import React, { useState, useEffect } from 'react';
import { getAdminMajors, createMajor, updateMajor, deleteMajor } from '@/services/Major';

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
  is_active: boolean;
}

export default function AdminMajorPage() {
  const [items, setItems] = useState<Major[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Major | null>(null);
  const [search, setSearch] = useState('');

  // Inisialisasi form default
  const [form, setForm] = useState({
    code: 'it',
    name: '',
    head_of_major: '',
    description: '',
    total_students: 0,
    is_active: true
  });

  // Filter pencarian berdasarkan nama jurusan atau nama ketua jurusan
  const filtered = items.filter(i =>
    String(i.name || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.head_of_major || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.code || '').toLowerCase().includes(search.toLowerCase())
  );

  // Aksi Buka Modal Tambah
  const openAdd = () => {
    setEditing(null);
    setForm({ code: 'it', name: '', head_of_major: '', description: '', total_students: 0, is_active: true });
    setModal(true);
  };

  // Aksi Buka Modal Edit
  const openEdit = (item: Major) => {
    setEditing(item);
    setForm({ code: item.code, name: item.name, head_of_major: item.head_of_major, description: item.description, total_students: item.total_students, is_active: item.is_active });
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
    try {
      if (editing) {
        await updateMajor(editing.id, form);
      } else {
        await createMajor(form);
      }
      setModal(false);
      fetchData();
    } catch (error) {
      console.error('Gagal menyimpan data jurusan:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
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
          </div>

          <FormField label="Nama Lengkap Jurusan (Sesuai Kurikulum)" required>
            <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Pengembangan Perangkat Lunak dan Gim" />
          </FormField>

          <FormField label="Ketua Program Keahlian / Kakomli" required>
            <input className={inputClass} value={form.head_of_major} onChange={e => setForm({ ...form, head_of_major: e.target.value })} placeholder="Nama Guru beserta gelar..." />
          </FormField>

          <FormField label="Profil & Deskripsi Singkat Jurusan" required>
            <textarea className={textareaClass} rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Tuliskan fokus materi, prospek kerja, atau keunggulan jurusan di sini..." />
          </FormField>

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
    </div>
  );
}