import React from 'react';
import { Calendar, Building2 } from 'lucide-react';

interface InternshipCardProps {
  title: string;
  description: string;
  duration: string;
  bgColor: string;
  borderColor: string;
}

const InternshipCard: React.FC<InternshipCardProps> = ({
  title,
  description,
  duration,
  bgColor,
  borderColor,
}) => {
  return (
    <div className={`${bgColor} ${borderColor} border-2 rounded-2xl p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow`}>
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          <Building2 size={12} />
          Ravi Rautela Mentorship Hub
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 flex-grow">
        {description}
      </p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar size={16} />
          <span>{duration}</span>
        </div>
        <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Open
        </span>
      </div>
      
      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
        I am Interested
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default function InternshipOpportunities() {
  const internships = [
    {
      title: 'AI / ML Intern',
      description: 'Work on real-world AI & ML projects, model training, and data operations. Remote / Hybrid opportunity.',
      duration: '3-6 Months',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
    },
    {
      title: 'Full Stack Intern',
      description: 'Build and maintain MERN-based applications with real mentors. Remote / Hybrid opportunity.',
      duration: '3-6 Months',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-100',
    },
    {
      title: 'Google Workspace Intern',
      description: 'Assist in managing and automating Google Workspace tasks. Remote position.',
      duration: '3 Months',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Internship Opportunities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gain hands-on experience with real-world projects and expert mentorship
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship, index) => (
            <InternshipCard key={index} {...internship} />
          ))}
        </div>
      </div>
    </div>
  );
}