// src/pages/admin/AdminAboutPage.tsx
import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import Modal from '@/components/admin/Modal';
import FormField, { inputClass } from '@/components/admin/FormField';
import ImageUploadField from '@/components/admin/ImageUploadField';
import {
  aboutPageService, aboutValueService, aboutTimelineService,
  AboutPageData, AboutValueData, AboutTimelineData,
} from '@/services/AboutPage';

const emptyPage: AboutPageData = {
  know_us_title: '', know_us_desc1: '', know_us_desc2: '',
  know_us_summary: '', know_us_image1: '', know_us_image2: '',
};

export default function AdminAboutPage() {
  const [page, setPage] = useState<AboutPageData>(emptyPage);
  const [values, setValues] = useState<AboutValueData[]>([]);
  const [timelines, setTimelines] = useState<AboutTimelineData[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingPage, setSavingPage] = useState(false);

  const [valueModal, setValueModal] = useState(false);
  const [editingValue, setEditingValue] = useState<AboutValueData | null>(null);
  const [valueForm, setValueForm] = useState<AboutValueData>({ image: '', title: '', description: '' });

  const [timelineModal, setTimelineModal] = useState(false);
  const [editingTimeline, setEditingTimeline] = useState<AboutTimelineData | null>(null);
  const [timelineForm, setTimelineForm] = useState<AboutTimelineData>({
    year: '', heads: [''], beginning: '', growing: '', image: '',
  });

 const loadAll = async () => {
  setLoading(true);
  const results = await Promise.allSettled([
    aboutPageService.get(),
    aboutValueService.getAll(),
    aboutTimelineService.getAll(),
  ]);

  const [pageResult, valuesResult, timelinesResult] = results;

  if (pageResult.status === 'fulfilled') {
    setPage(pageResult.value);
  } else {
    console.error('Gagal memuat Get to Know Us:', pageResult.reason);
  }

  if (valuesResult.status === 'fulfilled') {
    setValues(valuesResult.value);
  } else {
    console.error('Gagal memuat Values:', valuesResult.reason);
  }

  if (timelinesResult.status === 'fulfilled') {
    setTimelines(timelinesResult.value);
  } else {
    console.error('Gagal memuat Timeline:', timelinesResult.reason);
  }

  setLoading(false);
};

  useEffect(() => { loadAll(); }, []);

  // ---------- Get to Know Us ----------
  const savePage = async () => {
    setSavingPage(true);
    try {
      const updated = await aboutPageService.update(page);
      setPage(updated);
      alert('Konten "Get to Know Us" berhasil disimpan.');
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan konten.');
    } finally {
      setSavingPage(false);
    }
  };

  // ---------- Values ----------
  const openAddValue = () => {
    setEditingValue(null);
    setValueForm({ image: '', title: '', description: '' });
    setValueModal(true);
  };
  const openEditValue = (item: AboutValueData) => {
    setEditingValue(item);
    setValueForm(item);
    setValueModal(true);
  };
  const saveValue = async () => {
    try {
      if (editingValue?.id) {
        await aboutValueService.update(editingValue.id, valueForm);
      } else {
        await aboutValueService.create(valueForm);
      }
      setValueModal(false);
      await loadAll();
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan value.');
    }
  };
  const deleteValue = async (id: number) => {
    if (confirm('Hapus value ini?')) {
      await aboutValueService.delete(id);
      loadAll();
    }
  };

  // ---------- Timeline ----------
  const openAddTimeline = () => {
    setEditingTimeline(null);
    setTimelineForm({ year: '', heads: [''], beginning: '', growing: '', image: '' });
    setTimelineModal(true);
  };
  const openEditTimeline = (item: AboutTimelineData) => {
    setEditingTimeline(item);
    setTimelineForm({ ...item, heads: item.heads?.length ? item.heads : [''] });
    setTimelineModal(true);
  };
  const saveTimeline = async () => {
    try {
      const payload = { ...timelineForm, heads: timelineForm.heads.filter(h => h.trim() !== '') };
      if (editingTimeline?.id) {
        await aboutTimelineService.update(editingTimeline.id, payload);
      } else {
        await aboutTimelineService.create(payload);
      }
      setTimelineModal(false);
      await loadAll();
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan timeline.');
    }
  };
  const deleteTimeline = async (id: number) => {
    if (confirm('Hapus periode timeline ini?')) {
      await aboutTimelineService.delete(id);
      loadAll();
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-medium">Memuat konten halaman About...</div>;
  }

  return (
    <div className="p-6 space-y-8">
      <PageHeader title="Halaman About" subtitle="Kelola konten halaman Tentang Kami (About)" />

      {/* ============ SECTION 1: GET TO KNOW US ============ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 className="font-bold text-gray-800 text-lg">Get to Know Us</h3>

        <FormField label="Judul Section">
          <input className={inputClass} value={page.know_us_title}
            onChange={e => setPage({ ...page, know_us_title: e.target.value })} />
        </FormField>

        <FormField label="Ringkasan Singkat (tampil di Beranda / AboutPreview)" hint="Maks. sekitar 300 karakter, dipakai sebagai cuplikan di halaman utama">
          <textarea className={inputClass} rows={3} maxLength={300}
            value={page.know_us_summary}
            onChange={e => setPage({ ...page, know_us_summary: e.target.value })} />
        </FormField>

        <FormField label="Paragraf 1 (Teks Lengkap di halaman About)">
          <textarea className={inputClass} rows={4} value={page.know_us_desc1}
            onChange={e => setPage({ ...page, know_us_desc1: e.target.value })} />
        </FormField>

        <FormField label="Paragraf 2 (Teks Lengkap di halaman About)">
          <textarea className={inputClass} rows={4} value={page.know_us_desc2}
            onChange={e => setPage({ ...page, know_us_desc2: e.target.value })} />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <ImageUploadField
            value={page.know_us_image1}
            onChange={url => setPage({ ...page, know_us_image1: url })}
            label="Gambar Besar (kiri)"
          />
          <ImageUploadField
            value={page.know_us_image2}
            onChange={url => setPage({ ...page, know_us_image2: url })}
            label="Gambar Kecil (kanan)"
          />
        </div>

        <button
          onClick={savePage}
          disabled={savingPage}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" /> {savingPage ? 'Menyimpan...' : 'Simpan Get to Know Us'}
        </button>
      </div>

      {/* ============ SECTION 2: VALUES ============ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-lg">Values Section</h3>
          <button onClick={openAddValue} className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:text-indigo-700">
            <Plus className="w-3.5 h-3.5" /> Tambah Value
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {values.map(item => (
            <div key={item.id} className="border border-gray-100 rounded-xl overflow-hidden group relative">
              <img src={item.image} className="w-full h-32 object-cover" alt={item.title} />
              <div className="p-3">
                <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{item.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEditValue(item)} className="p-1.5 bg-white rounded-lg shadow text-gray-600 hover:text-indigo-600 text-xs font-bold px-2">Edit</button>
                <button onClick={() => item.id && deleteValue(item.id)} className="p-1.5 bg-white rounded-lg shadow text-red-500 hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {values.length === 0 && (
            <div className="col-span-3 text-center py-8 text-xs text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
              Belum ada value. Klik "Tambah Value".
            </div>
          )}
        </div>
      </div>

      {/* ============ SECTION 3: OUR JOURNEY (TIMELINE) ============ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-lg">Our Journey (Timeline)</h3>
          <button onClick={openAddTimeline} className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:text-indigo-700">
            <Plus className="w-3.5 h-3.5" /> Tambah Periode
          </button>
        </div>

        <div className="space-y-2">
          {timelines.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
              <div className="flex items-center gap-3">
                {item.image && <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />}
                <div>
                  <div className="font-bold text-sm text-gray-900">{item.year}</div>
                  <div className="text-xs text-gray-500">{item.heads?.join(', ')}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEditTimeline(item)} className="text-xs font-bold text-indigo-600 hover:underline">Edit</button>
                <button onClick={() => item.id && deleteTimeline(item.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {timelines.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
              Belum ada periode timeline.
            </div>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-400 bg-gray-50 rounded-xl p-4">
        Catatan: konten <strong>Our Program</strong> diambil otomatis dari menu <strong>Jurusan</strong>, dan konten <strong>Student Life</strong> diambil otomatis dari menu <strong>Berita</strong> (3 berita terbaru). Silakan kelola dari menu masing-masing.
      </div>

      {/* Modal: Value */}
      <Modal isOpen={valueModal} onClose={() => setValueModal(false)} title={editingValue ? 'Edit Value' : 'Tambah Value'}>
        <div className="space-y-4">
          <ImageUploadField value={valueForm.image} onChange={url => setValueForm({ ...valueForm, image: url })} label="Gambar" />
          <FormField label="Judul" required>
            <input className={inputClass} value={valueForm.title} onChange={e => setValueForm({ ...valueForm, title: e.target.value })} />
          </FormField>
          <FormField label="Deskripsi" required>
            <textarea className={inputClass} rows={3} value={valueForm.description} onChange={e => setValueForm({ ...valueForm, description: e.target.value })} />
          </FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setValueModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Batal</button>
            <button onClick={saveValue} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700">Simpan</button>
          </div>
        </div>
      </Modal>

      {/* Modal: Timeline */}
      <Modal isOpen={timelineModal} onClose={() => setTimelineModal(false)} title={editingTimeline ? 'Edit Periode' : 'Tambah Periode'} size="lg">
        <div className="space-y-4">
          <FormField label="Tahun / Periode" required>
            <input className={inputClass} value={timelineForm.year} placeholder="mis. 1945 atau 2020-2025"
              onChange={e => setTimelineForm({ ...timelineForm, year: e.target.value })} />
          </FormField>

          <FormField label="Kepala Sekolah / Pimpinan (bisa lebih dari satu)" hint="Klik 'Tambah Baris' untuk menambah nama">
            <div className="space-y-2">
              {timelineForm.heads.map((h, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className={inputClass}
                    value={h}
                    onChange={e => {
                      const newHeads = [...timelineForm.heads];
                      newHeads[i] = e.target.value;
                      setTimelineForm({ ...timelineForm, heads: newHeads });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setTimelineForm({ ...timelineForm, heads: timelineForm.heads.filter((_, idx) => idx !== i) })}
                    className="px-3 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setTimelineForm({ ...timelineForm, heads: [...timelineForm.heads, ''] })}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                + Tambah Baris
              </button>
            </div>
          </FormField>

          <FormField label="Awal Mula (Beginning)" required>
            <textarea className={inputClass} rows={3} value={timelineForm.beginning}
              onChange={e => setTimelineForm({ ...timelineForm, beginning: e.target.value })} />
          </FormField>

          <FormField label="Perkembangan (Growing)" required>
            <textarea className={inputClass} rows={3} value={timelineForm.growing}
              onChange={e => setTimelineForm({ ...timelineForm, growing: e.target.value })} />
          </FormField>

          <ImageUploadField value={timelineForm.image || ''} onChange={url => setTimelineForm({ ...timelineForm, image: url })} label="Foto Periode" />

          <div className="flex gap-3 pt-2">
            <button onClick={() => setTimelineModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Batal</button>
            <button onClick={saveTimeline} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700">Simpan</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}