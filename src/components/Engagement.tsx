'use client';

import { 
  Presentation, 
  Calendar, 
  Users, 
  Briefcase, 
  FolderKanban, 
  Trophy, 
  Heart, 
  FlaskConical,
  Image as ImageIcon,
  LucideIcon,
} from 'lucide-react';

import Link from 'next/link';

interface Engagement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  bgColor: string;
  hoverBgColor: string;
  link: string;
}


const engagements: Engagement[] = [
  {
    id: "events",
    title: "Events",
    description: "Connect & Network",
    icon: Calendar,
    bgColor: "bg-green-200",
    hoverBgColor: "hover:bg-green-300",
    link: "/events"
  },
  {
    id: "learnings",
    title: "Learnings",
    description: "Learn Hands-On Skills",
    icon: Presentation,
    bgColor: "bg-orange-200",
    hoverBgColor: "hover:bg-orange-300",
    link: "/learning"
  },
  {
    id: "internships",
    title: "Internships",
    description: "Gain Real-World Experience",
    icon: Briefcase,
    bgColor: "bg-blue-200",
    hoverBgColor: "hover:bg-blue-300",
    link: "/internships"
  },
  {
    id: "projects",
    title: "Projects",
    description: "Build Real-World Solutions",
    icon: FolderKanban,
    bgColor: "bg-purple-200",
    hoverBgColor: "hover:bg-purple-300",
    link: "/projects"
  },
  {
    id: "hackathon",
    title: "Hackathon",
    description: "Battle For Excellence",
    icon: Trophy,
    bgColor: "bg-yellow-200",
    hoverBgColor: "hover:bg-yellow-300",
    link: "/hackathon"
  },
  {
    id: "placement",
    title: "Placement Supports",
    description: "Get Your Dream Job",
    icon: Heart,
    bgColor: "bg-pink-200",
    hoverBgColor: "hover:bg-pink-300",
    link: "/placementsupport"
  },
  {
    id: "mentorship",
    title: "Mentorship",
    description: "Guidance From Top Mentors",
    icon: Users,
    bgColor: "bg-teal-200",
    hoverBgColor: "hover:bg-teal-300",
    link: "/mentorship"
  },
  {
    id: "research",
    title: "Research",
    description: "Innovate & Discover",
    icon: FlaskConical,
    bgColor: "bg-indigo-200",
    hoverBgColor: "hover:bg-indigo-300",
    link: "/research"
  },
  {
    id: "gallery",
    title: "Gallery",
    description: "Explore Memories & Highlights",
    icon: ImageIcon,
    bgColor: "bg-rose-200",
    hoverBgColor: "hover:bg-rose-300",
    link: "/gallery"
  }
];
export default function EngagementsSection() {
  return (
    <section className="w-full py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
            Engagements
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore our diverse range of programs and opportunities
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engagements.map((engagement) => {
            const Icon = engagement.icon;
            
            return (
                <div
                  key={engagement.id}
                  className={`
                    ${engagement.bgColor} 
                    ${engagement.hoverBgColor}
                    rounded-3xl p-6 
                    transition-all duration-300 
                    cursor-pointer 
                    hover:shadow-xl 
                    hover:scale-105 
                    hover:-translate-y-1
                    group
                  `}
                >
                <Link href={engagement.link}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-900 mb-2 group-hover:text-gray-900">
                        {engagement.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-800 group-hover:text-gray-800">
                        {engagement.description}
                      </p>
                    </div>
                    
                    <div className="ml-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="w-10 h-10 text-gray-700 dark:text-gray-800 stroke-[1.5]" />
                    </div>
                  </div>
              </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}