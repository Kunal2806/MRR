'use client'
import React from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function MentorshipHero() {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="text-gray-800">Welcome to </span>
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
            Ravi Rautela<span className='text-[#F97A1F]'>&apos;s</span>
          </span>
          <br />
          <span className="text-gray-800">Mentorship Hub</span>
        </h1>

        {/* Tagline */}
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Learn. Grow. Evolve.
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover your strengths, refine your skills, and build the future you dream of — together with Ravi Rautela.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Link href="#learningPath">
            <button
              // onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="group relative inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              
                  <span>Choose Your Interest</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 `}
                  />
            </button>
          </Link>


          {/* Dropdown Menu
          {isDropdownOpen && (
            <div className="mt-4 mx-auto max-w-md bg-white rounded-2xl shadow-xl p-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <button className="w-full text-left px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors text-gray-700 font-medium">
                Career Guidance
              </button>
              <button className="w-full text-left px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors text-gray-700 font-medium">
                Technical Skills
              </button>
              <button className="w-full text-left px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors text-gray-700 font-medium">
                Personal Development
              </button>
              <button className="w-full text-left px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors text-gray-700 font-medium">
                Business Strategy
              </button>
            </div>
          )} */}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}