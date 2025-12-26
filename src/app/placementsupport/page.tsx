// page.tsx
import { FileText, Video, TrendingUp, Briefcase, Award } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

const services: Service[] = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Resume Building',
    description: 'Create ATS-friendly resumes that stand out'
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: 'Interview Preparation',
    description: 'Mock interviews and feedback sessions'
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Career Counseling',
    description: 'One-on-one guidance for career planning'
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: 'Job Matching',
    description: 'Connect with companies hiring in your field'
  }
];

const stats: Stat[] = [
  { value: '250+', label: 'Placements' },
  { value: '95%', label: 'Success Rate' },
  { value: '$85K', label: 'Avg Package' },
  { value: '100+', label: 'Partners' }
];

export default function PlacementSupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-600 mb-4">
            Placement Support
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Get your dream job with comprehensive placement assistance
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* Placement Partners Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
          {/* Partners Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Award className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Our Placement Partners
              </h2>
            </div>
            <p className="text-gray-600">
              We've partnered with 100+ companies across various industries
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          {/* CTA Button */}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
            Apply for Placement Support
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Icon */}
      <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
        {service.icon}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {service.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">
        {stat.value}
      </div>
      <div className="text-sm text-gray-600">
        {stat.label}
      </div>
    </div>
  );
}