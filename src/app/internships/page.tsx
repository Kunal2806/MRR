// import React from 'react'

// const internships = () => {
//   return (
//     <div>
//         <InternshipOpportunities/>
//     </div>
//   )
// }

// export default internships
"use client"
import React, { useState } from 'react';
import { Search, Home, Briefcase, Settings, Monitor, BarChart3, TrendingUp, ClipboardList, GraduationCap, ChevronRight } from 'lucide-react';
import InternshipOpportunities from '@/components/carrer/InternshipOpportunities'

interface CategoryButtonProps {
  icon: React.ReactNode;
  label: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-sm font-medium text-gray-700">
    {icon}
    <span>{label}</span>
    <ChevronRight className="w-4 h-4 ml-1 text-gray-400" />
  </button>
);

export default function OpportunitiesSearch() {
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
    <div>
    <div className="p-10 px-4">
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
        {/* <div className="bg-white rounded-2xl shadow-md p-8">
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
        </div> */}
      </div>
    </div> 
    <InternshipOpportunities isHomePage= {false}/>
    </div>
  );
}
