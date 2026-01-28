import ourVisionImg from '@/assets/our-vision.jpg';
import ourMissionImg from '@/assets/our-mission.jpg';
import ScrollReveal from '@/components/ScrollReveal';

const VisionMission = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="section-title mx-auto">Our Direction</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision Card */}
          <ScrollReveal delay={0.1}>
            <div className="vision-card h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 flex items-center justify-center">
                  <img src={ourVisionImg} alt="our-vision" className="rounded-full" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                     To become a leading vocational school that consistently produces 
                     graduates with strong character, excellent performance, and 
                     internationally recognized competencies, through an education system 
                     that integrates academic excellence, industry relevance, and global standards.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                     We strive to shape learners into confident, adaptable, and skilled 
                     individuals who are prepared to compete in the international workforce, 
                     embrace technological advancements, and contribute positively to society 
                     in an ever-changing global environment.
              </p>
            </div>
          </ScrollReveal>

          {/* Mission Card */}
          <ScrollReveal delay={0.2}>
            <div className="vision-card h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14  flex items-center justify-center">
                  <img src={ourMissionImg} alt="our-mission" className="rounded-full" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To deliver education that focuses on the development of knowledge, skills, and attitude, aligned with Industry 4.0 and strengthened by the values of Generasi Cinta Prestasi, in accordance with industry demands.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                To enhance teacher professionalism based on Metland School Teacher’s Values, while continuously adapting to the needs of Industry 4.0.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                To build strong partnerships with industries (DUDI) and vocational higher education institutions, both nationally and internationally, to support academic program development.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
