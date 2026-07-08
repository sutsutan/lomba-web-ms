import React, { useRef, useState, useEffect } from 'react';
import { Upload, X, FileText, Loader2, } from 'lucide-react';
import FormField, { inputClass } from './FormField';
import api, { sanctum } from "@/lib/api";
import { newsService } from '@/services/News';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  folder?: string;
}

export default function ImageUploadField({
  value,
  onChange,
  label = "Gambar/Dokumen",
  accept = "image/*,.pdf,.doc,.docx",
  folder = "uploads",
}: ImageUploadFieldProps) {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const safeValue = value ?? "";

  useEffect(() => {
    console.log("ImageUploadField URL :", safeValue);
  }, [safeValue]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setFileName(file.name);

    try {

      await api.get("/sanctum/csrf-cookie");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

    const response = await api.post('/admin/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const uploadedUrl = response.data?.url;

    if (!uploadedUrl) {
      throw new Error("Respon server tidak valid (URL tidak ditemukan).");
    }

    const fullUrl = uploadedUrl.startsWith('http') 
      ? uploadedUrl 
      : `http://127.0.0.1:8000${uploadedUrl.startsWith('/') ? '' : '/'}${uploadedUrl}`;
    
    onChange(fullUrl);
  } catch (err: any) {
    console.error('Upload gagal:', err);
    const msg = err.response?.data?.message || err.message || 'Gagal mengunggah gambar.';
    setError(msg);
  } finally {
    setUploading(false);
  }
};

  const handleClear = () => {
    setFileName('');
    setError('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isDocument = safeValue.startsWith('data:application/') || 
                     safeValue.toLowerCase().endsWith('.pdf') || 
                     safeValue.toLowerCase().endsWith('.docx') || 
                     safeValue.toLowerCase().endsWith('.doc');

                     console.log("Image URL:", safeValue);
  return (
    <FormField label={label}>
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              className={`${inputClass} pr-10`}
              value={safeValue}
              onChange={e => onChange(e.target.value)}
              disabled={uploading}
              placeholder="Masukkan URL gambar atau gunakan tombol upload..."
            />
            {safeValue && !uploading && (
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

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
          />

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

        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

        {safeValue && safeValue.trim() !== '' && (
          <div className="relative w-full rounded-xl overflow-hidden bg-gray-50 border border-gray-200 p-2 flex items-center justify-center min-h-[120px]">
            {isDocument ? (
              <div className="flex flex-col items-center gap-2 py-4 text-gray-500">
                <FileText className="w-12 h-12 text-indigo-500" />
                <span className="text-xs font-medium truncate text-center">Dokumen terpilih</span>
              </div>
            ) : (
              <img 
                src={safeValue} 
                alt="preview" 
                className="max-h-48 w-auto object-contain rounded-lg" 
                onError={e => (e.currentTarget.src = 'https://placehold.co/400x200/e2e8f0/94a3b8?text=Preview+Gambar+Rusak')} 
              />
            )}
          </div>
        )}
        
        <p className="text-[11px] text-gray-400 leading-relaxed">
          💡 File akan di-upload ke server. Harap pastikan file tidak terlalu besar.
        </p>
      </div>
    </FormField>
  );
}