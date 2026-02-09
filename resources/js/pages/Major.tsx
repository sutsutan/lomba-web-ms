import ScrollReveal from '@/components/ScrollReveal';
import MainLayout from '@/layouts/MainLayout';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    BookOpen,
    Briefcase,
    Building2,
    Calculator,
    CheckCircle2,
    Clock,
    Code,
    Hotel,
    Palette,
    Target,
    Users,
    Utensils,
} from 'lucide-react';
import { useState } from 'react';

// Assets
import accounting from '@/assets/akuntansi.webp';
import hospitality from '@/assets/aph.webp';
import dkv from '@/assets/dkv.webp';
import culinary from '@/assets/kuliner.webp';
import pplg from '@/assets/pepleg.webp';
import LogoMetland from '@/assets/metland.png';

const majorsData = [
    {
        id: 'hospitality',
        title: 'Hospitality',
        subtitle: 'Professional Service Excellence',
        description:
            'Master professional hotel management and global service standards under the BLUD Ministry of Education framework.',
        image: hospitality,
        themeColor: '#12606A', // Uniform Teal
        bgGradient: 'from-teal-600 to-emerald-700',
        icon: <Hotel className="h-6 w-6" />,
        competencies: [
            'Front Office Administration',
            'Housekeeping Management',
            'Laundry Operations',
            'F&B Service Excellence',
        ],
        careers: [
            'Hotel Administrator',
            'Guest Service Officer',
            'Executive Housekeeper',
            'Cruise Ship Professional',
        ],
        stats: { students: '450+', partners: '30+', duration: '3' },
        detailedInfo:
            'SMK Metland operates as a Regional Public Service Agency (BLUD) under the Ministry of Education. Our program is specifically designed to provide direct, hands-on professional training in hotel management responsibilities.',
        fullDescription:
            'Based on the Presidential Instruction for Vocational School Revitalization (INPRES Revitalisasi SMK), SMK Metland serves as a bridge for stakeholders and follows Government Regulation No. 48 of 2008. As a Regional Public Service Agency (BLUD) under the Ministry of Education and Culture, we are responsible for character development and education quality. The Hospitality program specifically trains students in professional hotel practices, ensuring they are ready to manage real-world responsibilities in the global tourism industry.',
    },
    {
        id: 'culinary',
        title: 'Culinary Arts',
        subtitle: 'Master the Kitchen',
        description:
            'From traditional heritage to modern fusion. Learn gastronomy, kitchen management, and professional service.',
        image: culinary,
        themeColor: '#12606A',
        bgGradient: 'from-orange-500 to-amber-600',
        icon: <Utensils className="h-6 w-6" />,
        competencies: [
            'Pastry & Bakery Arts',
            'Indonesian Heritage Cuisine',
            'Continental Cooking',
            'Kitchen Logistics',
        ],
        careers: [
            'Professional Chef',
            'Pastry Specialist',
            'Restaurant Manager',
            'Culinary Entrepreneur',
        ],
        stats: { students: '410+', partners: '20+', duration: '3' },
        detailedInfo:
            'Our curriculum emphasizes daily international-standard practical sessions. We focus on technical precision and professional attitude to produce industry-ready culinary experts.',
        fullDescription:
            'The Culinary Arts (Jasa Boga) program provides comprehensive knowledge in food processing, presentation, and service. Established as a flagship program at SMK Metland since 2014, it aims to equip students with skills in Indonesian and Continental cuisines, from appetizers to desserts. Students learn to manage pastry shops, bakeries, cafeterias, and restaurants. Teaching is focused on daily practical activities using international standards, preparing graduates to be professional chefs or entrepreneurs capable of organizing large-scale banquets and catering events.',
    },
    {
        id: 'accounting',
        title: 'Accounting',
        subtitle: 'Finance & Integrity',
        description:
            'Master financial analysis, tax regulation, and digital accounting systems with high precision and ethical standards.',
        image: accounting,
        themeColor: '#12606A',
        bgGradient: 'from-blue-600 to-indigo-700',
        icon: <Calculator className="h-6 w-6" />,
        competencies: [
            'Financial Reporting',
            'Corporate Tax Audit',
            'Digital Spreadsheet Mastery',
            'Computerized Accounting',
        ],
        careers: [
            'Financial Accountant',
            'Tax Consultant',
            'Internal Auditor',
            'Bank Officer',
        ],
        stats: { students: '350+', partners: '25+', duration: '3' },
        detailedInfo:
            'Equipping students with financial management and business administration competencies tailored to modern industrial needs.',
        fullDescription:
            'The Accounting program aims to provide students with core competencies in financial management and business administration. The curriculum covers recording financial transactions, preparing financial statements, basic taxation, and office administration. Graduates are prepared for roles such as accounting staff, financial administrators, cashiers, or junior auditors in various companies and institutions. Furthermore, the program provides a solid foundation for students planning to pursue higher education in finance or economics.',
    },
    {
        id: 'dkv',
        title: 'Visual Design',
        subtitle: 'Creative Industry',
        description:
            'Explore graphic design, photography, and motion graphics to become a versatile creator in the digital era.',
        image: dkv,
        themeColor: '#12606A',
        bgGradient: 'from-pink-600 to-rose-700',
        icon: <Palette className="h-6 w-6" />,
        competencies: [
            'Graphic Brand Identity',
            'UI/UX Design Concept',
            'Digital Illustration',
            'Photography & Cinematography',
        ],
        careers: [
            'Graphic Designer',
            'Art Director',
            'UI/UX Designer',
            'Content Creator',
        ],
        stats: { students: '480+', partners: '35+', duration: '3' },
        detailedInfo:
            'Focuses on creative problem solving and visual storytelling across various media platforms, from print to interactive digital assets.',
        fullDescription:
            'Visual Communication Design (DKV) explores the scope of visual elements, layout, and media characterization for both indoor and outdoor placement. Students learn to differentiate between social and commercial media types in both 2D and 3D formats. The program aims to form students who are scientifically grounded and creative, producing artworks that are environmentally friendly and based on national socio-cultural values. Career paths include roles in advertising, printing, event organizing, and digital media management.',
    },
    {
        id: 'pplg',
        title: 'Software & Game',
        subtitle: 'Building the Future',
        description:
            'Develop high-scale web applications, mobile apps, and immersive games using the latest technology stacks.',
        image: pplg,
        themeColor: '#12606A',
        bgGradient: 'from-purple-600 to-violet-700',
        icon: <Code className="h-6 w-6" />,
        competencies: [
            'Fullstack Web Development',
            'Mobile App Development',
            'Internet of Things (IoT)',
            'Game Development',
        ],
        careers: [
            'Software Developer',
            'System Analyst',
            'Web Architect',
            'Game Programmer',
        ],
        stats: { students: '520+', partners: '40+', duration: '3' },
        detailedInfo:
            'Integrating Cloud Computing and IoT to prepare students for the Industry 4.0 era through a Hybrid Learning Model.',
        fullDescription:
            "The PPLG curriculum at Metland School is developed to answer the challenges of the digital era, focusing on Cloud Computing, IoT, and Game Development. Under the management of PT Metropolitan Land, Tbk, our curriculum is deeply integrated with industrial needs in property, commercial, and hospitality sectors. We implement a Hybrid Model Learning system (synchronous-asynchronous) to strengthen both hardskills and softskills. Following the 'BMW' program (Work, Continue Education, Entrepreneurship), we collaborate with prestigious partners like Telkom University, Binus, and various Horison Hotels to ensure students are ready for the professional tech world.",
    },
];

const Major = () => {
    const [index, setIndex] = useState(0);
    const current = majorsData[index];

    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - card.left;
        const y = e.clientY - card.top;
        const centerX = card.width / 2;
        const centerY = card.height / 2;

        // Sensitivitas tilt (semakin besar pembaginya, semakin halus)
        setRotateX((y - centerY) / 40);
        setRotateY((centerX - x) / 40);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <MainLayout>
            {/* DYNAMIC HERO SECTION */}
            <section className="relative h-[70vh] min-h-[650px] w-full overflow-hidden bg-neutral-900">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={current.image}
                            className="h-full w-full scale-105 object-cover opacity-60"
                            alt={current.title}
                        />
                        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/95 via-black/50 to-transparent" />
                    </motion.div>
                </AnimatePresence>

                <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-6">
                    <motion.div
                        key={current.id + 'text'}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="mt-20 max-w-3xl md:mt-0"
                    >
                        <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-teal-400 backdrop-blur-md">
                            {current.subtitle}
                        </span>
                        <h1 className="mb-6 text-6xl font-black uppercase leading-[0.9] tracking-tighter text-neutral-50 md:text-8xl">
                            {current.title}
                        </h1>
                        <p className="max-w-xl text-lg leading-relaxed text-neutral-300 md:text-xl">
                            {current.description}
                        </p>
                    </motion.div>
                </div>

                {/* FLOATING NAVIGATOR - Uniform Teal Color */}
                <div className="no-scrollbar absolute bottom-10 left-0 right-0 z-30 overflow-x-auto px-6 py-4">
                    <div className="mx-auto flex min-w-max items-center justify-start gap-6 px-4 md:justify-center">
                        {majorsData.map((m, i) => (
                            <button
                                key={m.id}
                                onClick={() => setIndex(i)}
                                className={`group relative flex flex-col items-center gap-2 transition-all duration-300 ${
                                    index === i
                                        ? 'z-10 scale-110'
                                        : 'opacity-40 hover:opacity-100'
                                }`}
                            >
                                <div
                                    className={`rounded-2xl border bg-black/60 p-4 backdrop-blur-xl transition-all duration-500 ${
                                        index === i
                                            ? 'border-[#12606A] shadow-[0_0_20px_rgba(18,96,106,0.5)]'
                                            : 'border-white/10'
                                    }`}
                                    style={{
                                        color:
                                            index === i ? '#2dd4bf' : 'white',
                                    }}
                                >
                                    {m.icon}
                                </div>
                                <span className="hidden text-[10px] font-bold uppercase tracking-widest text-white md:block">
                                    {m.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* INTRO SECTION */}
            <section className="border-b border-neutral-100 bg-white py-12 md:py-20">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="mb-4 flex items-center gap-4">
                            <div className="h-12 w-1.5 bg-[#12606A]" />
                            <h2 className="text-3xl font-bold uppercase tracking-tight text-[#12606A] md:text-5xl">
                                Academic Excellence
                            </h2>
                        </div>
                        <p className="ml-5 max-w-2xl text-lg font-medium text-[#12606A]/70">
                            Metland School provides industry-standard vocational
                            education designed to bridge the gap between
                            students and the global professional market.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* DETAIL SECTION */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid items-start gap-16 lg:grid-cols-2"
                        >
                            {/* Image & Stats Overlay */}
                            <div className="group relative pr-8 pt-8">
                                <div className="absolute left-[-15px] top-0 z-20 h-24 w-24 border-l-4 border-t-4 border-[#12606A]" />
                                <div className="relative z-10 overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl">
                                    <img
                                        src={current.image}
                                        className="h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[400px]"
                                        alt={current.title}
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-4 z-20 min-w-[280px] rounded-2xl bg-[#12606A]/80 p-6 text-white shadow-xl md:-right-8 md:p-8">
                                    <div className="flex items-center justify-between gap-8">
                                        <div className="flex items-center gap-3">
                                            <Users className="h-5 w-5 opacity-60" />
                                            <div>
                                                <p className="text-2xl font-black leading-none">
                                                    {current.stats.students}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-widest opacity-60">
                                                    Students
                                                </p>
                                            </div>
                                        </div>
                                        <div className="h-10 w-[1px] bg-white/10" />
                                        <div className="flex items-center gap-3">
                                            <Building2 className="h-5 w-5 opacity-60" />
                                            <div>
                                                <p className="text-2xl font-black leading-none">
                                                    {current.stats.partners}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-widest opacity-60">
                                                    Partners
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content side */}
                            <div className="space-y-10 lg:mt-4">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-[#12606A]/60">
                                        Curriculum Focus
                                    </div>
                                    <h3 className="text-5xl font-black uppercase leading-none tracking-tighter text-[#12606A] md:text-7xl">
                                        {current.title}
                                    </h3>
                                    <p className="border-l-4 border-neutral-100 pl-6 text-justify text-lg italic leading-relaxed text-[#12606A]/80">
                                        "{current.detailedInfo}"
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {current.competencies.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="group flex items-center gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-5 transition-all hover:border-[#12606A]/30"
                                        >
                                            <CheckCircle2
                                                size={18}
                                                className="text-[#12606A]"
                                            />
                                            <span className="text-sm font-bold text-[#12606A]">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-6">
                                    <button className="group flex w-full items-center justify-center gap-4 rounded-[2rem] bg-[#12606A] px-12 py-5 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-neutral-900 md:w-auto">
                                        Register Now!{' '}
                                        <ArrowRight className="transition-transform group-hover:translate-x-2" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* NEW FULL SPECIFICATION SECTION WITH TILT ANIMATION */}
            <section className="perspective-1000 bg-[#12606A]/5 py-24">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-5xl">
                        <ScrollReveal>
                            <motion.div
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                animate={{ rotateX, rotateY }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30,
                                }}
                                style={{ transformStyle: 'preserve-3d' }}
                                className="group relative overflow-hidden rounded-[3rem] border border-neutral-100 bg-white p-8 shadow-xl md:p-16"
                            >
                                {/* Decorative Background Blur */}
                                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#12606A]/5 blur-3xl transition-colors duration-500 group-hover:bg-[#12606A]/10" />

                                <div
                                    style={{ transform: 'translateZ(50px)' }}
                                    className="relative z-10"
                                >
                                    <div className="mb-10 flex items-center gap-4">
                                        <div className="rounded-2xl bg-[#12606A] p-3 text-white shadow-lg">
                                            <BookOpen size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black uppercase tracking-tight text-[#12606A] md:text-3xl">
                                                Program In-Depth Profile
                                            </h4>
                                            <div className="mt-1 h-1 w-20 bg-[#12606A]/20" />
                                        </div>
                                    </div>

                                    <div className="prose prose-teal max-w-none">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={current.id + 'full'}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="space-y-6 text-justify text-lg leading-loose text-[#12606A]/80"
                                            >
                                                {/* Gunakan split untuk membuat paragraf jika teksnya panjang */}
                                                {current.fullDescription
                                                    .split('\n')
                                                    .map((para, i) => (
                                                        <p key={i}>{para}</p>
                                                    ))}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Bottom Accent */}
                                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#12606A]/20 to-transparent" />
                            </motion.div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-white py-24">
                {/* ELEMEN BARU: Background Large Text untuk mengisi kekosongan visual */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden opacity-[0.03]">
                    <h2 className="whitespace-nowrap text-[20vw] font-black uppercase leading-none">
                        Future Leader • Metland • Future Leader • Metland
                    </h2>
                </div>

                <div className="container relative z-10 mx-auto px-6">
                    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
                        {/* LEFT: CAREER PATHWAYS */}
                        <div className="lg:col-span-7">
                            <ScrollReveal>
                                <div className="space-y-12">
                                    <div className="flex items-center gap-5">
                                        <div className="rounded-2xl bg-teal-50 p-4 text-[#12606A] shadow-inner">
                                            <Briefcase size={36} />
                                        </div>
                                        <div>
                                            <h3 className="text-4xl font-black uppercase tracking-tighter text-[#12606A]">
                                                Career Pathways
                                            </h3>
                                            <p className="font-medium text-[#12606A]/60">
                                                Mapping your journey to the
                                                global professional landscape
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative ml-10 mt-16">
                                        {/* Garis Vertical Utama dengan Gradient */}
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: '100%' }}
                                            transition={{
                                                duration: 1.5,
                                                ease: 'easeInOut',
                                            }}
                                            className="absolute left-0 top-0 w-[2px] origin-top bg-gradient-to-b from-[#12606A] via-[#12606A] to-transparent"
                                        />

                                        <div className="space-y-14">
                                            {current.careers.map((job, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -30,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay: idx * 0.2,
                                                        duration: 0.6,
                                                    }}
                                                    viewport={{ once: true }}
                                                    className="group relative pl-12"
                                                >
                                                    {/* Garis Miring Penghubung (Diagonal Line) */}
                                                    <div className="absolute left-0 top-1/2 h-[1px] w-8 origin-left -translate-y-1/2 -rotate-[30deg] bg-[#12606A]/30 transition-colors duration-300 group-hover:bg-[#12606A]" />

                                                    {/* Dot Point dengan Ripple Effect */}
                                                    <div className="absolute left-[-6px] top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#12606A] bg-white shadow-sm transition-all duration-300 group-hover:bg-[#12606A]" />

                                                    <div className="flex flex-col">
                                                        <span className="mb-1 text-[10px] font-black uppercase tracking-[0.3em] text-[#12606A]/40">
                                                            Pathway Stage 0
                                                            {idx + 1}
                                                        </span>
                                                        <p className="text-2xl font-bold tracking-tight text-[#12606A] transition-all duration-300 group-hover:translate-x-3 group-hover:text-teal-600 md:text-3xl">
                                                            {job}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* RIGHT: STUDY DURATION */}
                        <div className="relative lg:col-span-5">
                            {/* ELEMEN BARU: Decorative Frame untuk menghilangkan kesan kosong di sekitar card */}
                            <div className="absolute -inset-6 -z-10 hidden rounded-[4rem] border border-neutral-100 lg:block" />
                            <div className="absolute -inset-12 -z-20 hidden rounded-[5rem] border border-neutral-50 lg:block" />

                            <ScrollReveal delay={0.3}>
                                <div
                                    className={`relative flex h-[600px] flex-col justify-between overflow-hidden rounded-[3.5rem] bg-gradient-to-br p-12 text-white md:p-16 ${current.bgGradient} shadow-[0_30px_60px_-15px_rgba(18,96,106,0.3)]`}
                                >
                                    {/* Overlay Pattern */}
                                    <div
                                        className="pointer-events-none absolute inset-0 opacity-10"
                                        style={{
                                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                            backgroundSize: '24px 24px',
                                        }}
                                    />

                                    <div className="relative z-10">
                                        <div className="mb-8 flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                                            <Clock size={16} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                                                Efficiency & Mastery
                                            </span>
                                        </div>

                                        <h4 className="mb-4 text-3xl font-black uppercase tracking-tight">
                                            Academic Period
                                        </h4>
                                        <div className="mb-8 flex items-baseline gap-4">
                                            <span className="text-9xl font-black leading-none tracking-tighter">
                                                {current.stats.duration}
                                            </span>
                                            <span className="text-4xl font-light uppercase tracking-widest opacity-60">
                                                Years
                                            </span>
                                        </div>

                                        <div className="max-w-[280px] space-y-6">
                                            <p className="text-lg font-medium leading-relaxed opacity-90">
                                                Focused vocational excellence
                                                including real-world internships
                                                and professional certification.
                                            </p>
                                            <div className="h-1.5 w-16 rounded-full bg-white/30" />
                                        </div>
                                    </div>


                                    {/* Background Big Logo Metland (Raksasa & Transparan) */}
                                    <div className="pointer-events-none absolute -bottom-20 -right-20 rotate-[-15deg] opacity-[0.07]">
                                        <img
                                            src={LogoMetland}
                                            alt="Metland Watermark"
                                            className="h-[500px] w-[500px] object-contain brightness-0 invert"
                                        />
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Major;
