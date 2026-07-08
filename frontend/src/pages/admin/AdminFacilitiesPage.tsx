import React, { useState, useEffect } from 'react';
import { getAdminFacilities, createFacility, updateFacility, deleteFacility } from '@/services/Facility';

// Import komponen admin dari folder components
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';

// Interface Data Fasilitas Jurusan
interface Facility {
  id: number;
  image_url: string;
  name: string;          // Nama Fasilitas (misal: Lab Komputer A, Kitchen Utama)
  major_code: string;    // 'it' | 'culinary' | 'vcd' | 'hospitality' | 'accounting' | 'general'
  condition: string;     // 'Baik' | 'Perbaikan' | 'Rusak'
  location: string;      // Gedung / Ruang
  description: string;
  is_active: boolean;
}

export default function AdminFacilityPage() {
  const [items, setItems] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Facility | null>(null);
  const [search, setSearch] = useState('');

  // Inisialisasi form default
  const [form, setForm] = useState({
    image_url: '',
    name: '',
    major_code: 'it',
    condition: 'Baik',
    location: '',
    description: '',
    is_active: true
  });

  // Filter pencarian berdasarkan nama fasilitas, lokasi, atau deskripsi
  const filtered = items.filter(i =>
    String(i.name || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.location || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.description || '').toLowerCase().includes(search.toLowerCase())
  );

  // Aksi Buka Modal Tambah
  const openAdd = () => {
    setEditing(null);
    setForm({ image_url: '', name: '', major_code: 'it', condition: 'Baik', location: '', description: '', is_active: true });
    setModal(true);
  };

  // Aksi Buka Modal Edit
  const openEdit = (item: Facility) => {
    setEditing(item);
    setForm({ image_url: item.image_url, name: item.name, major_code: item.major_code, condition: item.condition, location: item.location, description: item.description, is_active: item.is_active });
    setModal(true);
  };

  // Fetch data dari API
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAdminFacilities();
      setItems(Array.isArray(data) ? data.filter(Boolean) : []);
    } catch (error) {
      console.error('Gagal memuat data fasilitas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Aksi Simpan (Create / Update)
  const save = async () => {
    try {
      if (editing) {
        await updateFacility(editing.id, form);
      } else {
        await createFacility(form);
      }
      setModal(false);
      fetchData();
    } catch (error) {
      console.error('Gagal menyimpan data fasilitas:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
    }
  };

  // Aksi Hapus
  const del = async (id: number) => {
    if (!confirm('Yakin ingin menghapus fasilitas ini?')) return;
    try {
      await deleteFacility(id);
      fetchData();
    } catch (error) {
      console.error('Gagal menghapus data fasilitas:', error);
      alert('Gagal menghapus data. Silakan coba lagi.');
    }
  };

  // Mapping warna badge berdasarkan penempatan jurusan
  const majorColors: Record<string, string> = {
    it: 'blue',
    culinary: 'amber',
    vcd: 'purple',
    hospitality: 'green',
    accounting: 'gray',
    general: 'indigo'
  };

  // Mapping teks label untuk jurusan
  const majorLabels: Record<string, string> = {
    it: 'IT',
    culinary: 'Culinary',
    vcd: 'VCD',
    hospitality: 'Hospitality',
    accounting: 'Accounting',
    general: 'Umum / Bersama'
  };

  // Mapping warna untuk kondisi barang/fasilitas
  const conditionColors: Record<string, string> = {
    'Baik': 'green',
    'Perbaikan': 'yellow',
    'Rusak': 'red'
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Fasilitas Sekolah" subtitle="Kelola sarana prasarana dan ruang praktik penunjang per jurusan" onAdd={openAdd} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama fasilitas, lokasi gedung..." />
        </div>

        <DataTable
          columns={[
            {
              key: 'image_url',
              label: 'Foto Sarana',
              render: (item: Facility) => (
                <img 
                  src={item.image_url} 
                  className="w-16 h-10 object-cover rounded-lg border border-gray-100 shadow-sm" 
                  alt="" 
                  onError={e => (e.currentTarget.src = 'https://placehold.co/64x40/e2e8f0/94a3b8?text=Fasilitas')} 
                />
              )
            },
            {
              key: 'name',
              label: 'Nama Fasilitas & Lokasi',
              render: (item: Facility) => (
                <div>
                  <span className="font-semibold text-gray-900 block">{item.name}</span>
                  <span className="text-gray-400 text-[11px] block">{item.location}</span>
                </div>
              )
            },
            {
              key: 'major_code',
              label: 'Kepemilikan Jurusan',
              render: (item: Facility) => (
                <Badge color={majorColors[item.major_code] || 'gray'}>
                  {majorLabels[item.major_code] || String(item.major_code || '').toUpperCase()}
                </Badge>
              )
            },
            {
              key: 'condition',
              label: 'Kondisi',
              render: (item: Facility) => (
                <Badge color={conditionColors[item.condition] || 'gray'}>
                  {item.condition}
                </Badge>
              )
            },
            {
              key: 'is_active',
              label: 'Katalog',
              render: (item: Facility) => (
                <Badge color={item.is_active ? 'green' : 'gray'}>
                  {item.is_active ? 'Tampil' : 'Sembunyi'}
                </Badge>
              )
            },
          ]}
          data={filtered}
          onEdit={openEdit}
          onDelete={del}
        />
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Data Fasilitas' : 'Tambah Fasilitas Baru'}>
        <div className="space-y-4">
          <ImageUploadField value={form.image_url} onChange={url => setForm({ ...form, image_url: url })} label="Foto Ruang / Alat Fasilitas" />

          <FormField label="Nama Fasilitas / Sarana" required>
            <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Studio Foto Digital, Lab Akuntansi Komputer" />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Pengguna / Jurusan" required>
              <select className={selectClass} value={form.major_code} onChange={e => setForm({ ...form, major_code: e.target.value })}>
                <option value="it">IT (Informatika)</option>
                <option value="culinary">Culinary (Tata Boga)</option>
                <option value="vcd">VCD (DKV)</option>
                <option value="hospitality">Hospitality (Perhotelan)</option>
                <option value="accounting">Accounting (Akuntansi)</option>
                <option value="general">Fasilitas Umum (Bersama)</option>
              </select>
            </FormField>

            <FormField label="Kondisi Fisik Saat Ini" required>
              <select className={selectClass} value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })}>
                <option value="Baik">Baik / Layak Pakai</option>
                <option value="Perbaikan">Dalam Perbaikan (Maintenance)</option>
                <option value="Rusak">Rusak / Tidak Dapat Digunakan</option>
              </select>
            </FormField>
          </div>

          <FormField label="Lokasi Spesifik / Letak Ruang" required>
            <input className={inputClass} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Contoh: Gedung A, Ruang 203 Lantai 2" />
          </FormField>

          <FormField label="Spesifikasi & Deskripsi Fasilitas">
            <textarea className={textareaClass} rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Tulis rincian alat, kapasitas daya tampung siswa, atau fungsi laboratorium di sini..." />
          </FormField>

          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" id="facility-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="facility-active" className="text-sm font-medium text-gray-700 select-none">Tampilkan di halaman profil fasilitas publik website</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Fasilitas</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}