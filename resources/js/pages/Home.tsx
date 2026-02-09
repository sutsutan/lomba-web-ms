import MainLayout from '@/layouts/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import AboutPreview from '@/components/home/AboutPreview';
import ProgramTabs from '@/components/home/ProgramTabs';
import VisionMission from '@/components/home/VisionMission';
import AchievementsSlider from '@/components/home/AchievementsSlider';
import PartnersSection from '@/components/home/PartnersSection';
import AdmissionSteps from '@/components/home/AdmissionSteps';
import BGM from '@/components/home/bgm';
import Ppdbpopup from "@/components/home/ppdbpopup";

const Home = () => {
  return (
    <MainLayout>
      <Ppdbpopup />
      <HeroSection />
      <AboutPreview />
      <ProgramTabs />
      <VisionMission />
      <AchievementsSlider />
      <PartnersSection />
      <AdmissionSteps />
      <BGM />
    </MainLayout>
  );
};

export default Home;
