import MainLayout from '@/layouts/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import AboutPreview from '@/components/home/AboutPreview';
import ProgramTabs from '@/components/home/ProgramTabs';
import VisionMission from '@/components/home/VisionMission';
import AchievementsSlider from '@/components/home/AchievementsSlider';
import PartnersSection from '@/components/home/PartnersSection';
import AdmissionSteps from '@/components/home/AdmissionSteps';
import TestimonialVideo from "@/components/home/Testimony";
import ButtonCorner from '@/components/home/Button';

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <AboutPreview />
      <ProgramTabs />
      <VisionMission />
      <AchievementsSlider />
      <PartnersSection />
      <TestimonialVideo />
      <AdmissionSteps />
      <ButtonCorner />
    </MainLayout>
  );
};

export default Home;