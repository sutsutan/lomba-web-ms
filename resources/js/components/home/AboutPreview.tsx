import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import aboutImage from '@/assets/about-preview.jpg';

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

          {/* Image */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={aboutImage}
                  alt="Students at Metland School"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/20 rounded-full -z-10" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
