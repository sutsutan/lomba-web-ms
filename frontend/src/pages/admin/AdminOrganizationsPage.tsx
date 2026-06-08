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

  const [form, setForm] = useState<OrganizationData>({
    logo_url: '',
    name: '',
    category: 'leadership',
    leader_name: '',
    advisor_name: '',
    description: '',
    is_active: true
  });

  // Fetch data dari API saat pertama kali halaman dimuat
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
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.leader_name.toLowerCase().includes(search.toLowerCase()) ||
    i.advisor_name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ logo_url: '', name: '', category: 'leadership', leader_name: '', advisor_name: '', description: '', is_active: true });
    setModal(true);
  };

  const openEdit = (item: OrganizationData) => {
    setEditing(item);
    setForm({ ...item });
    setModal(true);
  };

  // Aksi Simpan menggunakan API
  const save = async () => {
    try {
      if (editing && editing.id) {
        const updated = await organizationService.update(editing.id, form);
        setItems(items.map(i => i.id === editing.id ? updated : i));
      } else {
        const created = await organizationService.create(form);
        setItems([...items, created]);
      }
      setModal(false);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  // Aksi Hapus menggunakan API
  const del = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus organisasi ini?")) {
      try {
        await organizationService.delete(id);
        setItems(items.filter(i => i.id !== id));
      } catch (error) {
        console.error("Gagal menghapus data:", error);
      }
    }
  };

  // Penyesuaian Rumpun Warna (Diselaraskan dengan Publik)
  const categoryColors: Record<string, string> = {
    leadership: 'blue',
    creative: 'purple',
    discipline: 'amber',
    wellness: 'green'
  };

  const categoryLabels: Record<string, string> = {
    leadership: 'Leadership & Inti',
    creative: 'Creative, Arts & Media',
    discipline: 'Discipline & Character',
    wellness: 'Wellness, Tech & Faith'
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
              {
                key: 'logo_url',
                label: 'Lambang',
                render: (item: any) => (
                  <img 
                    src={item.logo_url} 
                    className="w-10 h-10 object-contain rounded-xl border border-gray-100 shadow-sm bg-gray-50" 
                    alt="" 
                    onError={e => (e.currentTarget.src = 'https://placehold.co/40x40/e2e8f0/94a3b8?text=Org')} 
                  />
                )
              },
              {
                key: 'name',
                label: 'Nama Organisasi',
                render: (item: any) => {
                  const org = item as OrganizationData;
                  return (
                    <div>
                      <span className="font-semibold text-gray-900 block leading-tight mb-0.5">{org.name}</span>
                      <span className="text-gray-400 text-[11px] block font-normal">Pembina: {org.advisor_name}</span>
                    </div>
                  );
                }
              },
              {
                key: 'category',
                label: 'Rumpun Fokus',
                render: (item: any) => (
                  <Badge color={categoryColors[item.category] || 'gray'}>
                    {categoryLabels[item.category] || String(item.category).toUpperCase()}
                  </Badge>
                )
              },
              { key: 'leader_name', label: 'Ketua Umum' },
              {
                key: 'is_active',
                label: 'Status Registrasi',
                render: (item: any) => (
                  <Badge color={item.is_active ? 'green' : 'gray'}>
                    {item.is_active ? 'Aktif' : 'Vakum'}
                  </Badge>
                )
              },
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

          <FormField label="Nama Lengkap Organisasi / Lembaga" required>
            <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Majelis Perwakilan Kelas (MPK)" />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Rumpun Kategori" required>
              <select className={selectClass} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="leadership">Leadership (Kepemimpinan & Inti)</option>
                <option value="creative">Creative (Seni, Media & Jurnalistik)</option>
                <option value="discipline">Discipline (Kedisiplinan & Karakter)</option>
                <option value="wellness">Wellness (Kesehatan, Agama & Teknologi)</option>
              </select>
            </FormField>

            <FormField label="Ketua Umum Organisasi (Siswa)" required>
              <input className={inputClass} value={form.leader_name} onChange={e => setForm({ ...form, leader_name: e.target.value })} placeholder="Nama siswa..." />
            </FormField>
          </div>

          <FormField label="Guru Pembina Utama" required>
            <input className={inputClass} value={form.advisor_name} onChange={e => setForm({ ...form, advisor_name: e.target.value })} placeholder="Nama guru pembina..." />
          </FormField>

          <FormField label="Visi Misi & Deskripsi" required>
            <textarea className={textareaClass} rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi kegiatan..." />
          </FormField>

          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" id="org-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="org-active" className="text-sm font-medium text-gray-700 select-none">Status Aktif (Tampilkan di halaman utama)</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Organisasi</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}