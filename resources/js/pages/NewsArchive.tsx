import { useState, useMemo } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroCarousel from '@/components/HeroCarousel';

// Import Assets (Sesuaikan path dengan project Anda)
import achievement from '@/assets/achievement-1.jpg';
import programIt from '@/assets/program-it.webp';
import programCulinary from '@/assets/program-culinary.webp';

const NewsArchive = () => {
  const { t } = useLanguage();
  
  // 1. Data Statis Dummy (Banyak data untuk simulasi pagination)
  const allNewsData = useMemo(() => [
    { id: 1, title: "Siswa Metland Raih Juara Nasional Robotik", category: "Achievement", date: "2024-01-15", image: achievement, excerpt: "Tim robotik kami berhasil menyabet medali emas di ajang nasional..." },
    { id: 2, title: "Kerjasama Baru dengan Perusahaan IT Global", category: "Partnership", date: "2024-01-12", image: programIt, excerpt: "Langkah strategis meningkatkan kurikulum industri teknologi..." },
    { id: 3, title: "Festival Kuliner Nusantara 2024", category: "Event", date: "2024-01-10", image: programCulinary, excerpt: "Menampilkan bakat memasak siswa dalam mengolah resep tradisional..." },
    { id: 4, title: "Workshop Digital Marketing untuk Pemula", category: "Event", date: "2024-01-08", image: programIt, excerpt: "Membekali siswa dengan keahlian pemasaran di era digital..." },
    { id: 5, title: "Kunjungan Industri ke Hotel Bintang 5", category: "Field Trip", date: "2024-01-05", image: programCulinary, excerpt: "Melihat langsung operasional perhotelan kelas internasional..." },
    { id: 6, title: "Beasiswa Prestasi Semester Ganjil Dibuka", category: "Announcement", date: "2024-01-03", image: achievement, excerpt: "Kesempatan bagi siswa berprestasi untuk mendapatkan tunjangan biaya..." },
    { id: 7, title: "Pelatihan Soft Skill Kepemimpinan", category: "Event", date: "2023-12-28", image: achievement, excerpt: "Membangun karakter pemimpin masa depan yang berintegritas..." },
    { id: 8, title: "Update Fasilitas Lab Komputer Terbaru", category: "Facility", date: "2023-12-20", image: programIt, excerpt: "Peningkatan spesifikasi hardware untuk mendukung pembelajaran AI..." },
    { id: 9, title: "Seminar Karir bersama Praktisi Industri", category: "Event", date: "2023-12-15", image: programIt, excerpt: "Persiapan memasuki dunia kerja bagi lulusan baru..." },
    { id: 10, title: "Lomba Desain Grafis Antar Kelas", category: "Achievement", date: "2023-12-10", image: achievement, excerpt: "Menyalurkan kreativitas siswa dalam seni visual digital..." },
    { id: 11, title: "Penerimaan Siswa Baru Gelombang 1", category: "Announcement", date: "2023-12-05", image: programCulinary, excerpt: "Pendaftaran mulai dibuka untuk tahun ajaran mendatang..." },
    { id: 12, title: "Parenting Day: Mendukung Bakat Anak", category: "Event", date: "2023-12-01", image: achievement, excerpt: "Diskusi antara sekolah dan orang tua siswa..." },
  ], []);

  // 2. State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Menampilkan 6 berita per halaman
  const totalPages = Math.ceil(allNewsData.length / itemsPerPage);

  // 3. Logika Pemotongan Data (Slicing)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = allNewsData.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi scroll ke atas saat ganti halaman
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
       <HeroCarousel
                title={t('organization.hero.title')}
                subtitle={t('organization.hero.subtitle')}
                description={t('organization.hero.desc')}
                height="h-[70vh]"
            />


      {/* Header Section */}
      <section className="pt-32 pb-12 bg-section border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('news.all.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jelajahi seluruh arsip berita, pengumuman, dan pencapaian terbaru dari sekolah kami.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {currentNews.map((news, index) => (
              <ScrollReveal key={news.id} delay={index * 0.1}>
                <article className="group card-hover bg-white rounded-2xl overflow-hidden border border-border flex flex-col h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={news.image} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      alt={news.title} 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(news.date).toLocaleDateString('id-ID', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                      {news.excerpt}
                    </p>
                    
                    <div className="mt-auto">
                      <button className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                        {t('news.all.read_more')} <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {/* Pagination Component */}
          <div className="flex justify-center items-center gap-3">
            {/* Prev Button */}
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-xl border border-border bg-white hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-current transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-12 h-12 rounded-xl border font-bold transition-all ${
                    currentPage === i + 1 
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-110' 
                      : 'border-border bg-white hover:border-primary hover:text-primary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl border border-border bg-white hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-current transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default NewsArchive;