import './index.css';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Extracurricular from "./pages/Extracurricular";
import Organization from "./pages/Organization";
import News from "./pages/News";
import Alumni from "./pages/Alumni";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import major from "./pages/Major";
import Major from './pages/Major';
import StudentWorks from "./pages/StudentWorks";
import Ppdb from "./pages/Ppdb";
import Teachers from "./pages/Teacher";
import OurValues from "./pages/OurValues";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;