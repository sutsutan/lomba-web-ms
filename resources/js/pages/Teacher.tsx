import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Users, BookOpen, Award, GraduationCap, Briefcase } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import MainLayout from '@/layouts/MainLayout';
import President from '@/assets/darmawan.jpg';
import { useLanguage } from '@/contexts/LanguageContext';

const Teachers = () => {
    const { t } = useLanguage();
    const [activeDept, setActiveDept] = useState<string>('pplg');

    const teacherData = {
        leadership: [
            {
                name: "Fandi Sunarja",
                role: t('teacher.role.principal'),
                image: President,
                bio: t('teacher.bio.principal')
            },
            {
                name: "Veria Rajabbani",
                role: t('teacher.role.vice_principal'),
                image: "",
                bio: t('teacher.bio.vice_principal')
            }
        ],
        departments: {
            pplg: [
                { name: "I Gusti Agung Kuswibawa", subject: "Lead IT Instructor", competency: ["Web Dev", "UI/UX"], image: "" },
                { name: "Irgiawan Fhutuh", subject: "Software Engineer", competency: ["Fullstack", "JavaScript"], image: "" },
                { name: "Muhammad Iqbal", subject: "Software Engineer", competency: ["Backend", "Python"], image: "" },
                { name: "Azzam", subject: "Software Engineer", competency: ["Hengker", "Python"], image: "" },
                { name: "Veria Raja Tunggal", subject: "Software Engineer", competency: ["King Laravel", "Website Developer"], image: "" },
            ],
            culinary: [
                { name: "Lely", subject: "Pastry Chef", competency: ["Baking", "Plating"], image: "" },
                { name: "Chef Junaedi", subject: "Main Course Specialist", competency: ["Western", "Asian"], image: "" },
            ],
            hospitality: [
                { name: "Indra", subject: "Front Office Manager", competency: ["Service", "Ethics"], image: "" },
                { name: "Joyce Lantu", subject: "Front Office Manager", competency: ["Service", "Ethics"], image: "" },
            ],
            dkv: [
                { name: "Ade Nurcholik", subject: "Typography Designer", competency: ["AI", "Photoshop"], image: "" },
                { name: "Ikhsan Kurnia", subject: "Visual Designer", competency: ["AI", "Clip Studio Paint"], image: "" },
            ],
            accounting: [
                { name: "Dewi Lestari", subject: "Finance Teacher", competency: ["Audit", "Taxation"], image: "" },
            ],
            general: [
                { name: "Meisty", subject: "Mathematics", competency: ["Calculus", "Logic"], image: "" },
                { name: "Asri Maharani", subject: "English Literature", competency: ["Public Speaking"], image: "" },
                { name: "Agustono", subject: "English Literature", competency: ["Public Speaking"], image: "" },
            ],
            staff: [
                { name: "Fajar", subject: "Administration", competency: ["Support", "Archive"], image: "" },
            ]
        }
    };

    return (
        <MainLayout>
            <HeroCarousel
                title={t('teacher.hero.title')}
                subtitle={t('teacher.hero.subtitle')}
                description={t('teacher.hero.desc')}
                height="h-[60vh] md:h-[70vh]"
            />

            <section className="py-24 bg-background overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">

                    {/* Header Section */}
                    <ScrollReveal>
                        <div className="flex flex-col items-center text-center mb-20">
                            <div className="bg-[#0F5F58]/10 p-4 rounded-3xl mb-6">
                                <Users className="w-10 h-10 text-[#0F5F58]" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#0F5F58]">
                                {t('teacher.leadership.title')}
                            </h2>
                            <p className="text-[#0F5F58]/70 mt-4 max-w-2xl text-lg">
                                {t('teacher.leadership.desc')}
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Exclusive Leadership Section */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-32">
                        {teacherData.leadership.map((leader, index) => (
                            <ScrollReveal key={index} delay={index * 0.2}>
                                <div className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 items-center group hover:border-[#0F5F58]/20 transition-all">
                                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 border-8 border-[#B8C5D0]/30 shadow-inner">
                                        <img
                                            src={leader.image}
                                            alt={leader.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <div className="text-center md:text-left space-y-4">
                                        <div className="bg-[#0F5F58] text-white text-xs font-bold uppercase tracking-[0.2em] py-2 px-5 rounded-full inline-block">
                                            {leader.role}
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#0F5F58]">{leader.name}</h3>
                                        <p className="text-gray-600 text-base leading-relaxed italic">
                                            "{leader.bio}"
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <hr className="mb-24 border-gray-100" />

                    {/* Department Selection Tabs */}
                    <ScrollReveal delay={0.1}>
                        <div className="flex flex-col items-center mb-16">

                            <div className="flex items-center gap-4 mb-10">
                                <Briefcase className="w-8 h-8 text-[#0F5F58]" />
                                <h3 className="text-3xl md:text-4xl font-bold text-[#0F5F58]">
                                    {t('teacher.faculty.title')}
                                </h3>
                            </div>

                            <div className="w-full flex justify-center border-b border-gray-100">
                                <div className="flex gap-8 md:gap-12 overflow-x-auto hide-scrollbar pb-0 px-4">
                                    {Object.keys(teacherData.departments).map((dept) => (
                                        <button
                                            key={dept}
                                            onClick={() => setActiveDept(dept)}
                                            className={`pb-4 text-base md:text-lg font-bold transition-all duration-300 relative whitespace-nowrap ${activeDept === dept
                                                    ? 'text-[#0F5F58]'
                                                    : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                        >
                                            {t(`teacher.dept.${dept}`)}
                                            {activeDept === dept && (
                                                <motion.div
                                                    layoutId="activeTabUnderline"
                                                    className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#0F5F58] rounded-full"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </ScrollReveal>

                    {/* Teachers Grid with Animation */}
                    <div className="min-h-[600px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeDept}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                            >
                                {teacherData.departments[activeDept as keyof typeof teacherData.departments]?.map((teacher, index) => (
                                    <div
                                        key={index}
                                        className="group bg-white rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-50"
                                    >
                                        <div className="relative h-80 overflow-hidden bg-slate-100">
                                            {teacher.image ? (
                                                <img
                                                    src={teacher.image}
                                                    alt={teacher.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <Users size={64} />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F5F58] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-end p-8">
                                                <div className="space-y-3">
                                                    <p className="text-white/70 text-xs font-bold uppercase tracking-wider">{t('teacher.competency.label')}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {teacher.competency.map((skill, sIdx) => (
                                                            <span key={sIdx} className="bg-white/20 backdrop-blur-md text-white text-[10px] py-1.5 px-3 rounded-lg border border-white/20 font-bold uppercase">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-8 text-center">
                                            <h4 className="font-bold text-[#0F5F58] text-xl mb-2">
                                                {teacher.name}
                                            </h4>
                                            <div className="flex items-center justify-center gap-2 text-[#0F5F58]/60 text-sm font-bold uppercase tracking-wide">
                                                <Award className="w-4 h-4" />
                                                {teacher.subject}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Bottom CTA */}
                    <ScrollReveal delay={0.4}>
                        <div className="mt-32 bg-[#0F5F58] rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32" />
                            <GraduationCap className="w-16 h-16 mx-auto mb-8 opacity-20" />
                            <h3 className="text-3xl md:text-5xl font-bold mb-6">
                                {t('teacher.cta.title')}
                            </h3>
                            <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl leading-loose font-medium">
                                {t('teacher.cta.desc')}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </MainLayout>
    );
};

export default Teachers;