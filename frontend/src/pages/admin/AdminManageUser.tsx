import React, { useState } from 'react';

import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass, selectClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import SearchBar from '@/components/admin/SearchBar';

interface UserAccount {
  id: number;
  avatar_url: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  internal_type: string;
  identity_number: string;
  is_approved: boolean;
}

export default function AdminManageUserPage() {
  const [items, setItems] = useState<UserAccount[]>([
    { id: 1, avatar_url: 'https://placehold.co/150x150/6366f1/fff?text=A', name: 'Zaka Ahmad, S.Kom', email: 'zaka.admin@sekolah.sch.id', role: 'admin', internal_type: 'teacher', identity_number: '199203112023011', is_approved: true },
    { id: 2, avatar_url: 'https://placehold.co/150x150/10b981/fff?text=M', name: 'Rizky Ramadhan', email: 'rizky.r@student.sch.id', role: 'user', internal_type: 'student', identity_number: '0067341290', is_approved: true },
    { id: 3, avatar_url: 'https://placehold.co/150x150/f59e0b/fff?text=A', name: 'Citra Kirana', email: 'citra.alumni@gmail.com', role: 'user', internal_type: 'alumni', identity_number: '2022-0941', is_approved: false },
  ]);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<UserAccount | null>(null);
  const [search, setSearch] = useState('');

  // Inisialisasi form default
  const [form, setForm] = useState({
    avatar_url: '',
    name: '',
    email: '',
    password: '', 
    role: 'user' as 'admin' | 'user',
    internal_type: 'student',
    identity_number: '',
    is_approved: false
  });

  const filtered = items.filter(i =>
    StringString(i.name || '').toLowerCase().includes(search.toLowerCase()) ||
    StringString(i.email || '').toLowerCase().includes(search.toLowerCase()) ||
    i.identity_number.includes(search)
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ avatar_url: '', name: '', email: '', password: '', role: 'user', internal_type: 'student', identity_number: '', is_approved: true });
    setModal(true);
  };

  const openEdit = (item: UserAccount) => {
    setEditing(item);
    setForm({ avatar_url: item.avatar_url, name: item.name, email: item.email, password: '', role: item.role, internal_type: item.internal_type, identity_number: item.identity_number, is_approved: item.is_approved });
    setModal(true);
  };

  const save = () => {
    if (editing) {
      setItems(items.map(i => i.id === editing.id ? { ...i, ...form } : i));
    } else {
      setItems([...items, { id: Date.now(), ...form }]);
    }
    setModal(false);
  };

  const del = (id: number) => setItems(items.filter(i => i.id !== id));

  const typeLabels: Record<string, string> = {
    student: 'Murid / Siswa',
    teacher: 'Guru / Staf',
    alumni: 'Alumni',
    none: 'Luar / Umum'
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Manajemen User" subtitle="Otorisasi akun internal, persetujuan hak akses admin, guru, murid, dan alumni" onAdd={openAdd} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama pengguna, email, atau nomor identitas..." />
        </div>

        <DataTable
          columns={[
            {
              key: 'avatar_url',
              label: 'Foto',
              render: (item: UserAccount) => (
                <img 
                  src={item.avatar_url} 
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
                <Badge color={item.role === 'admin' ? 'red' : 'blue'}>
                  {String(item.role || '').toUpperCase()}
                </Badge>
              )
            },
            {
              key: 'internal_type',
              label: 'Status Internal',
              render: (item: UserAccount) => (
                <div>
                  <span className="text-xs font-medium text-gray-700 block">{typeLabels[item.internal_type]}</span>
                  <span className="text-[10px] text-gray-400 block font-mono">{item.identity_number || 'Tanpa ID'}</span>
                </div>
              )
            },
            {
              key: 'is_approved',
              label: 'Persetujuan Admin',
              render: (item: UserAccount) => (
                <Badge color={item.is_approved ? 'green' : 'yellow'}>
                  {item.is_approved ? 'Disetujui / Aktif' : 'Menunggu Approval'}
                </Badge>
              )
            },
          ]}
          data={filtered}
          onEdit={openEdit}
          onDelete={del}
        />
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit & Tinjau Akun User' : 'Buat Akun Internal Baru'}>
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
              <select className={selectClass} value={form.role} onChange={e => setForm({ ...form, role: e.target.value as 'admin' | 'user' })}>
                <option value="user">User (Akses Terbatas)</option>
                <option value="admin">Admin (Akses Penuh / CMS)</option>
              </select>
            </FormField>

            <FormField label="Kata Sandi / Password" required={!editing} hint={editing ? "Kosongkan jika tidak ingin mengubah password" : "Minimal 6 karakter"}>
              <input type="password" className={inputClass} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Klasifikasi Internal" required>
              <select className={selectClass} value={form.internal_type} onChange={e => setForm({ ...form, internal_type: e.target.value, identity_number: e.target.value === 'none' ? '-' : form.identity_number })}>
                <option value="student">Siswa / Murid Aktif</option>
                <option value="teacher">Guru / Staf Pengajar</option>
                <option value="alumni">Alumni Sekolah</option>
                <option value="none">Bukan Internal (Umum)</option>
              </select>
            </FormField>

            <FormField label="Nomor Identitas (NIP / NISN)" required={form.internal_type !== 'none'}>
              <input className={inputClass} disabled={form.internal_type === 'none'} value={form.identity_number} onChange={e => setForm({ ...form, identity_number: e.target.value })} placeholder="Contoh: 00654122 / 198810..." />
            </FormField>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-3">
            <span className="text-xs font-semibold text-gray-800 block uppercase tracking-wider">Aktivasi & Persetujuan Akun</span>
            <div className="flex items-start gap-3">
              <input type="checkbox" id="user-approved" checked={form.is_approved} onChange={e => setForm({ ...form, is_approved: e.target.checked })} className="w-4 h-4 rounded accent-indigo-600 mt-0.5" />
              <label htmlFor="user-approved" className="text-xs font-medium text-gray-600 select-none leading-relaxed">
                <strong className="text-gray-900 block mb-0.5">Setujui Hak Akses Masuk Sistem</strong>
                Jika dicentang, pengguna ini resmi mendapatkan izin dari Admin untuk melakukan proses login ke dalam dashboard atau portal internal sekolah menggunakan email tersebut.
              </label>
            </div>
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