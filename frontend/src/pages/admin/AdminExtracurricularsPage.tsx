import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';
import { 
  getAdminExtracurriculars, 
  createExtracurricular, 
  updateExtracurricular, 
  deleteExtracurricular,
  Extracurricular 
} from '@/services/Extracurricular';

export default function AdminExtracurricularPage() {
  const [items, setItems] = useState<Extracurricular[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Extracurricular | null>(null);
  const [search, setSearch] = useState('');
  
  const [form, setForm] = useState<Omit<Extracurricular, 'id'>>({ 
    name: '', category: 'Sports', coach_name: '', schedule: '', intensity: '', description: '', track_record: '', registration_link: '', image_url: '', is_active: true 
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAdminExtracurriculars();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = items.filter(i => 
    (i.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (i.coach_name || '').toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { 
    setEditing(null); 
    setForm({ name: '', category: 'Sports', coach_name: '', schedule: '', intensity: '', description: '', track_record: '', registration_link: '', image_url: '', is_active: true }); 
    setModal(true); 
  };

  const openEdit = (item: Extracurricular) => { 
    setEditing(item); 
    setForm({ 
      name: item.name, category: item.category, coach_name: item.coach_name, schedule: item.schedule, intensity: item.intensity, description: item.description || '', track_record: item.track_record || '', registration_link: item.registration_link || '', image_url: item.image_url, is_active: item.is_active 
    }); 
    setModal(true); 
  };

  const save = async () => {
    try {
      if (editing) {
        await updateExtracurricular(editing.id, form);
      } else {
        await createExtracurricular(form);
      }
      setModal(false);
      loadData();
    } catch (error) {
      alert("Gagal menyimpan data ekstrakurikuler. Periksa kembali jaringan atau server.");
    }
  };

  const del = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus ekstrakurikuler ini?")) return;
    try {
      await deleteExtracurricular(id);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const catColors: Record<string, string> = { Sports: 'green', Arts: 'purple', Specialized: 'blue' };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Ekstrakurikuler" subtitle="Kelola kegiatan ekstrakurikuler siswa" onAdd={openAdd} />
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama ekskul atau pembina..." />
        </div>
        
        {loading ? (
          <div className="p-12 text-center text-gray-500 font-medium">Sedang memuat data...</div>
        ) : (
          <DataTable
            columns={[
              { 
                key: 'image_url', 
                label: 'Foto', 
                render: (item: Extracurricular) => (
                  <img 
                    src={item.image_url} 
                    className="w-16 h-10 object-cover rounded-lg border border-gray-100 shadow-sm" 
                    alt="" 
                    onError={e => (e.currentTarget.src = 'https://placehold.co/64x40/e2e8f0/94a3b8?text=?')} 
                  />
                ) 
              },
              { 
                key: 'name', 
                label: 'Nama Ekskul', 
                render: (item: Extracurricular) => <span className="font-semibold text-gray-900 block">{item.name}</span> 
              },
              { 
                key: 'category', 
                label: 'Kategori', 
                render: (item: Extracurricular) => (
                  <Badge color={catColors[item.category] || 'gray'}>
                    {item.category === 'Sports' ? 'Olahraga' : item.category === 'Arts' ? 'Seni' : 'Khusus/Sains'}
                  </Badge>
                ) 
              },
              { key: 'coach_name', label: 'Pembina' },
              { 
                key: 'schedule', 
                label: 'Jadwal / Intensitas', 
                render: (item: Extracurricular) => (
                  <div>
                    <div className="text-xs text-gray-700 font-medium">{item.schedule}</div>
                    <div className="text-[10px] text-gray-400 font-normal">{item.intensity}</div>
                  </div>
                ) 
              },
              { 
                key: 'is_active', 
                label: 'Status', 
                render: (item: Extracurricular) => (
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

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Ekskul' : 'Tambah Ekskul'} size="lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <ImageUploadField value={form.image_url} onChange={url => setForm({ ...form, image_url: url })} label="Foto Utama Kegiatan" />
          </div>
          
          <FormField label="Nama Ekskul" required>
            <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Paskibra / Pramuka" />
          </FormField>
          
          <FormField label="Kategori Bidang" required>
            <select className={selectClass} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="Sports">Sports (Olahraga)</option>
              <option value="Arts">Arts (Seni & Kreatif)</option>
              <option value="Specialized">Specialized (Bidang Khusus / Sains)</option>
            </select>
          </FormField>
          
          <FormField label="Nama Pembina / Pelatih">
            <input className={inputClass} value={form.coach_name} onChange={e => setForm({ ...form, coach_name: e.target.value })} placeholder="Contoh: Pak Budi Supardi" />
          </FormField>
          
          <FormField label="Intensitas Latihan" hint="Frekuensi pertemuan berkala">
            <input className={inputClass} value={form.intensity} onChange={e => setForm({ ...form, intensity: e.target.value })} placeholder="Contoh: 1x seminggu" />
          </FormField>
          
          <div className="col-span-2">
            <FormField label="Jadwal Pelaksanaan">
              <input className={inputClass} value={form.schedule} onChange={e => setForm({ ...form, schedule: e.target.value })} placeholder="Contoh: Setiap Sabtu, 07.00 - 10.00" />
            </FormField>
          </div>
          
          <div className="col-span-2">
            <FormField label="Deskripsi Kegiatan">
              <textarea className={textareaClass} rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Jelaskan ringkasan aktivitas ekstrakurikuler ini..." />
            </FormField>
          </div>
          
          <div className="col-span-2">
            <FormField label="Track Record / Riwayat Prestasi">
              <textarea className={textareaClass} rows={2} value={form.track_record} onChange={e => setForm({ ...form, track_record: e.target.value })} placeholder="Contoh: Juara 1 Umum LKBB Kota 2025" />
            </FormField>
          </div>
          
          <div className="col-span-2">
            <FormField label="Link Formulir Pendaftaran Online" hint="Kosongkan jika pendaftaran ditutup">
              <input className={inputClass} value={form.registration_link} onChange={e => setForm({ ...form, registration_link: e.target.value })} placeholder="https://forms.gle/..." />
            </FormField>
          </div>

          <div className="col-span-2 flex items-center gap-3 py-1">
            <input type="checkbox" id="ekskul-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="ekskul-active" className="text-sm font-medium text-gray-700 select-none">Aktif / Tampilkan di katalog pilihan siswa</label>
          </div>
          
          <div className="col-span-2 flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Ekskul</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}