import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { Briefcase, MapPin, GraduationCap } from 'lucide-react';
import achievement from '@/assets/achievement-1.jpg';

const alumniData = [
  {
    id: 1,
    name: 'Ahmad Rizky',
    year: '2020',
    major: 'IT & Software',
    company: 'Tokopedia',
    position: 'Software Engineer',
    image: achievement,
    quote: 'Metland School prepared me with real-world skills that made my transition to the tech industry seamless.',
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    year: '2019',
    major: 'Culinary Arts',
    company: 'Marriott Hotels',
    position: 'Executive Chef',
    image: achievement,
    quote: 'The hands-on experience at Metland gave me the confidence to pursue my culinary dreams.',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    year: '2021',
    major: 'Business & Accounting',
    company: 'Bank Mandiri',
    position: 'Financial Analyst',
    image: achievement,
    quote: 'The industry partnerships at Metland opened doors I never thought possible.',
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    year: '2020',
    major: 'Visual Communication',
    company: 'Gojek',
    position: 'UI/UX Designer',
    image: achievement,
    quote: 'My portfolio from Metland School projects helped me land my dream job.',
  },
];

const Alumni = () => {
  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel
        title="Alumni Network"
        subtitle="SMK Metland School"
        description="Connect with our successful graduates who are making an impact in various industries."
        height="height=h-[70vh]"
      />

      
      {/* Featured Alumni */}
      <section className="section-padding bg-section">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="section-title mx-auto">Our Successful Alumni</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {alumniData.map((alumni, index) => (
              <ScrollReveal key={alumni.id} delay={index * 0.1}>
                <div className="card-hover p-6 flex flex-col md:flex-row gap-6">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto md:mx-0"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-xl text-foreground">{alumni.name}</h3>
                    <p className="text-primary font-medium">{alumni.position}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {alumni.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        Class of {alumni.year}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-4 italic">
                      "{alumni.quote}"
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '5,000+', label: 'Total Alumni' },
                { value: '95%', label: 'Employment Rate' },
                { value: '200+', label: 'Partner Companies' },
                { value: '50+', label: 'Countries' },
              ].map((stat, index) => (
                <div key={index} className="p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Are You an Alumni?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join our alumni network to stay connected with your classmates, 
              access exclusive events, and give back to the Metland School community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
                Register as Alumni
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors">
                Alumni Events
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </MainLayout>
  );
};

export default Alumni;
