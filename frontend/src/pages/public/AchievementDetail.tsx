// src/pages/public/AchievementDetail.tsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import HeroCarousel from "@/components/HeroCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

import {
  ArrowLeft,
  Calendar,
  Trophy,
  User,
  Tag,
  Medal,
  MapPin,
  Building2,
  Award,
  ExternalLink,
} from "lucide-react";

import api from "@/lib/api";
import { AchievementData } from "@/services/Achievement";

interface MajorData {
  id: number;
  slug: string;
  name: string;
}

const AchievementDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  const [achievement, setAchievement] =
    useState<AchievementData | null>(null);

  const [majors, setMajors] = useState<MajorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/majors")
      .then((res) => {
        const data = res.data.data ?? res.data;
        setMajors(Array.isArray(data) ? data : []);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchAchievement = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/achievements/${id}`);

        const data = res.data.data ?? res.data;

        if (!data || Array.isArray(data)) {
          setAchievement(null);
          return;
        }

        if (!data.is_active) {
          setAchievement(null);
          return;
        }

        setAchievement(data);
      } catch (err) {
        console.error(err);
        setAchievement(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievement();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          Loading...
        </div>
      </MainLayout>
    );
  }

  if (!achievement) {
    return (
      <MainLayout>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6">
          <h2 className="text-3xl font-bold">
            Achievement not found
          </h2>

          <Link
            to="/achievement"
            className="rounded-xl bg-primary px-6 py-3 text-white"
          >
            Back
          </Link>
        </div>
      </MainLayout>
    );
  }

  const majorName =
    majors.find(
      (m) => m.slug === achievement.category
    )?.name ?? achievement.category;

  return (
    <MainLayout>
      <HeroCarousel
        category="achievement"
        lang={language}
        height="h-[55vh]"
      />

      <section className="bg-background py-20">
        <div className="container mx-auto max-w-7xl px-6">

          <ScrollReveal>

            <Link
              to="/achievement"
              className="mb-10 inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft size={18} />
              Back to Achievement
            </Link>

          </ScrollReveal>

          <div className="grid gap-16 lg:grid-cols-2">

            {/* IMAGE */}

            <ScrollReveal direction="left">

              <img
                src={achievement.image_url}
                alt={achievement.title}
                className="w-full rounded-3xl shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/800x800?text=Achievement";
                }}
              />

            </ScrollReveal>

            {/* CONTENT */}

            <ScrollReveal>

              <div className="space-y-8">

                <div>

                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary">

                    <Tag size={16} />

                    {majorName}

                  </span>

                  <h1 className="mt-6 text-4xl font-black">

                    {achievement.title}

                  </h1>

                  <p className="mt-2 text-xl font-semibold text-primary">

                    {achievement.holder_name}

                  </p>

                </div>

                {/* INFORMATION */}

                <div className="grid gap-4 md:grid-cols-2">

                  <InfoCard
                    icon={<Award size={22} />}
                    title="Competition"
                    value={achievement.competition}
                  />

                  <InfoCard
                    icon={<Trophy size={22} />}
                    title="Level"
                    value={achievement.level}
                  />

                  <InfoCard
                    icon={<Medal size={22} />}
                    title="Medal"
                    value={achievement.medal}
                  />

                  <InfoCard
                    icon={<Calendar size={22} />}
                    title="Achievement Date"
                    value={
                      achievement.achievement_date
                        ? new Date(
                            achievement.achievement_date
                          ).toLocaleDateString("id-ID")
                        : "-"
                    }
                  />

                  <InfoCard
                    icon={<Building2 size={22} />}
                    title="Organizer"
                    value={achievement.organizer}
                  />

                  <InfoCard
                    icon={<MapPin size={22} />}
                    title="Location"
                    value={achievement.location}
                  />

                  <InfoCard
                    icon={<User size={22} />}
                    title="Student"
                    value={achievement.holder_name}
                  />

                  <InfoCard
                    icon={<Calendar size={22} />}
                    title="Year"
                    value={String(achievement.year)}
                  />

                </div>

                {/* DESCRIPTION */}

                <div>

                  <h2 className="mb-3 text-2xl font-bold">
                    Description
                  </h2>

                  <p className="leading-8 text-slate-600">

                    {achievement.description}

                  </p>

                </div>

                {/* CONTENT */}

                {achievement.content && (

                  <div>

                    <h2 className="mb-3 text-2xl font-bold">

                      Detail

                    </h2>

                    <div className="prose max-w-none whitespace-pre-line">

                      {achievement.content}

                    </div>

                  </div>

                )}

                {/* BUTTONS */}

                <div className="flex flex-wrap gap-4">

                  {achievement.certificate_url && (

                    <a
                      href={achievement.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
                    >
                      <ExternalLink size={18} />

                      View Certificate
                    </a>

                  )}

                  {achievement.news_id && (

                    <Link
                      to={`/more-news/${achievement.news_id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white"
                    >
                      <ArrowLeft size={18} />

                      Related News
                    </Link>

                  )}

                </div>

              </div>

            </ScrollReveal>

          </div>

        </div>
      </section>
    </MainLayout>
  );
};

interface CardProps {
  icon: React.ReactNode;
  title: string;
  value?: string;
}

const InfoCard = ({
  icon,
  title,
  value,
}: CardProps) => (
  <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5">

    <div className="text-primary">

      {icon}

    </div>

    <div>

      <p className="text-sm text-slate-500">

        {title}

      </p>

      <p className="font-semibold">

        {value || "-"}

      </p>

    </div>

  </div>
);

export default AchievementDetail;