import React, { useState } from 'react';
import { PageHeader, SearchBar, Modal, FormField, inputClass } from './SharedUi';
import { DataTable } from './DataTable';

interface PlaceholderProps {
  title: string;
  description: string;
  fields: { name: string; label: string; type: string }[];
  columns: { key: string; label: string }[];
  initialData: any[];
}

export default function PlaceholderPage({ title, description, fields, columns, initialData }: PlaceholderProps) {
  const [data, setData] = useState<any[]>(initialData);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [editId, setEditId] = useState<number | null>(null);

  const filteredData = data.filter(item => 
    Object.values(item).some(val => String(val).toLowerCase().includes(search.toLowerCase()))
  );

  const handleOpenAdd = () => {
    const emptyForm = fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {});
    setFormData(emptyForm);
    setEditId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setFormData(item);
    setEditId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      setData(data.map(item => item.id === editId ? { ...formData, id: editId } : item));
    } else {
      setData([...data, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <PageHeader title={title} subtitle={description} onAdd={handleOpenAdd} />
      <SearchBar value={search} onChange={setSearch} placeholder={`Cari data ${title.toLowerCase()}...`} />
      
      <DataTable 
        columns={columns} 
        data={filteredData} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete} 
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? `Edit ${title}` : `Tambah ${title}`}>
        <form onSubmit={handleSave} className="space-y-4">
          {fields.map(f => (
            <FormField key={f.name} label={f.label} required>
              {f.type === 'textarea' ? (
                <textarea className={`${inputClass} h-24 resize-none`} value={formData[f.name] || ''} onChange={e => setFormData({ ...formData, [f.name]: e.target.value })} required />
              ) : (
                <input type={f.type} className={inputClass} value={formData[f.name] || ''} onChange={e => setFormData({ ...formData, [f.name]: e.target.value })} required />
              )}
            </FormField>
          ))}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-sm transition-colors">Batal</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm transition-colors">Simpan</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}