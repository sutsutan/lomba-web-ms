import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { 
  GraduationCap, 
  Users, 
  Award, 
  Building,
  Calendar 
} from 'lucide-react';
import aboutImage from '@/assets/about-preview.jpg';

const timelineData = [
  { year: '1995', title: 'Foundation', description: 'Metland School established as a vocational training center.' },
  { year: '2000', title: 'Expansion', description: 'Added new majors including IT and Culinary Arts.' },
  { year: '2010', title: 'Recognition', description: 'Achieved national accreditation with excellent rating.' },
  { year: '2020', title: 'Digital Era', description: 'Integrated digital learning and industry 4.0 curriculum.' },
  { year: '2024', title: 'Today', description: 'Leading vocational school with 1000+ students and 50+ teachers.' },
];

const About = () => {
  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel
        title="About MS"
        subtitle="SMK Metland School"
        description="Discover our story, our mission, and our commitment to excellence in vocational education."
      />

      {/* Get to Know Us */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="section-title text-3xl md:text-4xl">
                  Get to Know Us
                </h2>
                <p className="text-muted-foreground leading-relaxed mt-8">
                  Metland School is a premier vocational secondary school 
                  dedicated to developing practical skills, character, and 
                  real-world readiness. With state-of-the-art facilities and 
                  industry partnerships, we prepare students for successful careers.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our approach combines rigorous academics with hands-on 
                  experience, ensuring graduates are ready to excel in their 
                  chosen fields from day one.
                </p>
                <div className="flex gap-4">
                  <button className="btn-primary">Our Video</button>
                  <button className="btn-outline">Learn More</button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="card-hover p-6 text-center">
                  <GraduationCap className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-lg">5 Majors</h4>
                  <p className="text-sm text-muted-foreground">Industry-focused programs</p>
                </div>
                <div className="card-hover p-6 text-center">
                  <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-lg">1000+ Students</h4>
                  <p className="text-sm text-muted-foreground">Active learners</p>
                </div>
                <div className="card-hover p-6 text-center">
                  <Award className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-lg">A Accredited</h4>
                  <p className="text-sm text-muted-foreground">National recognition</p>
                </div>
                <div className="card-hover p-6 text-center">
                  <Building className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-lg">50+ Partners</h4>
                  <p className="text-sm text-muted-foreground">Industry connections</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-section" id="vision">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mx-auto">Our Timeline</h2>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 w-0.5 h-full bg-border -translate-x-1/2" />

              {timelineData.map((item, index) => (
                <ScrollReveal key={item.year} delay={index * 0.1}>
                  <div className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 border-4 border-background z-10" />
                    
                    {/* Content */}
                    <div className={`ml-8 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}>
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50">
                        <span className="text-primary font-bold text-lg">{item.year}</span>
                        <h4 className="font-semibold text-lg mt-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm mt-2">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Life */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                  <div className="w-1 h-10 bg-white rounded-full" />
                  Student Life
                </h2>
                <p className="text-white/90 leading-relaxed">
                  At Metland School, student life extends beyond the classroom. 
                  Our vibrant community offers countless opportunities for 
                  personal growth, leadership development, and unforgettable 
                  experiences.
                </p>
                <ul className="space-y-3">
                  {[
                    'Active student council and organizations',
                    'Annual cultural festivals and competitions',
                    'Industry visits and internship programs',
                    'Sports tournaments and extracurricular clubs',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <img
                  src={aboutImage}
                  alt="Student Life"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
