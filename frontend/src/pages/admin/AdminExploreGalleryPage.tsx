import React, { useState, useEffect } from 'react';
import {
  getAdminExploreGalleries,
  createExploreGallery,
  updateExploreGallery,
  deleteExploreGallery,
  ExploreGalleryData,
  ExploreGalleryPayload,
  OrganizationRef,
  ExtracurricularRef,
} from '@/services/ExploreGallery';
import { organizationService } from '@/services/Organization';
import { getAdminExtracurriculars } from '@/services/Extracurricular';

import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass, textareaClass } from '@/components/admin/FormField';
import SearchBar from '@/components/admin/SearchBar';
import MultiImageUploadField from '@/components/admin/MultiImageUploadField';
type RelationType = 'organization' | 'extracurricular';

export default function AdminExploreGalleryPage() {
  const [items, setItems] = useState<ExploreGalleryData[]>([]);
  const [organizations, setOrganizations] = useState<OrganizationRef[]>([]);
  const [extracurriculars, setExtracurriculars] = useState<ExtracurricularRef[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<ExploreGalleryData | null>(null);
  const [search, setSearch] = useState('');

  const [relationType, setRelationType] = useState<RelationType>('organization');
  const [form, setForm] = useState<ExploreGalleryPayload>({
    organization_id: null,
    extracurricular_id: null,
    news_id: null,
    event_name: '',
    traits_achievement: '',
    documentation_urls: [],
    year: new Date().getFullYear(),
    is_active: true,
});

  const filtered = items.filter(i =>
    String(i.event_name || '').toLowerCase().includes(search.toLowerCase()) ||
    String(i.traits_achievement || '').toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setRelationType('organization');
    setForm({
      organization_id: organizations[0]?.id ?? null,
      extracurricular_id: null,
      news_id: null,
      event_name: '',
      traits_achievement: '',
      documentation_urls: [],
      year: new Date().getFullYear(),
      is_active: true,
    });
};

  const openAdd = () => {
    setEditing(null);
    resetForm();
    setModal(true);
  };

  const openEdit = (item: ExploreGalleryData) => {
    setEditing(item);
    const type: RelationType = item.extracurricular_id ? 'extracurricular' : 'organization';
    setRelationType(type);
    setForm({
      organization_id: item.organization_id,
      extracurricular_id: item.extracurricular_id,
      news_id: item.news_id,
      event_name: item.event_name,
      traits_achievement: item.traits_achievement || '',
      documentation_urls: Array.isArray(item.documentation_urls) && item.documentation_urls.length > 0
        ? item.documentation_urls
        : (item.documentation_url ? [item.documentation_url] : []),
      year: item.year,
      is_active: item.is_active,
    });
    setModal(true);
};

  const fetchData = async () => {
    try {
      setLoading(true);
      const [galleryData, orgData, ekskulData] = await Promise.all([
        getAdminExploreGalleries(),
        organizationService.getAll(),
        getAdminExtracurriculars(),
      ]);
      setItems(Array.isArray(galleryData) ? galleryData.filter(Boolean) : []);
      setOrganizations(Array.isArray(orgData) ? (orgData as any) : []);
      setExtracurriculars(Array.isArray(ekskulData) ? (ekskulData as any) : []);
    } catch (error) {
      console.error('Gagal memuat data explore gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleRelationTypeChange = (type: RelationType) => {
    setRelationType(type);
    setForm({
      ...form,
      organization_id: type === 'organization' ? (organizations[0]?.id ?? null) : null,
      extracurricular_id: type === 'extracurricular' ? (extracurriculars[0]?.id ?? null) : null,
    });
  };

 const save = async () => {
    if (!form.event_name || (!form.organization_id && !form.extracurricular_id)) {
      alert('Mohon lengkapi Nama Kegiatan dan pilih Organisasi/Ekskul terkait.');
      return;
    }
    if (!form.documentation_urls || form.documentation_urls.length === 0) {
      alert('Minimal unggah 1 foto dokumentasi.');
      return;
    }
    try {
      if (editing) {
        await updateExploreGallery(editing.id, form);
      } else {
        await createExploreGallery(form);
      }
      setModal(false);
      fetchData();
    } catch (error: any) {
      console.error('Gagal menyimpan data explore gallery:', error);
      alert(error?.response?.data?.message || 'Gagal menyimpan data. Silakan coba lagi.');
    }
};

  const del = async (id: number) => {
    if (!confirm('Yakin ingin menghapus item galeri ini?')) return;
    try {
      await deleteExploreGallery(id);
      fetchData();
    } catch (error) {
      console.error('Gagal menghapus data explore gallery:', error);
      alert('Gagal menghapus data. Silakan coba lagi.');
    }
  };

  const typeColors: Record<string, string> = {
    organization: 'blue',
    extracurricular: 'green',
  };

  const getRelatedLabel = (item: ExploreGalleryData) => {
    if (item.extracurricular_id) return item.extracurricular?.name || `Ekskul #${item.extracurricular_id}`;
    if (item.organization_id) return item.organization?.name || `Organisasi #${item.organization_id}`;
    return '-';
  };

  const getRelationTypeLabel = (item: ExploreGalleryData) =>
    item.extracurricular_id ? '🏅 Ekstrakurikuler' : '🔗 Organisasi';

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Jelajah Galeri" subtitle="Kelola dokumentasi kegiatan & prestasi Organisasi dan Ekstrakurikuler" onAdd={openAdd} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama kegiatan atau prestasi..." />
        </div>

        <DataTable
          columns={[
           {
            key: 'documentation_url',
            label: 'Dokumentasi',
            render: (item: ExploreGalleryData) => {
              const photos = Array.isArray(item.documentation_urls) && item.documentation_urls.length > 0
                ? item.documentation_urls
                : (item.documentation_url ? [item.documentation_url] : []);
              return (
                <div className="relative w-20 h-12">
                  <img
                    src={photos[0]}
                    className="w-20 h-12 object-cover rounded-xl border border-gray-100 shadow-sm bg-gray-50"
                    alt=""
                    onError={e => (e.currentTarget.src = 'https://placehold.co/80x48/e2e8f0/94a3b8?text=No+Media')}
                  />
                  {photos.length > 1 && (
                    <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow">
                      +{photos.length - 1}
                    </span>
                  )}
                </div>
              );
            }
          },
            {
              key: 'event_name',
              label: 'Nama Kegiatan & Tahun',
              render: (item: ExploreGalleryData) => (
                <div>
                  <span className="font-semibold text-gray-900 block leading-tight mb-0.5">{item.event_name}</span>
                  <span className="text-gray-400 text-[11px] block font-normal">Tahun {item.year}</span>
                </div>
              )
            },
            {
              key: 'relation',
              label: 'Sumber Terhubung',
              render: (item: ExploreGalleryData) => (
                <Badge color={typeColors[item.extracurricular_id ? 'extracurricular' : 'organization']}>
                  {getRelationTypeLabel(item)}
                </Badge>
              )
            },
            {
              key: 'related_to',
              label: 'Nama Relasi',
              render: (item: ExploreGalleryData) => (
                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md inline-block max-w-[180px] truncate">
                  {getRelatedLabel(item)}
                </span>
              )
            },
            {
              key: 'is_active',
              label: 'Visibilitas',
              render: (item: ExploreGalleryData) => (
                <Badge color={item.is_active ? 'green' : 'gray'}>
                  {item.is_active ? 'Tampil' : 'Arsip'}
                </Badge>
              )
            },
          ]}
          data={filtered}
          onEdit={openEdit}
          onDelete={del}
        />
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Galeri Jelajah' : 'Tambah Galeri Jelajah'}>
        <div className="space-y-4">
          <MultiImageUploadField
              values={form.documentation_urls}
              onChange={documentation_urls => setForm({ ...form, documentation_urls })}
              label="Foto Dokumentasi Kegiatan"
              folder="explore-galleries"
              maxImages={10}
          />

          <FormField label="Nama Kegiatan / Event" required>
            <input className={inputClass} value={form.event_name} onChange={e => setForm({ ...form, event_name: e.target.value })} placeholder="Contoh: Latihan Gabungan Paskibra, Pentas Seni Tahunan" />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Hubungkan Konten Ke" required>
              <select
                className={selectClass}
                value={relationType}
                onChange={e => handleRelationTypeChange(e.target.value as RelationType)}
              >
                <option value="organization">Organisasi & Kepengurusan</option>
                <option value="extracurricular">Ekstrakurikuler</option>
              </select>
            </FormField>

           {relationType === 'organization' ? (
            <FormField label="Pilih Organisasi" required>
              <select
                className={selectClass}
                value={form.organization_id ?? ''}
                onChange={e => setForm({ ...form, organization_id: e.target.value ? Number(e.target.value) : null })}
              >
                <option value="" disabled>Pilih Organisasi...</option>
                {organizations.map(org => (
                  <option key={org.id} value={org.id}>{org.name} ({org.category})</option>
                ))}
              </select>
              {organizations.length === 0 && (
                <p className="mt-1 text-[11px] text-amber-600">Belum ada data organisasi. Tambahkan dulu di menu Organisasi.</p>
              )}
              {form.organization_id && (
                <p className="mt-1 text-[11px] text-teal-600">
                  Item ini akan tampil di section <strong>{organizations.find(o => o.id === form.organization_id)?.category}</strong> pada halaman MoreOrg.
                </p>
              )}
            </FormField>
          ) : (
            <FormField label="Pilih Ekstrakurikuler" required>
              <select
                className={selectClass}
                value={form.extracurricular_id ?? ''}
                onChange={e => setForm({ ...form, extracurricular_id: e.target.value ? Number(e.target.value) : null })}
              >
                <option value="" disabled>Pilih Ekskul...</option>
                {extracurriculars.map(ek => (
                  <option key={ek.id} value={ek.id}>{ek.name} ({ek.category})</option>
                ))}
              </select>
              {extracurriculars.length === 0 && (
                <p className="mt-1 text-[11px] text-amber-600">Belum ada data ekstrakurikuler. Tambahkan dulu di menu Ekstrakurikuler.</p>
              )}
              {form.extracurricular_id && (
                <p className="mt-1 text-[11px] text-teal-600">
                  Item ini akan tampil di halaman detail ekskul: <strong>{extracurriculars.find(e => e.id === form.extracurricular_id)?.name}</strong>.
                </p>
              )}
            </FormField>
          )}
          </div>

          <FormField label="Tahun Kegiatan" required>
            <input
              type="number"
              className={inputClass}
              value={form.year}
              onChange={e => setForm({ ...form, year: Number(e.target.value) })}
              placeholder={String(new Date().getFullYear())}
            />
          </FormField>

          <FormField label="Prestasi / Ciri Khas Kegiatan">
            <textarea
              className={textareaClass}
              rows={4}
              value={form.traits_achievement}
              onChange={e => setForm({ ...form, traits_achievement: e.target.value })}
              placeholder="Contoh: Juara 1 Lomba Tari Tradisional Tingkat Kota, atau ceritakan momen kegiatan ini..."
            />
          </FormField>

          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" id="explore-active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600" />
            <label htmlFor="explore-active" className="text-sm font-medium text-gray-700 select-none">Aktifkan konten di halaman publik</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Galeri</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}