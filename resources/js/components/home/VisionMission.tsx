import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ourVisionImg from '@/assets/our-vision.jpg';
import ourMissionImg from '@/assets/our-mission.jpg';
import ScrollReveal from '@/components/ScrollReveal';

// Sub-komponen untuk Card agar logic mouse tidak tercampur
const InteractiveCard = ({ children, delay }: { children: React.ReactNode, delay: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values untuk rotasi
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Menghaluskan pergerakan dengan spring
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Transformasi derajat rotasi (maksimal 10-15 derajat agar tidak pusing)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Menghitung posisi kursor relatif terhadap tengah kartu (range -0.5 sampai 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="vision-card h-full relative group transition-colors duration-500"
      >
        {/* Efek Spotlight Glow yang mengikuti kursor */}
        <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
             style={{
               background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(20, 184, 166, 0.1), transparent 40%)`
             }}
        />
        
        <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
          {children}
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

const VisionMission = () => {
  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-primary section-title mx-auto">Our Direction</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" style={{ perspective: "1000px" }}>
          {/* Vision Card */}
          <InteractiveCard delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src={ourVisionImg} alt="our-vision" className="rounded-full shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4 indent-8 text-justify">
              To become a leading vocational school that consistently produces graduates with strong character, 
              excellent performance, and internationally recognized competencies, 
              through an education system that integrates academic excellence, industry relevance, and global standards.
            </p>
            <p className="text-muted-foreground leading-relaxed indent-8 text-justify">
              We strive to shape learners into confident, adaptable, 
              and skilled individuals who are prepared to compete in the international workforce, 
              embrace technological advancements, and contribute positively to society in an ever-changing global environment.
            </p>
          </InteractiveCard>

          {/* Mission Card */}
          <InteractiveCard delay={0.2}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src={ourMissionImg} alt="our-mission" className="rounded-full shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed indent-8 text-justify">
                To deliver education that focuses on the development of knowledge, skills, and attitude, 
                aligned with Industry 4.0 and strengthened 
                by the values of Generasi Cinta Prestasi, in accordance with industry demands.
              </p>
              <p className="text-muted-foreground leading-relaxed indent-8 text-justify">
                To enhance teacher professionalism based on Metland School Teacher’s Values, while 
                continuously adapting to the needs of Industry 4.0.
                To build strong 
                partnerships with industries (DUDI) and vocational higher education institutions, both nationally and internationally, to support academic program development.
              </p>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;