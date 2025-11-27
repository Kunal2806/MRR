// page.tsx
'use client';

import React from 'react';
import { Mail, Phone, Calendar, MapPin, Github, Linkedin, Briefcase, GraduationCap, Target, Clock, Code, Palette, Zap } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StudentData {
  name: string;
  status: string;
  email: string;
  phone: string;
  location: string;
  birthdate: string;
  avatar: string;
  skills: Skill[];
  roleInterests: string[];
  careerGoals: string;
  availability: string;
  academic: {
    program: string;
    yearLevel: string;
    major: string;
  };
}

export default function StudentProfile() {
  const studentData: StudentData = {
    name: 'Sarah Johnson',
    status: 'Active Student',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, California',
    birthdate: '13/01/2002',
    avatar: 'SJ',
    skills: [
      { name: 'JavaScript', icon: Code },
      { name: 'React', icon: Code },
      { name: 'Python', icon: Code },
      { name: 'Node.js', icon: Zap },
      { name: 'SQL', icon: Code },
      { name: 'Git', icon: Code },
      { name: 'UI/UX Design', icon: Palette },
      { name: 'Agile', icon: Zap }
    ],
    roleInterests: [
      'Software Developer',
      'Frontend Engineer',
      'UX Engineer'
    ],
    careerGoals: 'Seeking to leverage my technical skills and passion for creating intuitive user experiences in a dynamic software development role. Interested in building scalable web applications that make a positive impact.',
    availability: 'Full-time (Summer), Part-time (During Semester)',
    academic: {
      program: 'Bachelor of Science in Computer Science',
      yearLevel: '3rd Year',
      major: 'Software Engineering'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-[#6347EB] rounded-full flex items-center justify-center text-white text-3xl font-bold shrink-0">
                {studentData.avatar}
              </div>
              
              {/* Basic Info */}
              <div className="space-y-3">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{studentData.name}</h1>
                  <p className="text-[#6347EB] font-medium">{studentData.status}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{studentData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{studentData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{studentData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{studentData.birthdate}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 pt-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-[#6347EB] hover:text-white hover:border-[#6347EB] transition-colors">
                    <Github className="w-4 h-4" />
                    GitHub
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-[#6347EB] hover:text-white hover:border-[#6347EB] transition-colors">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-[#6347EB] hover:text-white hover:border-[#6347EB] transition-colors">
                    <Briefcase className="w-4 h-4" />
                    Portfolio
                  </button>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-[#6347EB] text-white rounded hover:bg-[#593fD4] transition-colors">
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills & Expertise */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-[#6347EB]" />
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {studentData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-[#6347EB] rounded-full text-sm font-medium border border-[#6347EB]"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Interests */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#6347EB]" />
                Career Interests
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Career Goals
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {studentData.careerGoals}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Role Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {studentData.roleInterests.map((role, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-orange-500 text-white rounded text-sm font-medium"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Availability
                  </h3>
                  <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm border border-gray-300">
                    {studentData.availability}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Academic Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#6347EB]" />
                Academic Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Program</h3>
                  <p className="text-sm text-gray-900 font-medium">
                    {studentData.academic.program}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Year Level</h3>
                    <p className="text-sm text-[#6347EB] font-semibold">{studentData.academic.yearLevel}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Major</h3>
                    <p className="text-sm text-[#6347EB] font-semibold">{studentData.academic.major}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}