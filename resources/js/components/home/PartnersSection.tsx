import ScrollReveal from '@/components/ScrollReveal';

const partners = [
  { name: 'SCTV', logo: '📺' },
  { name: 'Telkom', logo: '📡' },
  { name: 'Indosat', logo: '📱' },
  { name: 'Traveloka', logo: '✈️' },
  { name: 'Bank Indonesia', logo: '🏦' },
  { name: 'Pertamina', logo: '⛽' },
];

const PartnersSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Collaborating for
                <br />
                <span className="text-primary">the Future</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Through strong partnerships with leading companies and
                institutions, we provide our students with real-world
                experiences, internship opportunities, and direct pathways
                to employment.
              </p>
            </div>
          </ScrollReveal>

          {/* Partners Grid */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-3 gap-4">
              {partners.map((partner, index) => (
                <div
                  key={partner.name}
                  className="bg-white rounded-xl p-6 shadow-sm border border-border/50 flex flex-col items-center justify-center hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <span className="text-4xl mb-2">{partner.logo}</span>
                  <span className="text-xs text-muted-foreground text-center">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
