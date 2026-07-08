import React, { useState, useEffect } from 'react';
import { getAdminAlumni, createAlumni, updateAlumni, deleteAlumni } from '@/services/Alumni';

// Import komponen admin dari folder components
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';

// Interface Data Alumni Lengkap
interface AlumniItem { 
  id: number; 
  name: string; 
  role: string; 
  tags: string; 
  grad_year: number; 
  location_name: string; 
  latitude?: string;
  longitude?: string;
  testimony?: string;
  is_active: boolean; 
  profile_picture: string; 
}

export default function AdminAlumniPage() {
  const [items, setItems] = useState<AlumniItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<AlumniItem | null>(null);
  const [search, setSearch] = useState('');
  
  // Inisialisasi form default sesuai dengan kebutuhan Smart Globe
  const [form, setForm] = useState({ 
    name: '', 
    role: '', 
    tags: '', 
    grad_year: new Date().getFullYear(), 
    location_name: '', 
    latitude: '', 
    longitude: '', 
    testimony: '', 
    profile_picture: '', 
    is_active: true 
  });

  // Filter pencarian berdasarkan nama alumni
  const filtered = items.filter(i => 
    String(i.name || '').toLowerCase().includes(search.toLowerCase())
  );

  // Aksi Buka Modal Tambah Alumni
  const openAdd = () => { 
    setEditing(null); 
    setForm({ name: '', role: '', tags: '', grad_year: new Date().getFullYear(), location_name: '', latitude: '', longitude: '', testimony: '', profile_picture: '', is_active: true }); 
    setModal(true); 
  };

  // Aksi Buka Modal Edit Alumni
  const openEdit = (item: AlumniItem) => {
    setEditing(item);
    setForm({ 
      name: item.name, 
      role: item.role, 
      tags: item.tags, 
      grad_year: item.grad_year, 
      location_name: item.location_name, 
      latitude: item.latitude || '', 
      longitude: item.longitude || '', 
      testimony: item.testimony || '', 
      profile_picture: item.profile_picture, 
      is_active: item.is_active 
    });
    setModal(true);
  };

  // Fetch data dari API
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAdminAlumni();
      setItems(Array.isArray(data) ? data.filter(Boolean) : []);
    } catch (error) {
      console.error('Gagal memuat data alumni:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Aksi Simpan (Create / Update)
  const save = async () => {
    try {
      if (editing) {
        await updateAlumni(editing.id, form);
      } else {
        await createAlumni(form);
      }
      setModal(false);
      fetchData();
    } catch (error) {
      console.error('Gagal menyimpan data alumni:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
    }
  };

  // Aksi Hapus
  const del = async (id: number) => {
    if (!confirm('Yakin ingin menghapus data alumni ini?')) return;
    try {
      await deleteAlumni(id);
      fetchData();
    } catch (error) {
      console.error('Gagal menghapus data alumni:', error);
      alert('Gagal menghapus data. Silakan coba lagi.');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Data Alumni" subtitle="Kelola data alumni & koordinat untuk Smart Globe" onAdd={openAdd} />
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama alumni..." />
        </div>
        
        <DataTable
          columns={[
            { 
              key: 'profile_picture', 
              label: 'Foto', 
              render: (item: AlumniItem) => (
                <img 
                  src={item.profile_picture} 
                  className="w-10 h-10 rounded-full object-cover border border-gray-100" 
                  alt="" 
                  onError={e => (e.currentTarget.src = `https://placehold.co/40x40/e2e8f0/94a3b8?text=${item.name ? item.name[0] : '?'}`)} 
                />
              ) 
            },
            { 
              key: 'name', 
              label: 'Nama Alumni', 
              render: (item: AlumniItem) => <span className="font-semibold text-gray-900 block">{item.name}</span> 
            },
            { 
              key: 'role', 
              label: 'Pekerjaan / Instansi', 
              render: (item: AlumniItem) => <span className="text-sm text-gray-600 font-normal">{item.role || '-'}</span> 
            },
            { key: 'grad_year', label: 'Angkatan' },
            { key: 'location_name', label: 'Lokasi Pemetaan' },
            { 
              key: 'tags', 
              label: 'Tags', 
              render: (item: AlumniItem) => (
                <div className="flex flex-wrap gap-1 max-w-[150px]">
                  {(item.tags || '').split(',').slice(0, 2).map(t => t.trim()).filter(Boolean).map(t => (
                    <Badge key={t} color="blue">{t}</Badge>
                  ))}
                </div>
              )
            },
            { 
              key: 'is_active', 
              label: 'Status', 
              render: (item: AlumniItem) => (
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

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Alumni' : 'Tambah Alumni'} size="lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <ImageUploadField value={form.profile_picture} onChange={url => setForm({ ...form, profile_picture: url })} label="Foto Profil" />
          </div>
          
          <FormField label="Nama Lengkap" required>
            <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Rizki Pratama" />
          </FormField>
          
          <FormField label="Pekerjaan / Role Saat Ini">
            <input className={inputClass} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Contoh: Software Engineer at Gojek" />
          </FormField>
          
          <FormField label="Tahun Lulus (Angkatan)" required>
            <input type="number" className={inputClass} value={form.grad_year} onChange={e => setForm({ ...form, grad_year: Number(e.target.value) })} />
          </FormField>
          
          <FormField label="Nama Lokasi Wilayah" hint="Contoh: Jakarta, Indonesia">
            <input className={inputClass} value={form.location_name} onChange={e => setForm({ ...form, location_name: e.target.value })} placeholder="Nama kota atau negara" />
          </FormField>
          
          <FormField label="Latitude" hint="Koordinat Smart Globe">
            <input type="number" step="any" className={inputClass} value={form.latitude} onChange={e => setForm({ ...form, latitude: e.target.value })} placeholder="-6.2088" />
          </FormField>
          
          <FormField label="Longitude" hint="Koordinat Smart Globe">
            <input type="number" step="any" className={inputClass} value={form.longitude} onChange={e => setForm({ ...form, longitude: e.target.value })} placeholder="106.8456" />
          </FormField>
          
          <div className="col-span-2">
            <FormField label="Tags Kluster Alumni" hint="Pisahkan dengan koma untuk pemetaan kelompok">
              <input className={inputClass} value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="IT,startup,tech" />
            </FormField>
          </div>
          
          <div className="col-span-2">
            <FormField label="Testimoni / Kesan Pesan">
              <textarea className={textareaClass} rows={3} value={form.testimony} onChange={e => setForm({ ...form, testimony: e.target.value })} placeholder="Tuliskan pengalaman alumni selama bersekolah..." />
            </FormField>
          </div>

          <div className="col-span-2 flex items-center gap-3 py-1">
            <input type="checkbox" id="alumni-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="alumni-active" className="text-sm font-medium text-gray-700 select-none">Aktif / Tampilkan di direktori & Smart Globe</label>
          </div>
          
          <div className="col-span-2 flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Data</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}