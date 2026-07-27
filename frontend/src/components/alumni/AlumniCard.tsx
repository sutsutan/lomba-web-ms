import {
    Briefcase,
    GraduationCap,
    MapPin,
} from "lucide-react";
import { Alumni } from "./AlumniGroup";

interface Props {
    alumni: Alumni;
}

const getImageUrl = (alumni: Alumni) => {
    if (!alumni.profile_picture) {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
            alumni.name
        )}&background=12606A&color=fff`;
    }

    if (alumni.profile_picture.startsWith("http")) {
        return alumni.profile_picture;
    }

    return `${import.meta.env.VITE_API_URL}/storage/${alumni.profile_picture}`;
};

const AlumniCard = ({ alumni }: Props) => {
    return (
        <div className="group relative overflow-hidden rounded-3xl border-2 border-slate-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl">

            <div className="mb-5 flex items-start gap-4">

                <div className="relative h-20 w-20 shrink-0">

                    <div
                        className="absolute inset-0 rounded-full border-2 border-dashed border-[#12606A]/30 transition-transform duration-[3000ms] group-hover:rotate-180"
                    />

                    <div className="absolute inset-1 overflow-hidden rounded-full bg-slate-50 shadow-inner">

                        <img
                            src={getImageUrl(alumni)}
                            alt={alumni.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                                e.currentTarget.src =
                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        alumni.name
                                    )}&background=12606A&color=fff`;
                            }}
                        />

                    </div>

                </div>

                <div className="min-w-0">

                    <h3 className="line-clamp-1 border-b-2 border-transparent pb-1 text-xl font-black text-slate-800 transition-colors group-hover:border-[#12606A]/20 group-hover:text-[#12606A]">

                        {alumni.name}

                    </h3>

                    <span className="mt-2 inline-flex items-center gap-1 rounded bg-teal-50 px-2 py-1 text-sm font-bold text-teal-600">

                        <GraduationCap size={14} />

                        Angkatan {alumni.grad_year}

                    </span>

                </div>

            </div>

            <div className="space-y-3">

                <div className="flex items-center gap-3 text-sm text-slate-600">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">

                        <Briefcase size={16} />

                    </div>

                    <span className="line-clamp-2">

                        {alumni.role || "Alumni"}

                    </span>

                </div>

                {alumni.location_name && (

                    <div className="flex items-center gap-3 text-sm text-slate-600">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-500">

                            <MapPin size={16} />

                        </div>

                        <span className="line-clamp-1">

                            {alumni.location_name}

                        </span>

                    </div>

                )}

            </div>

            {alumni.testimony && (

                <div className="mt-5 border-t border-slate-100 pt-4">

                    <blockquote className="line-clamp-3 text-sm italic text-slate-500">

                        "{alumni.testimony}"

                    </blockquote>

                </div>

            )}

            {alumni.tags && (

                <div className="mt-5 flex flex-wrap gap-2">

                    {alumni.tags
                        .split(",")
                        .map((tag, index) => (

                            <span
                                key={index}
                                className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500"
                            >

                                {tag.trim()}

                            </span>

                        ))}

                </div>

            )}

        </div>
    );
};

export default AlumniCard;