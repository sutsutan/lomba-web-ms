  import React, { useState } from 'react';

  // Import komponen admin dari folder components
  import PageHeader from '@/components/admin/PageHeader';
  import DataTable from '@/components/admin/DataTable';
  import Badge from '@/components/admin/Badge';
  import Modal from '@/components/admin/Modal';
  import FormField, { inputClass } from '@/components/admin/FormField';
  import ImageUploadField from '@/components/admin/ImageUploadField';
  import SearchBar from '@/components/admin/SearchBar';

  // Interface Data Perusahaan Mitra
  interface Partner {
    id: number;
    logo_url: string;
    company_name: string;
    location: string;
    website_url: string;
    is_active: boolean;
  }

  export default function AdminPartnershipPage() {
    const [items, setItems] = useState<Partner[]>([
      { id: 1, logo_url: 'https://placehold.co/120x60/6366f1/fff?text=PT+ABC', company_name: 'PT Teknologi Nusantara', location: 'Jakarta', website_url: 'https://example.com', is_active: true },
      { id: 2, logo_url: 'https://placehold.co/120x60/10b981/fff?text=CV+XYZ', company_name: 'CV Kuliner Jaya', location: 'Bandung', website_url: 'https://example.com', is_active: true },
    ]);

    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState<Partner | null>(null);
    const [search, setSearch] = useState('');
    
    // Inisialisasi form default
    const [form, setForm] = useState({ 
      logo_url: '', 
      company_name: '', 
      location: '', 
      website_url: '', 
      is_active: true 
    });

    // Filter pencarian berdasarkan nama perusahaan atau lokasi
    const filtered = items.filter(i => 
      i.company_name.toLowerCase().includes(search.toLowerCase()) ||
      i.location.toLowerCase().includes(search.toLowerCase())
    );

    // Aksi Buka Modal Tambah Mitra
    const openAdd = () => { 
      setEditing(null); 
      setForm({ logo_url: '', company_name: '', location: '', website_url: '', is_active: true }); 
      setModal(true); 
    };

    // Aksi Buka Modal Edit Mitra
    const openEdit = (item: Partner) => { 
      setEditing(item); 
      setForm({ logo_url: item.logo_url, company_name: item.company_name, location: item.location, website_url: item.website_url, is_active: item.is_active }); 
      setModal(true); 
    };

    // Aksi Simpan (Create / Update)
    const save = () => {
      if (editing) {
        setItems(items.map(i => i.id === editing.id ? { ...i, ...form } : i));
      } else {
        setItems([...items, { id: Date.now(), ...form }]);
      }
      setModal(false);
    };

    // Aksi Hapus
    const del = (id: number) => setItems(items.filter(i => i.id !== id));

    return (
      <div className="p-6 space-y-6">
        <PageHeader title="Kemitraan & Industri" subtitle="Data perusahaan mitra kerja sama sekolah" onAdd={openAdd} />
        
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <SearchBar value={search} onChange={setSearch} placeholder="Cari nama perusahaan atau lokasi..." />
          </div>
          
          <DataTable
            columns={[
              { 
                key: 'logo_url', 
                label: 'Logo', 
                render: (item: Partner) => (
                  <div className="bg-gray-50 rounded-lg p-1.5 inline-block border border-gray-100">
                    <img 
                      src={item.logo_url} 
                      className="h-7 w-auto object-contain max-w-[100px]" 
                      alt="" 
                      onError={e => (e.currentTarget.src = 'https://placehold.co/60x32/e2e8f0/94a3b8?text=logo')} 
                    />
                  </div>
                ) 
              },
              { 
                key: 'company_name', 
                label: 'Nama Perusahaan', 
                render: (item: Partner) => <span className="font-semibold text-gray-900 block">{item.company_name}</span> 
              },
              { key: 'location', label: 'Lokasi Kota' },
              { 
                key: 'website_url', 
                label: 'Tautan URL Website', 
                render: (item: Partner) => (
                  item.website_url ? (
                    <a href={item.website_url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-medium truncate max-w-xs block">
                      {item.website_url}
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm italic">-</span>
                  )
                ) 
              },
              { 
                key: 'is_active', 
                label: 'Status', 
                render: (item: Partner) => (
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

        <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Mitra Industri' : 'Tambah Mitra Industri'}>
          <div className="space-y-4">
            <ImageUploadField value={form.logo_url} onChange={url => setForm({ ...form, logo_url: url })} label="Logo Resmi Perusahaan" />
            
            <FormField label="Nama Perusahaan / Instansi" required>
              <input className={inputClass} value={form.company_name} onChange={e => setForm({ ...form, company_name: e.target.value })} placeholder="Contoh: PT Teknologi Nusantara" />
            </FormField>
            
            <FormField label="Lokasi Operasional">
              <input className={inputClass} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Contoh: Jakarta / Bandung" />
            </FormField>
            
            <FormField label="Alamat URL Website">
              <input className={inputClass} value={form.website_url} onChange={e => setForm({ ...form, website_url: e.target.value })} placeholder="https://perusahaan.com" />
            </FormField>

            <div className="flex items-center gap-3 py-1">
              <input type="checkbox" id="partner-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
              <label htmlFor="partner-active" className="text-sm font-medium text-gray-700 select-none">Kemitraan Aktif (Tampilkan di halaman kerja sama industri)</label>
            </div>
            
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
              <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Mitra</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }