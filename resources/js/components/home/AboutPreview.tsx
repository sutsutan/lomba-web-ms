import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';

// Import 3 gambar berbeda (sesuaikan path-nya)
import aboutImage1 from '@/assets/osis.jpg'; // Gambar atas
import aboutImage2 from '@/assets/cims.jpeg';      // Gambar kiri bawah
import aboutImage3 from '@/assets/kkr.jpeg';    // Gambar kanan bawah

const AboutPreview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-primary font-medium text-2xl">About Us</span>
              </div>
              <h2 className="section-title text-3xl md:text-4xl">
                Where Learning Begins
              </h2>
              <p className="text-muted-foreground leading-relaxed mt-8">
                Metland School is a vocational secondary school focused on
                developing practical skills, character, and confidence in every
                student. We believe that education should prepare students not
                only academically but also professionally for their future careers.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through project-based learning, industry partnerships, and hands-on
                experiences, we empower students to become skilled professionals
                ready to make an impact in their chosen fields.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 btn-outline mt-4"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Image Grid Style */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative flex flex-col gap-4">
              {/* Gambar Atas (Besar/Wide) */}
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={aboutImage1}
                  alt="Band Performance"
                  className="w-full h-[250px] md:h-[300px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Baris Bawah (Dua Kolom) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={aboutImage2}
                    alt="Barongsai Performance"
                    className="w-full h-[180px] md:h-[220px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={aboutImage3}
                    alt="Fine Dining Practice"
                    className="w-full h-[180px] md:h-[220px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Decorative Elements (Tetap dipertahankan dengan penyesuaian posisi) */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gold/20 rounded-full -z-10" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;