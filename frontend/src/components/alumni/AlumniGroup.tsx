import ScrollReveal from "@/components/ScrollReveal";
import AlumniCard from "./AlumniCard";
import { GraduationCap } from "lucide-react";

export interface Alumni {
    id: number;
    name: string;
    grad_year: number;
    role?: string;
    location_name?: string;
    profile_picture?: string;
    testimony?: string;
    tags?: string;
}

interface AlumniGroupProps {
    year: number;
    items: Alumni[];
}

const AlumniGroup = ({ year, items }: AlumniGroupProps) => {
    return (
        <section>
            <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-full bg-[#12606A] px-5 py-2 text-sm font-black text-white shadow-md">
                    <GraduationCap size={16} />
                    Angkatan {year}
                </div>

                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs font-semibold text-slate-400">
                    {items.length} Alumni
                </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item, index) => (
                    <ScrollReveal
                        key={item.id}
                        delay={index * 0.05}
                    >
                        <AlumniCard alumni={item} />
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
};

export default AlumniGroup;