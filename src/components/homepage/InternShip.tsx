"use client"
import React, { useState } from 'react';
import {Calendar, Building2, Search, Home, Briefcase, Settings, Monitor, BarChart3, TrendingUp, ClipboardList, GraduationCap, ChevronRight } from 'lucide-react';

interface InternshipCardProps {
  title: string;
  description: string;
  duration: string;
  bgColor: string;
  borderColor: string;
}

interface CategoryButtonProps {
  icon: React.ReactNode;
  label: string;
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

const CategoryButton: React.FC<CategoryButtonProps> = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-sm font-medium text-gray-700">
    {icon}
    <span>{label}</span>
    <ChevronRight className="w-4 h-4 ml-1 text-gray-400" />
  </button>
);

export function OpportunitiesSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');

  const categories = [
    { icon: <Home className="w-4 h-4" />, label: 'Remote' },
    { icon: <Briefcase className="w-4 h-4" />, label: 'MNC' },
    { icon: <Settings className="w-4 h-4" />, label: 'Engineering' },
    { icon: <Monitor className="w-4 h-4" />, label: 'Software & IT' },
    { icon: <BarChart3 className="w-4 h-4" />, label: 'Data Science' },
    { icon: <TrendingUp className="w-4 h-4" />, label: 'Marketing' },
  ];

  const bottomCategories = [
    { icon: <ClipboardList className="w-4 h-4" />, label: 'Project Mgmt' },
    { icon: <GraduationCap className="w-4 h-4" />, label: 'Internship' },
  ];

  return (
    <div className=" p-20 bg-gray- 50 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-6xl font-black text-center text-gray-900 mb-12">
          Opportunities
        </h1>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter skills / designations / companies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
              />
            </div>

            {/* Experience Dropdown */}
            <div className="md:w-56">
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 bg-white appearance-none cursor-pointer"
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            {/* Location Input */}
            <div className="md:w-56">
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
              />
            </div>

            {/* Search Button */}
            <button className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-sm">
              Search
            </button>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            {categories.map((category, index) => (
              <CategoryButton
                key={index}
                icon={category.icon}
                label={category.label}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {bottomCategories.map((category, index) => (
              <CategoryButton
                key={index}
                icon={category.icon}
                label={category.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <OpportunitiesSearch/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship, index) => (
            <InternshipCard key={index} {...internship} />
          ))}
        </div>
      </div>
    </div>
  );
}
