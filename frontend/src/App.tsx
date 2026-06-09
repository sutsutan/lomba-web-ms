import './index.css';
import './i18n';
import 'quill/dist/quill.snow.css';
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
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Academics from "./pages/public/Academics";
import Extracurricular from "./pages/public/Extracurricular";
import Organization from "./pages/public/Organization";
import News from "./pages/public/News";
import Alumni from "./pages/public/Alumni";
import Contact from "./pages/public/Contact";
import NotFound from "./pages/public/NotFound";
import Major from './pages/public/Major';
import StudentWorks from "./pages/public/StudentWorks";
import Ppdb from "./pages/public/Ppdb";
import Teachers from "./pages/public/Teacher";
import OurValues from "./pages/public/OurValues";
import MoreEskul from "./pages/public/MoreEskul";
import MoreOrg from "./pages/public/MoreOrg";
import MissionVision from "./pages/public/MissionVission";
import NewsArchive from "./pages/public/NewsArchive";
import NewsDetail from "./pages/public/NewsDetail";



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
import AdminManageUser from './pages/admin/AdminManageUser';

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
                <Route path="/dashboard" element={<AdminRequireAuth><AdminLayout /></AdminRequireAuth>}>
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
                  <Route path="manage-user" element={<AdminManageUser />} />
                </Route>

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