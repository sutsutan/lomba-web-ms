import React, { useRef, useState } from 'react';
import { Upload, X, FileText, Loader2 } from 'lucide-react';
import FormField, { inputClass } from './FormField';
import api from '@/lib/api';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  folder?: string; // folder tujuan di server (default: 'uploads')
}

export default function ImageUploadField({ 
  value, 
  onChange, 
  label = "Gambar/Dokumen", 
  accept = "image/*,.pdf,.doc,.docx",
  folder = "uploads"
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');

  // Handler saat user memilih file — upload ke server, simpan URL-nya
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError('');
    setUploading(true);

    try {
      // Pertama, ambil CSRF cookie dari Sanctum
      await api.get('/sanctum/csrf-cookie');

      // Upload file ke backend via /api/internal/sekolah/login/upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await api.post('/api/internal/sekolah/login/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Backend mengembalikan { url: '/storage/uploads/...', path: '...' }
      const uploadedUrl = response.data.url;
      
      // Buat URL lengkap jika url-nya relatif
      const fullUrl = uploadedUrl.startsWith('http') || uploadedUrl.startsWith('//')
        ? uploadedUrl 
        : `http://127.0.0.1:8000${uploadedUrl.startsWith('/') ? '' : '/'}${uploadedUrl}`;
      
      onChange(fullUrl);
    } catch (err: any) {
      console.error('Upload gagal:', err);
      const msg = err.response?.data?.message || err.response?.data?.errors?.file?.[0] || 'Gagal upload file. Pastikan sudah login sebagai admin.';
      setError(msg);
      // Fallback: jika upload gagal, tetap pakai base64 agar preview tetap muncul
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  // Menghapus file/URL yang sudah dipilih
  const handleClear = () => {
    setFileName('');
    setError('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Memeriksa apakah value saat ini merupakan file dokumen (bukan gambar)
  const isDocument = value.startsWith('data:application/') || value.endsWith('.pdf') || value.endsWith('.docx') || value.endsWith('.doc');

  return (
    <FormField label={label}>
      <div className="space-y-3">
        {/* Kontrol Input Gabungan (Text URL + Tombol Upload Lokal) */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              className={`${inputClass} pr-10`}
              value={value.startsWith('data:') ? `[File Lokal] ${fileName || 'Berhasil dimuat'}` : value}
              onChange={e => {
                if (!value.startsWith('data:')) {
                  onChange(e.target.value);
                }
              }}
              disabled={value.startsWith('data:') || uploading}
              placeholder="Masukkan URL gambar atau gunakan tombol upload..."
            />
            {value && !uploading && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                title="Hapus file/URL"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Input File Tersembunyi */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
          />

          {/* Tombol Trigger File Browser */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2.5 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-600 font-semibold rounded-xl text-sm transition-colors flex items-center gap-2 shrink-0 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Pilih File</span>
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-xs text-red-500 font-medium">{error}</p>
        )}

        {/* Preview Area Dinamis */}
        {value && (
          <div className="relative w-full rounded-xl overflow-hidden bg-gray-50 border border-gray-200 p-2 flex items-center justify-center min-h-[120px]">
            {isDocument ? (
              // Tampilan jika yang diunggah adalah dokumen (PDF/Word)
              <div className="flex flex-col items-center gap-2 py-4 text-gray-500">
                <FileText className="w-12 h-12 text-indigo-500" />
                <span className="text-xs font-medium max-w-[250px] truncate text-center">
                  {fileName || 'Dokumen Terunggah'}
                </span>
              </div>
            ) : (
              // Tampilan jika yang diunggah adalah gambar
              <img 
                src={value} 
                alt="preview" 
                className="max-h-48 w-auto object-contain rounded-lg" 
                onError={e => (e.currentTarget.src = 'https://placehold.co/400x200/e2e8f0/94a3b8?text=Preview+Gambar+Rusak')} 
              />
            )}
          </div>
        )}
        
        <p className="text-[11px] text-gray-400 leading-relaxed">
          💡 File akan di-upload ke server secara otomatis. Mendukung tautan eksternal (URL) atau upload langsung dari perangkat.
        </p>
      </div>
    </FormField>
  );
}