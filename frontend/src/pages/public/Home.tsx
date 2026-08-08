import MainLayout from '@/layouts/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import AboutPreview from '@/components/home/AboutPreview';
import ProgramTabs from '@/components/home/ProgramTabs';
import PartnersSection from '@/components/home/PartnersSection';
import AchievementSlider from '@/components/home/AchievementsSlider';
import NewsPreview from '@/components/home/NewsPreview';
import AdmissionSteps from '@/components/home/AdmissionSteps';
import TestimonialVideo from "@/components/home/Testimony";
import ButtonCorner from '@/components/home/Button';
import PpdbPopup from '@/components/home/ppdbpopup';

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <AboutPreview />
      <NewsPreview />
      <ProgramTabs />
      <PartnersSection />
      <PpdbPopup />
      <AchievementSlider />
      <TestimonialVideo />
      <AdmissionSteps />
      <ButtonCorner />
    </MainLayout>
  );
};

export default Home;