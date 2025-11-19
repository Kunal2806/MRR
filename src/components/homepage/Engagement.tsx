'use client';

import { 
  Presentation, 
  Calendar, 
  GraduationCap, 
  Users, 
  Briefcase, 
  FolderKanban, 
  Trophy, 
  Heart, 
  FlaskConical 
} from 'lucide-react';

interface Engagement {
  id: string;
  title: string;
  description: string;
  icon: any;
  bgColor: string;
  hoverBgColor: string;
}

const engagements: Engagement[] = [
  {
    id: 'workshop',
    title: 'Workshop',
    description: 'Learn Hands-On Skills',
    icon: Presentation,
    bgColor: 'bg-green-200',
    hoverBgColor: 'hover:bg-green-300',
  },
  {
    id: 'events',
    title: 'Events',
    description: 'Connect & Network',
    icon: Calendar,
    bgColor: 'bg-orange-200',
    hoverBgColor: 'hover:bg-orange-300',
  },
  {
    id: 'training',
    title: 'Training',
    description: 'Expert-Led Programs',
    icon: GraduationCap,
    bgColor: 'bg-blue-200',
    hoverBgColor: 'hover:bg-blue-300',
  },
  {
    id: 'mentorship',
    title: 'MentorShip',
    description: 'Guidance From Top Mentors',
    icon: Users,
    bgColor: 'bg-purple-200',
    hoverBgColor: 'hover:bg-purple-300',
  },
  {
    id: 'career',
    title: 'Career',
    description: 'Explore Diverse Careers',
    icon: Briefcase,
    bgColor: 'bg-yellow-200',
    hoverBgColor: 'hover:bg-yellow-300',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Build Real-World Solutions',
    icon: FolderKanban,
    bgColor: 'bg-pink-200',
    hoverBgColor: 'hover:bg-pink-300',
  },
  {
    id: 'hackathons',
    title: 'Hackathons',
    description: 'Battle For Excellence',
    icon: Trophy,
    bgColor: 'bg-teal-200',
    hoverBgColor: 'hover:bg-teal-300',
  },
  {
    id: 'placement',
    title: 'Placement Support',
    description: 'Get Your Dream Job',
    icon: Heart,
    bgColor: 'bg-indigo-200',
    hoverBgColor: 'hover:bg-indigo-300',
  },
  {
    id: 'research',
    title: 'Research',
    description: 'Innovate & Discover',
    icon: FlaskConical,
    bgColor: 'bg-rose-200',
    hoverBgColor: 'hover:bg-rose-300',
  },
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}