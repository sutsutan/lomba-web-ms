import React, { useRef, useState } from 'react';
import { Upload, X, Loader2, Plus, ImageOff } from 'lucide-react';
import FormField from './FormField';
import api from '@/lib/api';

interface MultiImageUploadFieldProps {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  accept?: string;
  folder?: string;
  maxImages?: number;
}

export default function MultiImageUploadField({
  values,
  onChange,
  label = "Gambar",
  accept = "image/*",
  folder = "uploads",
  maxImages = 8,
}: MultiImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');

  // Handler saat user memilih satu atau beberapa file sekaligus
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError('');
    setUploading(true);

    const remainingSlots = maxImages - values.length;
    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      setError(`Hanya ${remainingSlots} gambar lagi yang bisa ditambahkan (maksimal ${maxImages}).`);
    }

    const uploadedUrls: string[] = [];

    for (const file of filesToUpload) {
      try {
        // Pertama, ambil CSRF cookie dari Sanctum (mengikuti pola yang sudah berjalan)
        await api.get('/sanctum/csrf-cookie');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const response = await api.post('/admin/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const uploadedUrl = response.data.url;

        const fullUrl = uploadedUrl.startsWith('http') || uploadedUrl.startsWith('//')
          ? uploadedUrl
          : `http://localhost:8000${uploadedUrl.startsWith('/') ? '' : '/'}${uploadedUrl}`;

        uploadedUrls.push(fullUrl);
      } catch (err: any) {
        console.error('Upload gagal untuk', file.name, err);
        const msg = err.response?.data?.message || err.response?.data?.errors?.file?.[0] || `Gagal upload ${file.name}.`;
        setError(msg);

        // Fallback: base64 agar preview tetap muncul walau upload server gagal
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        uploadedUrls.push(base64);
      }
    }

    onChange([...values, ...uploadedUrls].slice(0, maxImages));
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemove = (idx: number) => {
    onChange(values.filter((_, i) => i !== idx));
  };

  const canAddMore = values.length < maxImages;

  return (
    <FormField label={`${label} (${values.length}/${maxImages})`}>
      <div className="space-y-3">
        {/* Grid Preview + Tombol Tambah */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {values.map((url, idx) => (
            <div
              key={idx}
              className="group relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
            >
              <img
                src={url}
                alt={`${label} ${idx + 1}`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://placehold.co/300x200/e2e8f0/94a3b8?text=Gambar+Rusak';
                }}
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                title="Hapus gambar ini"
                className="absolute right-1.5 top-1.5 rounded-full bg-red-600/90 p-1.5 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                #{idx + 1}
              </span>
            </div>
          ))}

          {canAddMore && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex aspect-video flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 transition-colors hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-500 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-xs font-medium">Uploading...</span>
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  <span className="text-xs font-medium">Tambah Gambar</span>
                </>
              )}
            </button>
          )}
        </div>

        {values.length === 0 && !canAddMore && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ImageOff className="h-4 w-4" />
            <span>Belum ada gambar</span>
          </div>
        )}

        {/* Input File Tersembunyi — mendukung multi-select sekaligus */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          multiple
          className="hidden"
        />

        {/* Error Message */}
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}

        <p className="text-[11px] leading-relaxed text-gray-400">
          💡 Bisa pilih beberapa gambar sekaligus, atau klik "Tambah Gambar" berulang kali. Maksimal {maxImages} gambar.
        </p>
      </div>
    </FormField>
  );
}