import React, { useRef, useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import FormField, { inputClass } from './FormField';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string; // Menentukan jenis file (default: semua gambar)
}

export default function ImageUploadField({ 
  value, 
  onChange, 
  label = "Gambar/Dokumen", 
  accept = "image/*,.pdf,.doc,.docx" 
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  // Handler saat user memilih file dari komputer lokal
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);

      // Mengubah file lokal menjadi string Base64 agar bisa dibaca langsung oleh frontend
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange(base64String); // Mengirim string Base64 ke form state utama
      };
      reader.readAsDataURL(file);
    }
  };

  // Menghapus file/URL yang sudah dipilih
  const handleClear = () => {
    setFileName('');
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
              disabled={value.startsWith('data:')} // Kunci input text jika sedang memakai file lokal
              placeholder="Masukkan URL gambar atau gunakan tombol upload..."
            />
            {value && (
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
            className="px-4 py-2.5 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-600 font-semibold rounded-xl text-sm transition-colors flex items-center gap-2 shrink-0 shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span>Pilih File</span>
          </button>
        </div>

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
          💡 Mendukung input tautan eksternal (URL) atau langsung mengunggah dokumen/foto dari perangkat lokal Anda.
        </p>
      </div>
    </FormField>
  );
}