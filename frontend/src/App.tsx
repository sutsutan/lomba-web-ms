import './index.css';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Extracurricular from "./pages/Extracurricular";
import Organization from "./pages/Organization";
import News from "./pages/News";
import Alumni from "./pages/Alumni";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Major from './pages/Major';
import StudentWorks from "./pages/StudentWorks";
import Ppdb from "./pages/Ppdb";
import Teachers from "./pages/Teacher";
import OurValues from "./pages/OurValues";
import MoreEskul from "./pages/MoreEskul";
import MoreOrg from "./pages/MoreOrg";
import MissionVision from "./pages/MissionVission";
import NewsArchive from "./pages/NewsArchive";
import NewsDetail from "./pages/NewsDetail";

// Admin Pages & Layouts
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRequireAuth from './pages/admin/AdminRequireAuth';
import AdminHeroPage from './pages/admin/AdminHeroPage';
import AdminAchievementsPage from './pages/admin/AdminAchievementPage';
import AdminPartnershipsPage from './pages/admin/AdminPartnershipPage';
import AdminTestimoniesPage from './pages/admin/AdminTestimoniesPage';
import AdminMajorsPage from './pages/admin/AdminMajorsPage';
import AdminFacilitiesPage from './pages/admin/AdminFacilitiesPage';
import AdminActivityGalleryPage from './pages/admin/AdminActivityGalleryPage';
import AdminStudentWorksPage from './pages/admin/AdminStudentWorksPage';
import AdminTeachersPage from './pages/admin/AdminTeachersPage';
import AdminExtracurricularsPage from './pages/admin/AdminExtracurricularsPage';
import AdminOrganizationsPage from './pages/admin/AdminOrganizationsPage';
import AdminNewsPage from './pages/admin/AdminNewsPage';
import AdminExploreGalleryPage from './pages/admin/AdminExploreGalleryPage';
import AdminAlumniPage from './pages/admin/AdminAlumniPage';

// Components
import PpdbPopup from "./components/home/ppdbpopup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ScrollToTop />
            <PpdbPopup />
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/academics" element={<Academics />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/our-values" element={<OurValues />} />
                <Route path="/extracurricular" element={<Extracurricular />} />
                <Route path="/organization" element={<Organization />} />
                <Route path="/news" element={<News />} />
                <Route path="/alumni" element={<Alumni />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/major" element={<Major />} />
                <Route path="/student-works" element={<StudentWorks />} />
                <Route path="/ppdb" element={<Ppdb />} />
                <Route path="/eskul" element={<MoreEskul />} />
                <Route path="/moreorg" element={<MoreOrg />} />
                <Route path="/mission-vision" element={<MissionVision />} />
                <Route path="/news-archive" element={<NewsArchive />} />
                <Route path="/more-news" element={<NewsDetail />} />  
                <Route path="/more-news/:id" element={<NewsDetail />} />  
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                
                {/* Nested Admin Routes dengan RequireAuth */}
                <Route path="/admin" element={<AdminRequireAuth><AdminLayout /></AdminRequireAuth>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="hero" element={<AdminHeroPage />} />
                  <Route path="achievements" element={<AdminAchievementsPage />} />
                  <Route path="partnerships" element={<AdminPartnershipsPage />} />
                  <Route path="testimonies" element={<AdminTestimoniesPage />} />
                  <Route path="majors" element={<AdminMajorsPage />} />
                  <Route path="facilities" element={<AdminFacilitiesPage />} />
                  <Route path="activity-gallery" element={<AdminActivityGalleryPage />} />
                  <Route path="student-works" element={<AdminStudentWorksPage />} />
                  <Route path="teachers" element={<AdminTeachersPage />} />
                  <Route path="extracurriculars" element={<AdminExtracurricularsPage />} />
                  <Route path="organizations" element={<AdminOrganizationsPage />} />
                  <Route path="news" element={<AdminNewsPage />} />
                  <Route path="explore-gallery" element={<AdminExploreGalleryPage />} />
                  <Route path="alumni" element={<AdminAlumniPage />} />
                </Route> {/* <-- Menutup tag Route /admin yang hilang */}

                {/* Fallback 404 Route - Sebaiknya ditaruh paling bawah */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;