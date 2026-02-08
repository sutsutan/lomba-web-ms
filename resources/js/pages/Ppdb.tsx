import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { ArrowRight } from 'lucide-react';
import logoMetland from '@/assets/logo-metland.png';
import achievement1 from '@/assets/achievement-1.jpg';
import studentEnrollment from '@/assets/pepleg.webp';

const Ppdb = () => {
  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel
        title="New Student Admission"
        subtitle="PPDB 2026-2027"
        description="Begin your journey with us. Discover the enrollment process and become part of Metland School community."
        height="h-[50vh] sm:h-[60vh] md:h-[70vh]"
      />

      {/* Enrollment Journey Section */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-3 md:gap-4 mb-8 ml-0 md:ml-6 lg:ml-10">
              <div className="w-[3px] h-8 sm:h-10 md:h-12 bg-[#12606A] flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#12606A] tracking-tight">
                Enrollment Journey
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 mt-12 md:mt-16 items-center">
            {/* Content Card */}
            <ScrollReveal delay={0.1}>
              <div className="bg-[#E8F0F2] rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#9DB8BF] rounded-full opacity-60" />
                
                <div className="relative z-10 space-y-4 md:space-y-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#12606A] leading-snug">
                    Our admission application for<br />
                    <span className="text-[#12606A]">2026-2027 is now opened.</span>
                  </h3>
                  
                  <p className="text-[#12606A]/80 font-medium leading-relaxed text-sm sm:text-base">
                    If you are interested in applying late, please start by clicking
                    the button below and completing our initial inquiry form. The
                    admission office will reach out should we decide to accept
                    more applications this spring.
                  </p>
                  
                  <button className="px-8 py-3 rounded-full bg-[#9DB8BF] text-[#12606A] font-bold text-sm hover:bg-[#8AA8AF] transition-all active:scale-95 shadow-md flex items-center gap-2 group">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Image */}
            <ScrollReveal delay={0.2}>
              <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-xl relative">
                <img
                  src={studentEnrollment}
                  alt="Student Enrollment"
                  className="w-full h-full object-cover"
                />
                {/* Overlay decorations */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <p className="text-xs font-semibold text-[#12606A]">Enrollment Open</p>
                  <p className="text-[10px] text-[#12606A]/70">A Glowing Journey</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Admission Steps Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-5xl">
          {/* Steps */}
          <div className="space-y-0">
            {[
              { 
                step: 1, 
                title: 'Apply Online', 
                subtitle: 'Start Your Application',
                desc: 'Registration begins with a simple online form that parents can complete from home. This step is designed to make the first part of the process fast, clear, and accessible. After submitting the form, your application will be recorded in our system and you will receive confirmation along with the next instructions.',
                date: '01 March – 30 April 2026'
              },
              { 
                step: 2, 
                title: 'Upload Required Documents', 
                subtitle: 'Prepare and Submit Your Files',
                desc: 'Once the registration form is submitted, parents will upload the required documents to complete the application. Clear and complete documents help our admission team verify information more efficiently. If any document is missing or unclear, our team will contact you to guide the revision process.',
                date: '01 March – 05 May 2026'
              },
              { 
                step: 3, 
                title: 'Assessment & Interview', 
                subtitle: 'Discover the Student\'s Potential',
                desc: 'After all documents are submitted, the admission team will carefully review the application to ensure everything meets the requirements. This step ensures every applicant is processed fairly and professionally. Once verified, parents will receive an update and a schedule for the next stage.',
                date: 'Within 3-5 working days after submission'
              },
              { 
                step: 4, 
                title: 'Admission Result', 
                subtitle: 'Receive the Official Decision',
                desc: 'After the assessment stage is completed, parents will receive the admission result through official school communication channels. If accepted, the student will move forward to the enrollment confirmation stage. We aim to deliver results quickly so families can plan with confidence.',
                date: '21 May 2026'
              },
            ].map((item, index, arr) => (
              <ScrollReveal key={index} delay={0.1 * index}>
                <div className="relative">
                  {/* Top Separator with Logo */}
                  <div className="flex items-center justify-center gap-4 py-6">
                    <div className="flex-1 h-[1px] bg-[#12606A]/30" />
                    <img 
                      src={logoMetland} 
                      alt="Metland Logo" 
                      className="w-8 h-8 object-contain"
                    />
                    <div className="flex-1 h-[1px] bg-[#12606A]/30" />
                  </div>

                  {/* Step Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 py-6">
                    {/* Left Column - Title */}
                    <div className="text-center md:text-left">
                      <p className="text-[#12606A] font-bold text-lg mb-1">Step {item.step}:</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#12606A] mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[#12606A]/70 font-medium text-sm">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Right Column - Description */}
                    <div className="space-y-4">
                      <p className="text-[#12606A]/80 leading-relaxed text-sm md:text-base text-justify">
                        {item.desc}
                      </p>
                      <p className="text-[#12606A] font-medium text-sm">
                        Date: <span className="text-[#12606A]/70">[{item.date}]</span>
                      </p>
                    </div>
                  </div>

                  {/* Bottom Separator for last item */}
                  {index === arr.length - 1 && (
                    <div className="flex items-center justify-center gap-4 py-6">
                      <div className="flex-1 h-[1px] bg-[#12606A]/30" />
                      <img 
                        src={logoMetland} 
                        alt="Metland Logo" 
                        className="w-8 h-8 object-contain"
                      />
                      <div className="flex-1 h-[1px] bg-[#12606A]/30" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Apply Section */}
      <section className="mb-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#12606A] mb-4">
                        Ready to Apply?
                    </h2>
                    <p className="text-[#12606A]/80 text-md md:text-lg font-medium mb-8">
                        Apply today and start your journey at Metland School.
                    </p>
                    <a 
                        href="https://smkmetland.net/ppdb/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-[#CFE0E3] text-[#12606A] font-bold rounded-full hover:bg-[#BED3D7] transition-all active:scale-95 shadow-md"
                    >
                        Start Now | Ask Admissions
                    </a>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
                <div className="w-full h-[200px] md:h-[300px] overflow-hidden shadow-2xl">
                    <img 
                        src={achievement1} 
                        alt="Achievement" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </ScrollReveal>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section-padding bg-[#12606A] text-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Admission Requirements
                </h2>
                <ul className="space-y-4">
                  {[
                    'Completed application form',
                    'Copy of birth certificate',
                    'Latest academic report card',
                    'Photo 3x4 (2 copies)',
                    'Copy of family card (KK)',
                    'Health certificate from doctor',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-bold mb-4">Important Dates</h3>
                <div className="space-y-4">
                  {[
                    { date: 'January 2026', event: 'Registration Opens' },
                    { date: 'March 2026', event: 'Document Submission Deadline' },
                    { date: 'April 2026', event: 'Assessment Tests' },
                    { date: 'May 2026', event: 'Interview Period' },
                    { date: 'June 2026', event: 'Announcement of Results' },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0">
                      <span className="text-white/70">{item.event}</span>
                      <span className="font-semibold text-white">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <ScrollReveal>
            <div className="bg-gradient-to-r from-[#12606A] to-[#0A4A52] rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-white/80 max-w-2xl mx-auto mb-8">
                  Join Metland School and unlock your potential. Our admission team is ready to guide you through the enrollment process.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://smkmetland.net/ppdb/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white text-[#12606A] font-bold rounded-full hover:bg-white/90 transition-all active:scale-95 shadow-lg"
                  >
                    Apply Now
                  </a>
                  <a 
                    href="/contact" 
                    className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all active:scale-95"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </MainLayout>
  );
};

export default Ppdb;
