import React from 'react';
import { MapPin, Clock, ArrowLeft, CheckCircle, Sparkles, Target } from 'lucide-react';
import Link from 'next/link';

export default function JobPosting() {
  const skills = [
    'HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Git'
  ];

  const responsibilities = [
    'Develop frontend and backend components',
    'Integrate APIs and databases',
    'Deploy and maintain applications'
  ];

  const perks = [
    'Certificate of Completion',
    'Real Project Exposure',
    'Mentorship Support'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors text-sm">
          <ArrowLeft size={16} />
          <Link href="/internships">
            <span>Back to Careers</span>
          </Link>
        </button>

        {/* Header Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="bg-indigo-600 rounded-lg p-3 flex-shrink-0">
                <svg 
                  className="w-7 h-7 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
                  />
                </svg>
              </div>

              {/* Title and Meta */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  Full Stack Development Intern
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    <span>Remote / Hybrid</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} />
                    <span>3-6 Months</span>
                  </div>
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    #Development
                  </span>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex-shrink-0 text-sm">
              Apply Now
            </button>
          </div>
        </div>

        {/* About the Role */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">About the Role</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Build and maintain web applications using modern web technologies (MERN Stack). 
            Work with real projects, mentors, and a collaborative tech team.
          </p>
        </div>

        {/* Skills Required */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <svg 
              className="w-5 h-5 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
              />
            </svg>
            <h2 className="text-lg font-bold text-gray-900">Skills Required</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium border border-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Target size={20} className="text-gray-700" />
            <h2 className="text-lg font-bold text-gray-900">Responsibilities</h2>
          </div>
          
          <ul className="space-y-3">
            {responsibilities.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Perks & Benefits */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-gray-700" />
            <h2 className="text-lg font-bold text-gray-900">Perks & Benefits</h2>
          </div>
          
          <ul className="space-y-3">
            {perks.map((perk, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                <CheckCircle size={18} className="text-green-500" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
