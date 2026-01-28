import { FileText, Users, ClipboardCheck, GraduationCap } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const steps = [
  {
    icon: FileText,
    title: 'Registration',
    description: 'Fill out the online registration form with required documents.',
  },
  {
    icon: Users,
    title: 'Interview',
    description: 'Attend an interview session with our admissions team.',
  },
  {
    icon: ClipboardCheck,
    title: 'Assessment',
    description: 'Complete aptitude tests for your chosen major.',
  },
  {
    icon: GraduationCap,
    title: 'Enrollment',
    description: 'Complete enrollment and begin your journey.',
  },
];

const AdmissionSteps = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Student Admission Process
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Join Metland School in simple steps. Our admissions process is
              designed to be straightforward and supportive.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 0.1}>
              <div className="relative text-center">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-white/20" />
                )}

                {/* Step Number & Icon */}
                <div className="relative inline-flex flex-col items-center">
                  <span className="text-sm font-medium text-white/60 mb-2">
                    Step {index + 1}
                  </span>
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-4 relative z-10">
                    <step.icon className="w-10 h-10" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-white/70">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="text-center mt-12">
            <button className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-colors shadow-lg">
              Start Registration
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AdmissionSteps;
