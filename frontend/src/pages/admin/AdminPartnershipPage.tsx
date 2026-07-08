import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';

import { PartnerData } from '@/services/Partner';

export default function AdminPartnershipPage() {
  const [items, setItems] = useState<PartnerData[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<PartnerData | null>(null);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    logo_url: '',
    company_name: '',
    location: '',
    website_url: '',
    is_active: true,
  });

  const loadData = async () => {
    try {
      setLoading(true);

      const res = await api.get('/api/admin/partnerships');

      const data = res.data.data || res.data;

      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Gagal mengambil data partnership', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = Array.isArray(items)
    ? items.filter(
        (i) =>
          i.company_name?.toLowerCase().includes(search.toLowerCase()) ||
          i.location?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const openAdd = () => {
    setEditing(null);

    setForm({
      logo_url: '',
      company_name: '',
      location: '',
      website_url: '',
      is_active: true,
    });

    setModal(true);
  };

  const openEdit = (item: PartnerData) => {
    setEditing(item);

    setForm({
      logo_url: item.logo_url,
      company_name: item.company_name,
      location: item.location,
      website_url: item.website_url,
      is_active: item.is_active,
    });

    setModal(true);
  };

  const save = async () => {
    try {
      if (editing) {
        await api.put(`/api/admin/partnerships/${editing.id}`, form);
      } else {
        await api.post('/api/admin/partnerships', form);
      }

      setModal(false);
      loadData();
    } catch (err: any) {
      console.error(err);

      if (err.response?.data?.errors) {
        console.log(err.response.data.errors);
        alert(JSON.stringify(err.response.data.errors));
      } else {
        alert('Gagal menyimpan data.');
      }
    }
  };

  const del = async (id: number) => {
    if (!confirm('Apakah yakin ingin menghapus data?')) return;

    try {
      await api.delete(`/api/admin/partnerships/${id}`);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Kemitraan"
        subtitle="Daftar perusahaan mitra sekolah"
        onAdd={openAdd}
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Cari perusahaan..."
          />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Sedang memproses data...
          </div>
        ) : (
          <DataTable
            columns={[
              {
                key: 'logo_url',
                label: 'Logo',
                render: (item: PartnerData) => (
                  <img
                    src={item.logo_url}
                    className="w-14 h-14 rounded-lg border object-contain"
                    alt=""
                    onError={(e) =>
                      (e.currentTarget.src =
                        'https://placehold.co/56x56?text=Logo')
                    }
                  />
                ),
              },
              {
                key: 'company_name',
                label: 'Perusahaan',
              },
              {
                key: 'location',
                label: 'Lokasi',
              },
              {
                key: 'website_url',
                label: 'Website',
                render: (item: PartnerData) =>
                  item.website_url ? (
                    <a
                      href={item.website_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      {item.website_url}
                    </a>
                  ) : (
                    '-'
                  ),
              },
              {
                key: 'is_active',
                label: 'Status',
                render: (item: PartnerData) => (
                  <Badge color={item.is_active ? 'green' : 'gray'}>
                    {item.is_active ? 'Aktif' : 'Nonaktif'}
                  </Badge>
                ),
              },
            ]}
            data={filtered}
            onEdit={openEdit}
            onDelete={del}
          />
        )}
      </div>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={editing ? 'Edit Mitra' : 'Tambah Mitra'}
      >
        <div className="space-y-4">
          <ImageUploadField
            value={form.logo_url}
            onChange={(url) =>
              setForm({
                ...form,
                logo_url: url,
              })
            }
            label="Logo Perusahaan"
          />

          <FormField label="Nama Perusahaan" required>
            <input
              className={inputClass}
              value={form.company_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  company_name: e.target.value,
                })
              }
            />
          </FormField>

          <FormField label="Lokasi">
            <input
              className={inputClass}
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
            />
          </FormField>

          <FormField label="Website">
            <input
              className={inputClass}
              value={form.website_url}
              onChange={(e) =>
                setForm({
                  ...form,
                  website_url: e.target.value,
                })
              }
              placeholder="https://example.com"
            />
          </FormField>

          <div className="flex items-center gap-3">
            <input
              id="partner-active"
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_active: e.target.checked,
                })
              }
              className="w-4 h-4 accent-indigo-600"
            />

            <label
              htmlFor="partner-active"
              className="text-sm font-medium text-gray-700"
            >
              Tampilkan di website
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setModal(false)}
              className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm"
            >
              Batal
            </button>

            <button
              onClick={save}
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm"
            >
              Simpan
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}