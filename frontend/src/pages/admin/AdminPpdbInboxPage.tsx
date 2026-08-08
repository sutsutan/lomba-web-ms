import React, { useState, useEffect } from 'react';
import { getAdminPpdbSubmissions, updatePpdbStatus, replyPpdbSubmission, deletePpdbSubmission, PpdbSubmissionData } from '@/services/PpdbSubmission';
import PageHeader from '@/components/admin/PageHeader';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import SearchBar from '@/components/admin/SearchBar';
import { Mail, Phone, Send, Trash2 } from 'lucide-react';

const statusLabels: Record<string, string> = {
  new: 'Baru',
  in_progress: 'Diproses',
  replied: 'Sudah Dibalas',
  archived: 'Diarsipkan',
};

const statusColors: Record<string, 'blue' | 'amber' | 'green' | 'gray'> = {
  new: 'blue',
  in_progress: 'amber',
  replied: 'green',
  archived: 'gray',
};

export default function AdminPpdbInboxPage() {
  const [items, setItems] = useState<PpdbSubmissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [detailModal, setDetailModal] = useState(false);
  const [selected, setSelected] = useState<PpdbSubmissionData | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAdminPpdbSubmissions({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: search || undefined,
      });
      setItems(res.data || []);
    } catch (error) {
      console.error('Gagal memuat pesan PPDB:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchData, 400);
    return () => clearTimeout(t);
  }, [search, statusFilter]);

  const openDetail = (item: PpdbSubmissionData) => {
    setSelected(item);
    setReplyText(item.reply_message || '');
    setDetailModal(true);

    if (item.status === 'new') {
      updatePpdbStatus(item.id, 'in_progress').then(fetchData);
    }
  };

  const handleStatusChange = async (status: PpdbSubmissionData['status']) => {
    if (!selected) return;
    await updatePpdbStatus(selected.id, status);
    setSelected({ ...selected, status });
    fetchData();
  };

  const handleReply = async () => {
    if (!selected || !replyText.trim()) return;
    setSending(true);
    try {
      await replyPpdbSubmission(selected.id, replyText);
      alert('Balasan berhasil dikirim ke email pengirim.');
      setDetailModal(false);
      fetchData();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Gagal mengirim balasan. Periksa konfigurasi email server.');
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus pesan ini?')) return;
    await deletePpdbSubmission(id);
    setDetailModal(false);
    fetchData();
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="PPDB Inbox" subtitle="Kelola pesan pendaftaran dari calon orang tua murid" />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 space-y-3">
          <div className="flex gap-2 flex-wrap">
            {['all', 'new', 'in_progress', 'replied', 'archived'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  statusFilter === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s === 'all' ? 'Semua' : statusLabels[s]}
              </button>
            ))}
          </div>
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama, email, atau subjek..." />
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500 font-medium">Memuat pesan...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-gray-400">Belum ada pesan masuk.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map(item => (
              <button
                key={item.id}
                onClick={() => openDetail(item)}
                className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 truncate">{item.parent_name}</span>
                    <Badge color={statusColors[item.status]}>{statusLabels[item.status]}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{item.subject}</p>
                  <p className="text-xs text-gray-400 truncate">{item.email} · {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={detailModal} onClose={() => setDetailModal(false)} title="Detail Pesan PPDB" size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{selected.parent_name}</h3>
                {selected.student_name && (
                  <p className="text-sm text-gray-500">Untuk siswa: {selected.student_name}</p>
                )}
              </div>
              <Badge color={statusColors[selected.status]}>{statusLabels[selected.status]}</Badge>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {selected.email}</span>
              {selected.phone && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {selected.phone}</span>}
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">{selected.subject}</p>
              <p className="text-sm text-gray-700 whitespace-pre-line">{selected.message}</p>
            </div>

            {selected.reply_message && (
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                <p className="text-xs font-bold uppercase tracking-wide text-teal-600 mb-1">Balasan Terkirim</p>
                <p className="text-sm text-teal-800 whitespace-pre-line">{selected.reply_message}</p>
                {selected.replied_at && (
                  <p className="text-[10px] text-teal-500 mt-2">
                    Dibalas pada {new Date(selected.replied_at).toLocaleString('id-ID')}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Ubah Status Flow</label>
              <div className="flex gap-2 flex-wrap">
                {(['new', 'in_progress', 'replied', 'archived'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selected.status === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {statusLabels[s]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Balas ke Email Pengirim</label>
              <textarea
                rows={5}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Tulis balasan pribadi yang akan dikirim langsung ke email pengirim..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleDelete(selected.id)}
                className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" /> Hapus
              </button>
              <button
                type="button"
                onClick={() => setDetailModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={handleReply}
                disabled={sending || !replyText.trim()}
                className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> {sending ? 'Mengirim...' : 'Kirim Balasan'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}