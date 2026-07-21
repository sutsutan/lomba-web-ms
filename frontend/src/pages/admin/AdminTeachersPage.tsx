import React, { useState, useEffect } from 'react';
import api from '@/lib/api'; // ➕ Pastikan path import axios instance Anda sudah benar

import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';

interface Teacher { 
  id: number; 
  name: string; 
  nip: string; 
  division: string; 
  role: string; 
  quote: string; 
  competencies_tags: string; 
  profile_picture: string; 
  is_active: boolean; 
}

export default function AdminTeachersPage() {
  const [items, setItems] = useState<Teacher[]>([]); // 🛠️ Mulai dengan array kosong untuk diisi dari API
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [search, setSearch] = useState('');
  
  const [form, setForm] = useState<Omit<Teacher, 'id'>>({
    name: '', nip: '', division: 'IT', role: '', quote: '', competencies_tags: '', profile_picture: '', is_active: true,
  });

  // ➕ Ambil data dari API Laravel saat halaman Admin dibuka
  const loadTeachers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/teachers');
      // Antisipasi jika Laravel mengirim data langsung atau dibungkus objek pagination
      const data = response.data.data || response.data;
      setItems(Array.isArray(data) ? data.filter(Boolean) : []);
    } catch (error) {
      console.error("Gagal memuat data guru di panel admin:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const filtered = items.filter(i => 
    String(i.name || '').toLowerCase().includes(search.toLowerCase()) || 
    String(i.division || '').toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { 
    setEditing(null); 
    setForm({ name: '', nip: '', division: 'IT', role: '', quote: '', competencies_tags: '', profile_picture: '', is_active: true }); 
    setModal(true); 
  };

  const openEdit = (item: Teacher) => { 
    setEditing(item); 
    setForm({ name: item.name, nip: item.nip, division: item.division, role: item.role, quote: item.quote, competencies_tags: item.competencies_tags, profile_picture: item.profile_picture, is_active: item.is_active }); 
    setModal(true); 
  };

  // ➕ Aksi Simpan (Kirim POST / PUT ke API Laravel)
  const save = async () => {
    try {
      if (editing) {
        // Mode Edit: Kirim request PUT / PATCH ke Laravel
        await api.put(`/admin/teachers/${editing.id}`, form);
      } else {
        // Mode Tambah: Kirim request POST ke Laravel
        await api.post('/admin/teachers', form);
      }
      setModal(false);
      loadTeachers(); // Refresh tabel setelah berhasil menyimpan data
    } catch (error) {
      alert("Gagal menyimpan data guru. Periksa kembali input backend Anda.");
      console.error(error);
    }
  };

  // ➕ Aksi Hapus (Kirim request DELETE ke API Laravel)
  const del = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data guru ini?")) return;
    try {
      await api.delete(`/admin/teachers/${id}`);
      loadTeachers(); // Refresh tabel setelah data terhapus
    } catch (error) {
      console.error("Gagal menghapus data guru:", error);
    }
  };

  const divisions = ['IT', 'Culinary', 'Visual Communication Design', 'Hospitality', 'Accounting', 'general_subject', 'staff'];
  const divColors: Record<string, string> = { 
    IT: 'blue', Culinary: 'yellow', 'Visual Communication Design': 'purple', Hospitality: 'green', Accounting: 'gray', general_subject: 'yellow', staff: 'red' 
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Guru & Staf" subtitle="Data seluruh pendidik dan tenaga kependidikan" onAdd={openAdd} />
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama, NIP, atau divisi..." />
        </div>
        
        {loading ? (
          <div className="p-12 text-center text-gray-500 font-medium">Sedang memuat data guru...</div>
        ) : (
          <DataTable
            columns={[
              { 
                key: 'profile_picture', 
                label: 'Foto', 
                render: (item: Teacher) => (
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
                label: 'Nama / NIP', 
                render: (item: Teacher) => (
                  <div>
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-400 font-normal">{item.nip || 'NIP Belum Diatur'}</div>
                  </div>
                )
              },
              { 
                key: 'division', 
                label: 'Divisi', 
                render: (item: Teacher) => (
                  <Badge color={divColors[item.division] || 'gray'}>
                    {item.division === 'general_subject' ? 'Umum' : item.division === 'staff' ? 'Staf/TU' : item.division}
                  </Badge>
                ) 
              },
              { key: 'role', label: 'Jabatan' },
              { 
                key: 'competencies_tags', 
                label: 'Kompetensi', 
                render: (item: Teacher) => (
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {(item.competencies_tags || '').split(',').slice(0, 3).map(tag => tag.trim()).filter(Boolean).map(tag => (
                      <Badge key={tag} color="gray">{tag}</Badge>
                    ))}
                  </div>
                )
              },
              { 
                key: 'is_active', 
                label: 'Status', 
                render: (item: Teacher) => (
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
        )}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Guru/Staf' : 'Tambah Guru/Staf'} size="lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <ImageUploadField value={form.profile_picture} onChange={url => setForm({ ...form, profile_picture: url })} label="Foto Profil" />
          </div>
          
          <FormField label="Nama Lengkap" required>
            <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Dr. Ahmad Fauzi" />
          </FormField>
          
          <FormField label="NIP">
            <input className={inputClass} value={form.nip} onChange={e => setForm({ ...form, nip: e.target.value })} placeholder="Masukkan NIP jika ada..." />
          </FormField>
          
          <FormField label="Divisi" required>
            <select className={selectClass} value={form.division} onChange={e => setForm({ ...form, division: e.target.value })}>
              <option value="IT">IT (Teknologi Informasi)</option>
              <option value="Culinary">Culinary (Kuliner)</option>
              <option value="Visual Communication Design">Visual Communication Design (DKV)</option>
              <option value="Hospitality">Hospitality (Perhotelan)</option>
              <option value="Accounting">Accounting (Akuntansi)</option>
              <option value="general_subject">Mata Pelajaran Umum</option>
              <option value="staff">Tenaga Kependidikan / Staf TU</option>
            </select>
          </FormField>
          
          <FormField label="Jabatan/Role" required>
            <input className={inputClass} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Contoh: Kepala Lab / Guru Produktif" />
          </FormField>
          
          <div className="col-span-2">
            <FormField label="Quote / Motto">
              <textarea className={textareaClass} rows={2} value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} placeholder="Motto hidup pendidik..." />
            </FormField>
          </div>
          
          <div className="col-span-2">
            <FormField label="Tag Kompetensi" hint="Pisahkan dengan tanda koma tanpa spasi">
              <input className={inputClass} value={form.competencies_tags} onChange={e => setForm({ ...form, competencies_tags: e.target.value })} placeholder="contoh: networking,programming,database" />
            </FormField>
          </div>
          
          <div className="col-span-2 flex items-center gap-3 py-1">
            <input type="checkbox" id="teacher-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="teacher-active" className="text-sm font-medium text-gray-700 select-none">Aktif / Ditampilkan di Website</label>
          </div>
          
          <div className="col-span-2 flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}