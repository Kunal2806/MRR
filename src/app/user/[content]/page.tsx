'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Phone, Calendar, MapPin, Github, Linkedin, Briefcase, GraduationCap, Target, Clock, Code, ArrowLeft } from 'lucide-react';

interface AcademicInfo {
  title: string;
  yearLevel: string;
  major: string;
  marks: string;
  passingYear: string;
}

interface StudentData {
  status: string;
  email: string;
  phone: string;
  location: string;
  birthdate: string;
  github: string;
  linkedin: string;
  portfolio: string;
  socialLink: {
    name: string;
    link: string;
  }[];
  skills: string[];
  roleInterests: string[];
  careerGoals: string;
  availability: string;
  academic: AcademicInfo[];
}

export default function AdminUserView() {
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<StudentData>({
    status: 'Active Student',
    email: '',
    phone: '',
    location: '',
    birthdate: '',
    github: '',
    linkedin: '',
    portfolio: '',
    socialLink: [],
    skills: [],
    roleInterests: [],
    careerGoals: '',
    availability: '',
    academic: []
  });

  // Extract userId from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const segments = path.split('/').filter(Boolean);
      const id = segments[segments.length - 1];
      
      console.log('Extracted userId from URL:', id);
      console.log('Full path:', path);
      
      if (id && id !== 'admin-user-view') {
        setUserId(id);
      } else {
        setError('No user ID found in URL');
        setIsLoading(false);
      }
    }
  }, []);

  // Fetch user data
  useEffect(() => {
    async function fetchUserData() {
      if (!userId) {
        console.log('No userId yet, skipping fetch');
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const apiUrl = `/api/userdashboard/profile/${userId}`;
        console.log('Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for authentication
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('User not found. Please check if the user ID is correct.');
          } else if (response.status === 401) {
            throw new Error('Unauthorized. Please log in as an administrator.');
          } else if (response.status === 403) {
            throw new Error('Access denied. Administrator privileges required.');
          }
          
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to fetch user data (Status: ${response.status})`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        if (!data) {
          throw new Error('No data received from server');
        }
        
        // Set the student data with proper fallbacks
        setStudentData({
          status: data.status || 'Active Student',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          birthdate: data.birthdate || '',
          github: data.github || '',
          linkedin: data.linkedin || '',
          portfolio: data.portfolio || '',
          socialLink: Array.isArray(data.socialLink) ? data.socialLink : [],
          skills: Array.isArray(data.skills) ? data.skills : [],
          roleInterests: Array.isArray(data.roleInterests) ? data.roleInterests : [],
          careerGoals: data.careerGoals || '',
          availability: data.availability || '',
          academic: Array.isArray(data.academic) ? data.academic : []
        });
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load user data');
        setIsLoading(false);
      }
    }
    
    fetchUserData();
  }, [userId]);
  
  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user profile...</p>
          {userId && <p className="text-sm text-gray-500 mt-2">User ID: {userId}</p>}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">✕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-2">{error}</p>
          {userId && (
            <p className="text-sm text-gray-500 mb-6 font-mono bg-gray-100 p-2 rounded break-all">
              User ID: {userId}
            </p>
          )}
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
            <button
              onClick={handleBack}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Users</span>
        </button>

        {/* Admin View Badge */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Admin View:</span> You are viewing this user's profile as an administrator
          </p>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex gap-6 flex-wrap">
              {/* Avatar */}
              
              
              {/* Basic Info */}
              <div className="space-y-3 flex-1 min-w-0">
                <div>
                  <p className="text-blue-600 font-medium">{studentData.status}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  {studentData.email && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4 shrink-0" />
                      <span className="truncate">{studentData.email}</span>
                    </div>
                  )}
                  {studentData.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4 shrink-0" />
                      <span>{studentData.phone}</span>
                    </div>
                  )}
                  {studentData.location && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>{studentData.location}</span>
                    </div>
                  )}
                  {studentData.birthdate && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>{studentData.birthdate}</span>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                {(studentData.github || studentData.linkedin || studentData.portfolio) && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {studentData.github && (
                      <a 
                        href={studentData.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                    {studentData.linkedin && (
                      <a 
                        href={studentData.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                    )}
                    {studentData.portfolio && (
                      <a 
                        href={studentData.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                      >
                        <Briefcase className="w-4 h-4" />
                        Portfolio
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* User ID Badge */}
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">User ID</p>
              <p className="text-sm font-mono text-gray-700 bg-gray-100 px-3 py-1 rounded break-all max-w-xs">
                {userId}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills & Expertise */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                Skills & Expertise
              </h2>
              {studentData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {studentData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-blue-600 rounded-full text-sm font-medium border border-blue-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No skills added yet.</p>
              )}
            </div>

            {/* Career Interests */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Career Interests
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Career Goals
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {studentData.careerGoals || 'No career goals added yet.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Role Interests</h3>
                  {studentData.roleInterests.length > 0 ? (
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
                  ) : (
                    <p className="text-gray-500 text-sm">No role interests added yet.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Availability
                  </h3>
                  <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm border border-gray-300">
                    {studentData.availability || 'Not specified'}
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
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Academic Information
              </h2>
              
              {studentData.academic.length > 0 ? (
                <div className="space-y-4">
                  {studentData.academic.map((academicItem, index) => (
                    <div key={index} className={index > 0 ? "pt-4 border-t" : ""}>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Program</h3>
                        <p className="text-sm text-gray-900 font-medium">
                          {academicItem.title || 'Not specified'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2 mt-2 border-t">
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Year Level</h3>
                          <p className="text-sm text-blue-600 font-semibold">{academicItem.yearLevel}</p>
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Major</h3>
                          <p className="text-sm text-blue-600 font-semibold">{academicItem.major || 'Not specified'}</p>
                        </div>
                        {academicItem.marks && (
                          <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Marks/GPA</h3>
                            <p className="text-sm text-blue-600 font-bold">{academicItem.marks}</p>
                          </div>
                        )}
                        {academicItem.passingYear && (
                          <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Passing Year</h3>
                            <p className="text-sm text-blue-600 font-bold">{academicItem.passingYear}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No academic information added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}