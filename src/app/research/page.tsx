// page.tsx
import { Microscope, BookOpen, Shield, Database } from 'lucide-react';

interface ResearchArea {
  icon: React.ReactNode;
  title: string;
  description: string;
  activeProjects: number;
}

const researchAreas: ResearchArea[] = [
  {
    icon: <Microscope className="w-6 h-6" />,
    title: 'Artificial Intelligence',
    description: 'Machine learning, neural networks, and deep learning',
    activeProjects: 12
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Blockchain & Web3',
    description: 'Distributed systems and decentralized applications',
    activeProjects: 8
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Cybersecurity',
    description: 'Network security and cryptography research',
    activeProjects: 10
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: 'Data Science',
    description: 'Big data analytics and predictive modelling',
    activeProjects: 15
  }
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-600 mb-4">
            Research
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Innovate and discover through cutting-edge research
          </p>
        </header>

        {/* Research Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {researchAreas.map((area, index) => (
            <ResearchCard key={index} area={area} />
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Join Research Program */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Join Research Program
            </h2>
            <p className="text-gray-600 mb-6">
              Collaborate with leading researchers and contribute to innovation
            </p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200">
              Apply Now
            </button>
          </div>

          {/* Submit Research Proposal */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Submit Research Proposal
            </h2>
            <p className="text-gray-600 mb-6">
              Share your research ideas and get funding support
            </p>
            <button className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-xl border-2 border-gray-300 transition-colors duration-200">
              Submit Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResearchCard({ area }: { area: ResearchArea }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
      {/* Icon */}
      <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
        {area.icon}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {area.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 flex-grow">
        {area.description}
      </p>

      {/* Active Projects */}
      <p className="text-xs text-gray-500 mb-4">
        {area.activeProjects} active projects
      </p>

      {/* Explore Button */}
      <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-2.5 px-4 rounded-lg border border-gray-200 transition-colors duration-200 text-sm">
        Explore
      </button>
    </div>
  );
}