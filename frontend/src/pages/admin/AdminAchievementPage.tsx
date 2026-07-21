import React, { useState, useEffect } from "react";
import api from "@/lib/api";

import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import Badge from "@/components/admin/Badge";
import Modal from "@/components/admin/Modal";
import FormField, {
  inputClass,
  selectClass,
  textareaClass,
} from "@/components/admin/FormField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import SearchBar from "@/components/admin/SearchBar";
import { AchievementData } from "@/services/Achievement";

const CATEGORY_OPTIONS = [
  {
    value: "tech",
    label: "Teknologi",
    color: "blue",
  },
  {
    value: "arts",
    label: "Seni",
    color: "purple",
  },
  {
    value: "culinary",
    label: "Kuliner",
    color: "yellow",
  },
  {
    value: "hospitality",
    label: "Hospitality",
    color: "green",
  },
  {
    value: "accounting",
    label: "Akuntansi",
    color: "orange",
  },
];

export default function AdminAchievementPage() {
  const [items, setItems] = useState<AchievementData[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] =
    useState<AchievementData | null>(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    image_url: "",
    title: "",
    category: "tech",
    competition: "",
    level: "",
    organizer: "",
    location: "",
    achievement_date: "",
    holder_name: "",
    description: "",
    content: "",
    year: new Date().getFullYear(),
    medal: "",
    certificate_url: "",
    news_id: "",
    is_active: true,
  });

  const loadData = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        "/admin/achievements?per_page=1000"
      );

      const responseData =
        res.data.data || res.data;

      setItems(
        Array.isArray(responseData)
          ? responseData
          : []
      );
    } catch (err) {
      console.error(
        "Gagal memuat data admin:",
        err
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = items.filter((item) =>
    `
${item.title}
${item.holder_name}
${item.competition}
${item.category}
${item.level}
${item.description}
`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);

    setForm({
      image_url: "",
      title: "",
      category: "tech",
      competition: "",
      level: "",
      organizer: "",
      location: "",
      achievement_date: "",
      holder_name: "",
      description: "",
      content: "",
      year: new Date().getFullYear(),
      medal: "",
      certificate_url: "",
      news_id: "",
      is_active: true,
    });

    setModal(true);
  };

  const openEdit = (
    item: AchievementData
  ) => {
    setEditing(item);

    setForm({
      image_url: item.image_url,
      title: item.title,
      category: item.category,
      competition: item.competition,
      level: item.level,
      organizer: item.organizer,
      location: item.location,
      achievement_date:
        item.achievement_date,
      holder_name: item.holder_name,
      description: item.description,
      content: item.content,
      year: item.year,
      medal: item.medal,
      certificate_url:
        item.certificate_url ?? "",
      news_id: item.news_id
        ? String(item.news_id)
        : "",
      is_active: item.is_active,
    });

    setModal(true);
  };

  const save = async () => {
    try {
      const payload = {
        ...form,
        news_id:
          form.news_id === ""
            ? null
            : Number(form.news_id),

        certificate_url:
          form.certificate_url === ""
            ? null
            : form.certificate_url,

        achievement_date:
          form.achievement_date === ""
            ? null
            : form.achievement_date,
      };

      if (editing) {
        await api.put(
          `/admin/achievements/${editing.id}`,
          payload
        );
      } else {
        await api.post(
          "/admin/achievements",
          payload
        );
      }

      setModal(false);
      loadData();
    } catch (err: any) {
      alert(
        JSON.stringify(
          err.response?.data,
          null,
          2
        )
      );
    }
  };

  const del = async (id: number) => {
    if (
      confirm(
        "Apakah Anda yakin ingin menghapus data prestasi ini?"
      )
    ) {
      try {
        await api.delete(
          `/admin/achievements/${id}`
        );

        loadData();
      } catch (err) {
        console.error(
          "Gagal menghapus data:",
          err
        );
      }
    }
  };

    return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Prestasi"
        subtitle="Daftar prestasi siswa berdasarkan bidang"
        onAdd={openAdd}
      />

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50/50 p-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Cari nama atau deskripsi..."
          />
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm font-medium text-gray-500">
            Sedang memproses data...
          </div>
        ) : (
          <DataTable
            columns={[
              {
                key: "image_url",
                label: "Foto",
                render: (item: AchievementData) => (
                  <img
                    src={item.image_url}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                ),
              },
              {
                key: "title",
                label: "Judul",
              },
              {
                key: "holder_name",
                label: "Peraih",
              },
              {
                key: "competition",
                label: "Kompetisi",
              },
              {
                key: "category",
                label: "Jurusan",
                render: (item: AchievementData) => {
                  const category =
                    CATEGORY_OPTIONS.find(
                      (c) => c.value === item.category
                    );

                  return (
                    <Badge color={category?.color || "gray"}>
                      {category?.label || item.category}
                    </Badge>
                  );
                },
              },
              {
                key: "level",
                label: "Tingkat",
              },
              {
                key: "medal",
                label: "Medali",
              },
              {
                key: "year",
                label: "Tahun",
              },
              {
                key: "is_active",
                label: "Status",
                render: (item) => (
                  <Badge
                    color={
                      item.is_active
                        ? "green"
                        : "gray"
                    }
                  >
                    {item.is_active
                      ? "Aktif"
                      : "Nonaktif"}
                  </Badge>
                ),
              },
            ]}
            data={filtered}
            onEdit={openEdit}
            onDelete={del}
          />
        )}
      </div>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={
          editing
            ? "Edit Prestasi"
            : "Tambah Prestasi"
        }
      >
        <div className="space-y-6">
          <ImageUploadField
            value={form.image_url}
            onChange={(url) =>
              setForm({
                ...form,
                image_url: url,
              })
            }
            label="Foto Prestasi"
          />

          <FormField
            label="Judul Prestasi"
            required
          >
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              placeholder="Contoh: Juara 1 LKS Web Technologies"
            />
          </FormField>

          <FormField
            label="Nama Peraih"
            required
          >
            <input
              className={inputClass}
              value={form.holder_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  holder_name:
                    e.target.value,
                })
              }
              placeholder="Nama siswa atau tim"
            />
          </FormField>

          <FormField
            label="Jurusan"
            required
          >
            <select
              className={selectClass}
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category:
                    e.target.value,
                })
              }
            >
              {CATEGORY_OPTIONS.map(
                (category) => (
                  <option
                    key={category.value}
                    value={
                      category.value
                    }
                  >
                    {category.label}
                  </option>
                )
              )}
            </select>
          </FormField>

          <FormField label="Nama Kompetisi">
            <input
              className={inputClass}
              value={form.competition}
              onChange={(e) =>
                setForm({
                  ...form,
                  competition:
                    e.target.value,
                })
              }
              placeholder="Nama lomba"
            />
          </FormField>

          <FormField label="Tingkat Kompetisi">
            <select
              className={selectClass}
              value={form.level}
              onChange={(e) =>
                setForm({
                  ...form,
                  level:
                    e.target.value,
                })
              }
            >
              <option value="">
                Pilih tingkat
              </option>
              <option value="school">
                School
              </option>
              <option value="city">
                City
              </option>
              <option value="province">
                Province
              </option>
              <option value="national">
                National
              </option>
              <option value="international">
                International
              </option>
            </select>
          </FormField>

                    <FormField label="Penyelenggara">
            <input
              className={inputClass}
              value={form.organizer}
              onChange={(e) =>
                setForm({
                  ...form,
                  organizer: e.target.value,
                })
              }
              placeholder="Nama penyelenggara"
            />
          </FormField>

          <FormField label="Lokasi">
            <input
              className={inputClass}
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
              placeholder="Jakarta, Indonesia"
            />
          </FormField>

          <FormField label="Tanggal Prestasi">
            <input
              type="date"
              className={inputClass}
              value={form.achievement_date}
              onChange={(e) =>
                setForm({
                  ...form,
                  achievement_date: e.target.value,
                })
              }
            />
          </FormField>

          <FormField label="Tahun">
            <input
              type="number"
              className={inputClass}
              value={form.year}
              onChange={(e) =>
                setForm({
                  ...form,
                  year: Number(e.target.value),
                })
              }
            />
          </FormField>

          <FormField label="Medali">
            <select
              className={selectClass}
              value={form.medal}
              onChange={(e) =>
                setForm({
                  ...form,
                  medal: e.target.value,
                })
              }
            >
              <option value="">Tidak Ada</option>
              <option value="Gold">🥇 Gold</option>
              <option value="Silver">🥈 Silver</option>
              <option value="Bronze">🥉 Bronze</option>
              <option value="Honorable Mention">
                Honorable Mention
              </option>
            </select>
          </FormField>

          <FormField label="Deskripsi Singkat">
            <textarea
              rows={4}
              className={textareaClass}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="Ringkasan prestasi..."
            />
          </FormField>

          <FormField label="Konten Lengkap">
            <textarea
              rows={8}
              className={textareaClass}
              value={form.content}
              onChange={(e) =>
                setForm({
                  ...form,
                  content: e.target.value,
                })
              }
              placeholder="Isi artikel atau cerita lengkap..."
            />
          </FormField>

          <FormField label="Link Sertifikat">
            <input
              className={inputClass}
              value={form.certificate_url}
              onChange={(e) =>
                setForm({
                  ...form,
                  certificate_url: e.target.value,
                })
              }
              placeholder="https://..."
            />
          </FormField>

          {form.certificate_url && (
            <div className="rounded-lg bg-blue-50 p-3">
              <a
                href={form.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary underline hover:no-underline"
              >
                🔗 Lihat Sertifikat
              </a>
            </div>
          )}

          <FormField label="Related News ID">
            <input
              type="number"
              className={inputClass}
              value={form.news_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  news_id: e.target.value,
                })
              }
              placeholder="Kosongkan jika tidak ada berita"
            />
          </FormField>

          <div className="flex items-center gap-3 rounded-xl border p-4">
            <input
              id="achievement-active"
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_active: e.target.checked,
                })
              }
              className="h-4 w-4"
            />

            <label
              htmlFor="achievement-active"
              className="text-sm font-medium"
            >
              Tampilkan prestasi ini di website
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setModal(false)}
              className="flex-1 rounded-xl border border-gray-300 py-3 font-medium hover:bg-gray-100"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={save}
              className="flex-1 rounded-xl bg-primary py-3 font-medium text-white hover:opacity-90"
            >
              {editing
                ? "Update Prestasi"
                : "Simpan Prestasi"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}