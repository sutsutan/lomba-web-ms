import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import achievementImg from '@/assets/achievement-1.jpg';

interface Achievement {
  id: number;
  title: string;
  student: string;
  description: string;
  category: string;
  image: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Gold Medal - National Robotics Competition',
    student: 'Ghattan Firstian Ilhaq',
    description: 'First place in the National Robotics Competition 2024, showcasing innovative automation solutions.',
    category: 'Technology',
    image: achievementImg,
  },
  {
    id: 2,
    title: 'Best Culinary Innovation Award',
    student: 'Sutan Bariq Rajabbani Pasai',
    description: 'Winner of the Jakarta Culinary Festival for creative fusion cuisine.',
    category: 'Culinary',
    image: achievementImg,
  },
  {
    id: 3,
    title: 'National Debate Championship',
    student: 'Hanna Maria',
    description: 'Champion in the National English Debate Competition representing West Java.',
    category: 'Academic',
    image: achievementImg,
  },
];

const AchievementsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % achievements.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  return (
    <section className="section-padding bg-section">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="section-title mx-auto">Moments of Achievement</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative max-w-4xl mx-auto">
            {/* Slider Container */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className="grid md:grid-cols-2"
                >
                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center text-white">
                    <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 w-fit">
                      {achievements[currentIndex].category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      {achievements[currentIndex].student}
                    </h3>
                    <p className="text-white/80 mb-6">
                      {achievements[currentIndex].description}
                    </p>
                    <button className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors w-fit">
                      <Trophy className="w-4 h-4" />
                      Consultation
                    </button>
                  </div>

                  {/* Image */}
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={achievements[currentIndex].image}
                      alt={achievements[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-border hover:bg-primary/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AchievementsSlider;
