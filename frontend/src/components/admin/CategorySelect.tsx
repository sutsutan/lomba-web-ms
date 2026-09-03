// src/components/admin/CategorySelect.tsx
import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from 'react';
import { ChevronDown, Plus, Check, Trash2 } from 'lucide-react';
import { newsCategoryService, NewsCategoryData } from '@/services/NewsCategory';

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  const [categories, setCategories] = useState<NewsCategoryData[]>([]);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await newsCategoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error('Gagal memuat kategori berita:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setAdding(false);
        setNewName('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddCategory = async () => {
    const trimmed = newName.trim();
    if (!trimmed) return;

    // Kalau nama kategori sudah ada (case-insensitive), langsung pilih saja
    // daripada gagal karena validasi unique di backend.
    const existing = categories.find(c => c.name.toLowerCase() === trimmed.toLowerCase());
    if (existing) {
      onChange(existing.name);
      setAdding(false);
      setNewName('');
      setOpen(false);
      return;
    }

    try {
      setSaving(true);
      const created = await newsCategoryService.create(trimmed);
      setCategories(prev => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
      onChange(created.name);
      setAdding(false);
      setNewName('');
      setOpen(false);
    } catch (err: any) {
      console.error('Gagal menambah kategori:', err);
      alert(err.response?.data?.message || 'Gagal menambah kategori baru.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (e: ReactMouseEvent, cat: NewsCategoryData) => {
    e.stopPropagation();

    const confirmed = confirm(
      `Hapus kategori "${cat.name}"?\n\nBerita yang sudah memakai kategori ini tidak akan terhapus, tapi kategori ini tidak akan muncul lagi di pilihan dropdown.`
    );
    if (!confirmed) return;

    try {
      setDeletingId(cat.id);
      await newsCategoryService.delete(cat.id);
      setCategories(prev => prev.filter(c => c.id !== cat.id));

      // Kalau kategori yang sedang dipilih di form ternyata yang dihapus,
      // kosongkan pilihan supaya admin sadar harus memilih ulang.
      if (value === cat.name) {
        onChange('');
      }
    } catch (err: any) {
      console.error('Gagal menghapus kategori:', err);
      alert(err.response?.data?.message || 'Gagal menghapus kategori.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-left focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
      >
        <span className={value ? 'text-gray-900 font-medium' : 'text-gray-400'}>
          {value || 'Pilih kategori...'}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-20 mt-1.5 w-full rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden">
          <div className="max-h-56 overflow-y-auto py-1">
            {loading ? (
              <div className="px-4 py-3 text-xs text-gray-400">Memuat kategori...</div>
            ) : categories.length === 0 ? (
              <div className="px-4 py-3 text-xs text-gray-400">Belum ada kategori. Tambahkan di bawah.</div>
            ) : (
              categories.map(cat => (
                <div
                  key={cat.id}
                  className="group/item flex items-center justify-between px-2 hover:bg-indigo-50 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onChange(cat.name);
                      setOpen(false);
                    }}
                    className="flex-1 flex items-center justify-between px-2 py-2 text-sm text-left text-gray-700 group-hover/item:text-indigo-700 transition-colors"
                  >
                    <span>{cat.name}</span>
                    {value === cat.name && <Check className="w-4 h-4 text-indigo-600 mr-1" />}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteCategory(e, cat)}
                    disabled={deletingId === cat.id}
                    title={`Hapus kategori "${cat.name}"`}
                    className="p-1.5 rounded-lg text-gray-300 opacity-0 group-hover/item:opacity-100 hover:bg-red-50 hover:text-red-500 disabled:opacity-40 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-gray-100 p-2 bg-gray-50/50">
            {adding ? (
              <div className="flex gap-1.5">
                <input
                  autoFocus
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCategory();
                    }
                  }}
                  placeholder="Nama kategori baru..."
                  className="flex-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  disabled={saving || !newName.trim()}
                  className="px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-40 transition-colors"
                >
                  {saving ? '...' : 'Tambah'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAdding(true)}
                className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Kategori Baru
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}