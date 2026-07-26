import React, { useState, useEffect } from 'react';
import { getAdminFacilities, createFacility, updateFacility, deleteFacility, FacilityData } from '@/services/Facility';
import { getAdminMajors, MajorData } from '@/services/Major';

import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';

export default function AdminFacilityPage() {
  const [items, setItems] = useState<FacilityData[]>([]);
  const [majors, setMajors] = useState<MajorData[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<FacilityData | null>(null);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    image_url: '',
    name: '',
    major_id: null as number | null,
    condition: 'Baik',
    location: '',
    description: '',
    is_active: true
  });

  const filtered = items.filter(i =>
    String(i.name || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.location || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.description || '').toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({
      image_url: '',
      name: '',
      major_id: majors[0]?.id ?? null,
      condition: 'Baik',
      location: '',
      description: '',
      is_active: true
    });
    setModal(true);
  };

  const openEdit = (item: FacilityData) => {
    setEditing(item);
    setForm({
      image_url: item.image_url,
      name: item.name,
      major_id: item.major_id,
      condition: item.condition || 'Baik',
      location: item.location || '',
      description: item.description || '',
      is_active: item.is_active
    });
    setModal(true);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [facilityData, majorData] = await Promise.all([
        getAdminFacilities(),
        getAdminMajors(),
      ]);
      setItems(Array.isArray(facilityData) ? facilityData.filter(Boolean) : []);
      setMajors(Array.isArray(majorData) ? majorData.filter(Boolean) : []);
    } catch (error) {
      console.error('Gagal memuat data fasilitas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const save = async () => {
    if (!form.name || !form.major_id) {
      alert('Mohon lengkapi field Nama Fasilitas dan Jurusan (*).');
      return;
    }
    try {
      if (editing) {
        await updateFacility(editing.id, form);
      } else {
        await createFacility(form);
      }
      setModal(false);
      fetchData();
    } catch (error: any) {
      console.error('Gagal menyimpan data fasilitas:', error);
      alert(error.response?.data?.message || 'Gagal menyimpan data. Silakan coba lagi.');
    }
  };

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

  const majorColors: Record<string, string> = {
    it: 'blue',
    culinary: 'amber',
    dkv: 'purple',
    hospitality: 'green',
    accounting: 'gray'
  };

  const conditionColors: Record<string, string> = {
    'Baik': 'green',
    'Perbaikan': 'yellow',
    'Rusak': 'red'
  };

  // Cari data jurusan by id, untuk ditampilkan sebagai badge di tabel
  const getMajorById = (majorId: number | null) => majors.find(m => m.id === majorId);

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Fasilitas Sekolah (Practical Lab Facilities)" subtitle="Kelola sarana prasarana dan ruang praktik penunjang per jurusan" onAdd={openAdd} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama fasilitas, lokasi gedung..." />
        </div>

        <DataTable
          columns={[
            {
              key: 'image_url',
              label: 'Foto Sarana',
              render: (item: FacilityData) => (
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
              render: (item: FacilityData) => (
                <div>
                  <span className="font-semibold text-gray-900 block">{item.name}</span>
                  <span className="text-gray-400 text-[11px] block">{item.location}</span>
                </div>
              )
            },
            {
              key: 'major_id',
              label: 'Kepemilikan Jurusan',
              render: (item: FacilityData) => {
                const major = getMajorById(item.major_id);
                return (
                  <Badge color={majorColors[major?.code || ''] || 'gray'}>
                    {major ? major.name : 'Tidak diketahui'}
                  </Badge>
                );
              }
            },
            {
              key: 'condition',
              label: 'Kondisi',
              render: (item: FacilityData) => (
                <Badge color={conditionColors[item.condition] || 'gray'}>
                  {item.condition}
                </Badge>
              )
            },
            {
              key: 'is_active',
              label: 'Katalog',
              render: (item: FacilityData) => (
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
          <ImageUploadField value={form.image_url} onChange={url => setForm({ ...form, image_url: url })} label="Foto Ruang / Alat Fasilitas (Practical Lab)" folder="facilities" />

          <FormField label="Nama Fasilitas / Sarana" required>
            <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Studio Foto Digital, Lab Akuntansi Komputer" />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Pengguna / Jurusan" required>
              <select
                className={selectClass}
                value={form.major_id ?? ''}
                onChange={e => setForm({ ...form, major_id: e.target.value ? Number(e.target.value) : null })}
              >
                <option value="" disabled>Pilih Jurusan...</option>
                {majors.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.code.toUpperCase()})</option>
                ))}
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

          <FormField label="Lokasi Spesifik / Letak Ruang">
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