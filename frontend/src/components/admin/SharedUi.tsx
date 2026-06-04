// import React from 'react';
// import { Icon } from './Icons';

// // Komponen Badge Penunjuk Status [cite: 261]
// export function Badge({
//     children,
//     color = 'blue',
// }: {
//     children: React.ReactNode;
//     color?: string;
// }) {
//     const colors: Record<string, string> = {
//         blue: 'bg-blue-100 text-blue-700',
//         green: 'bg-emerald-100 text-emerald-700',
//         yellow: 'bg-amber-100 text-amber-700',
//         red: 'bg-red-100 text-red-700',
//         purple: 'bg-purple-100 text-purple-700',
//         gray: 'bg-gray-100 text-gray-600',
//     };
//     return (
//         <span
//             className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color] || colors.gray}`}
//         >
//             {children}
//         </span>
//     );
// }

// // Komponen Modal Tambah/Edit Konten [cite: 276]
// export function Modal({
//     isOpen,
//     onClose,
//     title,
//     children,
//     size = 'md',
// }: {
//     isOpen: boolean;
//     onClose: () => void;
//     title: string;
//     children: React.ReactNode;
//     size?: 'sm' | 'md' | 'lg' | 'xl';
// }) {
//     if (!isOpen) return null;
//     const sizes = {
//         sm: 'max-w-md',
//         md: 'max-w-xl',
//         lg: 'max-w-2xl',
//         xl: 'max-w-4xl',
//     };
//     return (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex min-h-screen items-center justify-center p-4">
//                 <div
//                     className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//                     onClick={onClose}
//                 />
//                 <div
//                     className={`relative w-full rounded-2xl bg-white shadow-2xl ${sizes[size]} z-10 max-h-[90vh] overflow-y-auto`}
//                 >
//                     <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-gray-100 bg-white px-6 py-4">
//                         <h2 className="text-lg font-bold text-gray-900">
//                             {title}
//                         </h2>
//                         <button
//                             onClick={onClose}
//                             className="rounded-xl p-2 transition-colors hover:bg-gray-100"
//                         >
//                             <Icon name="x" className="h-5 w-5 text-gray-500" />
//                         </button>
//                     </div>
//                     <div className="p-6">{children}</div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // Elemen Label & Kontainer Form Input [cite: 300]
// export function FormField({
//     label,
//     required,
//     children,
//     hint,
// }: {
//     label: string;
//     required?: boolean;
//     children: React.ReactNode;
//     hint?: string;
// }) {
//     return (
//         <div>
//             <label className="mb-1.5 block text-sm font-semibold text-gray-700">
//                 {label} {required && <span className="text-red-500">*</span>}
//             </label>
//             {children}
//             {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
//         </div>
//     );
// }

// export const inputClass =
//     'w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm text-gray-800 bg-white';

// // Input Pengunggah Media Gambar [cite: 316]
// export function ImageUploadField({
//     value,
//     onChange,
//     label = 'Gambar',
// }: {
//     value: string;
//     onChange: (url: string) => void;
//     label?: string;
// }) {
//     return (
//         <FormField label={label}>
//             <div className="space-y-2">
//                 <input
//                     type="text"
//                     className={inputClass}
//                     value={value}
//                     onChange={(e) => onChange(e.target.value)}
//                     placeholder="URL gambar atau upload..."
//                 />
//                 {value && (
//                     <div className="relative h-40 w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
//                         <img
//                             src={value}
//                             alt="preview"
//                             className="h-full w-full object-cover"
//                             onError={(e) =>
//                                 (e.currentTarget.src =
//                                     'https://placehold.co/400x200/e2e8f0/94a3b8?text=Preview')
//                             }
//                         />
//                     </div>
//                 )}
//                 <p className="text-xs text-gray-400">
//                     Dalam implementasi nyata, gunakan endpoint
//                     POST/api/admin/upload
//                 </p>
//             </div>
//         </FormField>
//     );
// }

// // Header Paginasi [cite: 29]
// export function PageHeader({
//     title,
//     subtitle,
//     onAdd,
// }: {
//     title: string;
//     subtitle?: string;
//     onAdd?: () => void;
// }) {
//     return (
//         <div className="mb-6 flex items-start justify-between">
//             <div>
//                 <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
//                 {subtitle && (
//                     <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
//                 )}
//             </div>
//             {onAdd && (
//                 <button
//                     onClick={onAdd}
//                     className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-200 transition-colors hover:bg-indigo-700"
//                 >
//                     <Icon name="plus" className="h-4 w-4" /> Tambah
//                 </button>
//             )}
//         </div>
//     );
// }

// // Kotak Pencarian Data [cite: 30]
// export function SearchBar({
//     value,
//     onChange,
//     placeholder = 'Cari...',
// }: {
//     value: string;
//     onChange: (v: string) => void;
//     placeholder?: string;
// }) {
//     return (
//         <div className="relative mb-5">
//             <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
//                 <Icon name="search" className="h-4 w-4" />
//             </div>
//             <input
//                 type="text"
//                 className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//                 placeholder={placeholder}
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//             />
//         </div>
//     );
// }
