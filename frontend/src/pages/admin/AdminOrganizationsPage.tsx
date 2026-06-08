import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';

// Import API Service
import { organizationService, OrganizationData } from '@/services/Organization';

export default function AdminOrganizationPage() {
  const [items, setItems] = useState<OrganizationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<OrganizationData | null>(null);
  const [search, setSearch] = useState('');

  const initialFormState: OrganizationData = {
    logo_url: '',
    name: '',
    category: 'leadership',
    leader_name: '',
    advisor_name: '',
    description_id: '',
    description_en: '',
    is_active: true
  };

  const [form, setForm] = useState<OrganizationData>(initialFormState);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await organizationService.getAll();
      setItems(data);
    } catch (error) {
      console.error("Gagal mengambil data organisasi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = items.filter(i =>
    i.name?.toLowerCase().includes(search.toLowerCase()) ||
    i.leader_name?.toLowerCase().includes(search.toLowerCase()) ||
    i.advisor_name?.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm(initialFormState);
    setModal(true);
  };

  const openEdit = (item: OrganizationData) => {
    setEditing(item);
    setForm({ ...item });
    setModal(true);
  };

  const save = async () => {
    try {
      const payload = {
        name: form.name,
        category: form.category,
        leader_name: form.leader_name,
        advisor_name: form.advisor_name,
        description_id: form.description_id,
        description_en: form.description_en || '',
        logo_url: form.logo_url,
        is_active: form.is_active,
      };

      if (editing && editing.id) {
        const updated = await organizationService.update(editing.id, payload as OrganizationData);
        setItems(items.map(i => i.id === editing.id ? updated : i));
      } else {
        const created = await organizationService.create(payload as OrganizationData);
        setItems([...items, created]);
      }
      
      setModal(false);
      alert("Data berhasil disimpan!");
    } catch (error: any) {
      const errorResponse = error.response?.data?.errors;
      const message = errorResponse 
        ? Object.values(errorResponse).flat().join(', ') 
        : (error.response?.data?.message || error.message || "Terjadi kesalahan server.");
      alert("Gagal menyimpan: " + message);
    }
  };

  const del = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus organisasi ini?")) {
      try {
        await organizationService.delete(id);
        setItems(items.filter(i => i.id !== id));
      } catch (error) {
        alert("Gagal menghapus data.");
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Organisasi Siswa" subtitle="Kelola organisasi inti, kepengurusan struktur siswa, dan dewan pembina" onAdd={openAdd} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama organisasi..." />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500 font-medium">Memuat data...</div>
        ) : (
          <DataTable
            columns={[
              { key: 'logo_url', label: 'Lambang', render: (item: any) => <img src={item.logo_url} className="w-10 h-10 object-contain rounded-xl border border-gray-100" alt="" /> },
              { key: 'name', label: 'Nama Organisasi', render: (item: any) => <div><span className="font-semibold text-gray-900 block">{item.name}</span><span className="text-gray-400 text-[11px] block">Pembina: {item.advisor_name}</span></div> },
              { key: 'category', label: 'Rumpun Fokus', render: (item: any) => <Badge color="gray">{item.category}</Badge> },
              // Kolom Deskripsi Baru
              { key: 'description_id', label: 'Deskripsi (ID)', render: (item: any) => <div className="text-xs text-gray-600 truncate max-w-[150px]">{item.description_id}</div> },
              { key: 'description_en', label: 'Description (EN)', render: (item: any) => <div className="text-xs text-gray-600 truncate max-w-[150px]">{item.description_en}</div> },
              { key: 'is_active', label: 'Status', render: (item: any) => <Badge color={item.is_active ? 'green' : 'gray'}>{item.is_active ? 'Aktif' : 'Vakum'}</Badge> },
            ]}
            data={filtered}
            onEdit={(item: any) => openEdit(item as OrganizationData)}
            onDelete={(item: any) => item.id && del(item.id)}
          />
        )}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Profil Organisasi' : 'Daftarkan Organisasi Baru'}>
        <div className="space-y-4">
          <ImageUploadField value={form.logo_url} onChange={url => setForm({ ...form, logo_url: url })} label="Logo Resmi Organisasi" />
          
          <FormField label="Nama Lengkap Organisasi" required>
            <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Rumpun Kategori" required>
              <select className={selectClass} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="leadership">Leadership</option>
                <option value="creative">Creative</option>
                <option value="discipline">Discipline</option>
                <option value="wellness">Wellness</option>
              </select>
            </FormField>
            <FormField label="Ketua Umum" required>
              <input className={inputClass} value={form.leader_name} onChange={e => setForm({ ...form, leader_name: e.target.value })} />
            </FormField>
          </div>

          <FormField label="Guru Pembina" required>
            <input className={inputClass} value={form.advisor_name} onChange={e => setForm({ ...form, advisor_name: e.target.value })} />
          </FormField>
          
          <FormField label="Visi Misi & Deskripsi (Bahasa Indonesia)" required>
            <textarea className={textareaClass} rows={3} value={form.description_id} onChange={e => setForm({ ...form, description_id: e.target.value })} placeholder="Deskripsi dalam Bahasa Indonesia..." />
          </FormField>

          <FormField label="Vision, Mission & Description (English)">
            <textarea className={textareaClass} rows={3} value={form.description_en || ''} onChange={e => setForm({ ...form, description_en: e.target.value })} placeholder="English description..." />
          </FormField>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border rounded-xl text-sm font-medium">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white">Simpan Organisasi</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}