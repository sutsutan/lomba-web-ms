import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import programIt from '@/assets/program-it.jpg';
import programCulinary from '@/assets/program-culinary.jpg';

interface Organization {
  name: string;
  description: string;
  category: string;
  image: string;
}

const organizations: Record<string, Organization[]> = {
  leadership: [
    {
      name: 'Osis Student Council',
      description: 'OSIS is the main student organization that organizes school events, programs, and represents student voice.',
      category: 'Leadership & Governance',
      image: programIt,
    },
    {
      name: 'MPK Representatives',
      description: 'MPK acts as a bridge between students and the school by representing ideas and concerns responsibly.',
      category: 'Leadership & Governance',
      image: programCulinary,
    },
  ],
  creative: [
    {
      name: 'CIMS Cinematography',
      description: 'CIMS is a creative community where students develop media and broadcasting skills through real projects and events.',
      category: 'Media & Production',
      image: programIt,
    },
    {
      name: 'Maheswara - Maheswari',
      description: 'Maheswara-Maheswari fosters creativity, cultural appreciation, and stage confidence through arts and performances.',
      category: 'Performing Arts',
      image: programCulinary,
    },
  ],
  discipline: [
    {
      name: 'Pramuka (Scouts)',
      description: 'Pramuka develops independence, leadership, and teamwork through outdoor and experiential learning.',
      category: 'Outdoor Leadership',
      image: programIt,
    },
    {
      name: 'Paskibra',
      description: 'Paskibra builds discipline, leadership, and teamwork through structured training and ceremonial activities.',
      category: 'Ceremonial & Drill',
      image: programCulinary,
    },
  ],
  wellness: [
    {
      name: 'Rohis (Spiritual)',
      description: 'Rohis supports spiritual growth, character building, and positive values through religious activities.',
      category: 'Faith & Community',
      image: programIt,
    },
    {
      name: 'KKR (Kader Kesehatan Remaja)',
      description: 'KKR promotes health awareness, first aid skills, and healthy lifestyles among students.',
      category: 'Health & Safety',
      image: programCulinary,
    },
    {
      name: 'MSP (Metland School Projects)',
      description: 'MSP develops creativity, collaboration, and critical thinking through project-based learning.',
      category: 'Production & Technology',
      image: programIt,
    },
  ],
};

const Organization = () => {
  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel
        title="Learning Beyond Class"
        subtitle="Student Organizations"
        description="Building leadership through collaboration and responsibility in various student organizations."
      />

      {/* Student Organizations */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Student Organizations
              </h2>
            </div>
            <p className="text-muted-foreground ml-4">
              Building leadership through collaboration and responsibility
            </p>
          </ScrollReveal>

          {/* Leadership */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {organizations.leadership.map((org, index) => (
              <ScrollReveal key={org.name} delay={index * 0.1}>
                <div className="group relative rounded-2xl overflow-hidden h-72">
                  <img
                    src={org.image}
                    alt={org.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-2">{org.name}</h3>
                    <p className="text-white/80 text-sm">{org.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Creative & Arts */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h3 className="text-2xl font-bold text-foreground">Creative & Arts</h3>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {organizations.creative.map((org, index) => (
              <ScrollReveal key={org.name} delay={index * 0.1}>
                <div className="card-hover flex gap-4 p-4">
                  <img
                    src={org.image}
                    alt={org.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{org.name}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{org.description}</p>
                    <span className="text-primary text-xs font-medium mt-2 block">
                      {org.category.toUpperCase()}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Character & Discipline */}
      <section className="py-12 bg-section">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h3 className="text-2xl font-bold text-foreground">Character & Discipline</h3>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {organizations.discipline.map((org, index) => (
              <ScrollReveal key={org.name} delay={index * 0.1}>
                <div className="card-hover flex gap-4 p-4">
                  <img
                    src={org.image}
                    alt={org.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{org.name}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{org.description}</p>
                    <span className="text-primary text-xs font-medium mt-2 block">
                      {org.category.toUpperCase()}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation & Wellness */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h3 className="text-2xl font-bold text-foreground">Innovation & Wellness</h3>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {organizations.wellness.map((org, index) => (
              <ScrollReveal key={org.name} delay={index * 0.1}>
                <div className="card-hover flex gap-4 p-4">
                  <img
                    src={org.image}
                    alt={org.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{org.name}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{org.description}</p>
                    <span className="text-primary text-xs font-medium mt-2 block">
                      {org.category.toUpperCase()}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Organization;
