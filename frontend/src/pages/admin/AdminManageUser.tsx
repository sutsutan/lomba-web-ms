import React, { useState, useEffect } from 'react';
import { getAdminUsers, createUser, updateUser, deleteUser, UserAccount } from '@/services/User';
import { Eye, EyeOff } from 'lucide-react';

import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';

export default function AdminManageUserPage() {
  const [items, setItems] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<UserAccount | null>(null);
  const [search, setSearch] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    avatar_url: '',
    name: '',
    email: '',
    password: '',
    role: 'marketing' as 'admin' | 'marketing',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAdminUsers({ search: search || undefined });
      setItems(res.data || []);
    } catch (error) {
      console.error('Gagal memuat data user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(fetchData, 400);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const openAdd = () => {
    setEditing(null);
    setForm({ avatar_url: '', name: '', email: '', password: '', role: 'marketing' });
    setShowPassword(false);
    setModal(true);
  };

  const openEdit = (item: UserAccount) => {
    setEditing(item);
    setForm({
      avatar_url: item.avatar_url || '',
      name: item.name,
      email: item.email,
      password: '',
      role: item.role,
    });
    setShowPassword(false);
    setModal(true);
  };

  const save = async () => {
    try {
      const payload = { ...form };
      if (!payload.password) delete (payload as any).password;

      if (editing) {
        await updateUser(editing.id, payload);
      } else {
        await createUser(payload);
      }
      setModal(false);
      fetchData();
    } catch (error: any) {
      console.error('Gagal menyimpan user:', error);
      alert(error?.response?.data?.message || 'Gagal menyimpan data. Silakan coba lagi.');
    }
  };

  const del = async (id: number) => {
    if (!confirm('Yakin ingin menghapus akun ini?')) return;
    try {
      await deleteUser(id);
      fetchData();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Gagal menghapus data.');
    }
  };

  const roleLabels: Record<string, string> = {
    admin: 'Admin',
    marketing: 'Marketing',
  };

  const roleColor: Record<string, 'red' | 'blue'> = {
    admin: 'red',
    marketing: 'blue',
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Manajemen User" subtitle="Kelola akun Admin & Marketing yang dapat mengakses panel CMS" onAdd={openAdd} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama pengguna atau email..." />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600" />
          </div>
        ) : (
          <DataTable
            columns={[
              {
                key: 'avatar_url',
                label: 'Foto',
                render: (item: UserAccount) => (
                  <img
                    src={item.avatar_url || 'https://placehold.co/36x36/e2e8f0/94a3b8?text=User'}
                    className="w-9 h-9 object-cover rounded-full border border-gray-100 shadow-sm"
                    alt=""
                    onError={e => (e.currentTarget.src = 'https://placehold.co/36x36/e2e8f0/94a3b8?text=User')}
                  />
                )
              },
              {
                key: 'name',
                label: 'Pengguna Sistem',
                render: (item: UserAccount) => (
                  <div>
                    <span className="font-semibold text-gray-900 block leading-tight mb-0.5">{item.name}</span>
                    <span className="text-gray-400 text-[11px] block font-normal">{item.email}</span>
                  </div>
                )
              },
              {
                key: 'role',
                label: 'Hak Akses (Role)',
                render: (item: UserAccount) => (
                  <Badge color={roleColor[item.role]}>{roleLabels[item.role]}</Badge>
                )
              },
            ]}
            data={items}
            onEdit={openEdit}
            onDelete={del}
          />
        )}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Akun' : 'Buat Akun Baru'}>
        <div className="space-y-4">
          <ImageUploadField value={form.avatar_url} onChange={url => setForm({ ...form, avatar_url: url })} label="Foto Avatar Profil" />

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nama Lengkap User" required>
              <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nama tanpa/dengan gelar..." />
            </FormField>

            <FormField label="Alamat Email Akun" required>
              <input type="email" className={inputClass} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="contoh@sekolah.sch.id" />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Hak Akses Kontrol (Role)" required>
              <select
                className={selectClass}
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value as 'admin' | 'marketing' })}
              >
                <option value="marketing">Marketing (Kelola PPDB & Jurusan)</option>
                <option value="admin">Admin (Akses Penuh / CMS)</option>
              </select>
            </FormField>

            <FormField label="Kata Sandi / Password" required={!editing} hint={editing ? "Kosongkan jika tidak ingin mengubah password" : "Minimal 6 karakter"}>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`${inputClass} pr-10`}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </FormField>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Simpan Akun</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}