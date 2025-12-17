// page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Phone, Calendar, MapPin, Github, Linkedin, Briefcase, GraduationCap, Target, Clock, Code, X, Plus, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface AcademicInfo {
  title: string;
  yearLevel: string;
  major: string;
  marks: string;
  passingYear: string;
}

interface StudentData {
  name: string;
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

export default function StudentProfile() {
  const { data: session } = useSession();
  const user = session?.user;
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [studentData, setStudentData] = useState<StudentData>({
    name: '',
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
    academic: [
      {
        title: '',
        yearLevel: '1st Year',
        major: '',
        marks: '',
        passingYear: ''
      }
    ]
  });

  useEffect(() => {
    async function fetchData() {
      if(!user?.id) return;
      
      setIsLoading(true);
      try{
        const response = await fetch(`/api/userdata/${user?.id}`);
        if(!response.ok){
          throw new Error("Cannot fetch data");
        }
        const data = await response.json();
        
        setStudentData({
          name: user?.name ?? '',
          status: data.status ?? 'Active Student',
          email: user?.email ?? '',
          phone: data.phone ?? '',
          location: data.location ?? '',
          birthdate: data.birthdate ?? '',
          github: data.github ?? '',
          linkedin: data.linkedin ?? '',
          portfolio: data.portfolio ?? '',
          socialLink: data.socialLink ?? [],
          skills: data.skills ?? [],
          roleInterests: data.roleInterests ?? [],
          careerGoals: data.careerGoals ?? '',
          availability: data.availability ?? '',
          academic: data.academic && data.academic.length > 0 ? data.academic : [
            {
              title: '',
              yearLevel: '1st Year',
              major: '',
              marks: '',
              passingYear: ''
            }
          ]
        });
        console.log("Fetched data:", data);
      } catch(err){
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [user?.id, user?.name, user?.email, refresh]);
  
  // Helper function to get initials
  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const [isEditEnable, setisEditEnable] = useState(false);
  const [formData, setformData] = useState<StudentData>(studentData);
  const [newSkill, setNewSkill] = useState('');
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    setformData(studentData);
  }, [studentData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setformData(prev => ({ ...prev, [name]: value }));
  };

  const handleAcademicChange = (index: number, field: keyof AcademicInfo, value: string) => {
    setformData(prev => ({
      ...prev,
      academic: prev.academic.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addAcademicInfo = () => {
    setformData(prev => ({
      ...prev,
      academic: [...prev.academic, { 
        title: '', 
        yearLevel: '1st Year', 
        major: '', 
        marks: '',
        passingYear: ''
      }]
    }));
  };

  const removeAcademicInfo = (index: number) => {
    if (formData.academic.length > 1) {
      setformData(prev => ({
        ...prev,
        academic: prev.academic.filter((_, i) => i !== index)
      }));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setformData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setformData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addRole = () => {
    if (newRole.trim() && !formData.roleInterests.includes(newRole.trim())) {
      setformData(prev => ({
        ...prev,
        roleInterests: [...prev.roleInterests, newRole.trim()]
      }));
      setNewRole('');
    }
  };

  const removeRole = (roleToRemove: string) => {
    setformData(prev => ({
      ...prev,
      roleInterests: prev.roleInterests.filter(role => role !== roleToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try{
      const response = await fetch(`/api/userdata/${user?.id}`,{
        method: "PUT",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(formData),
      });
      
      if(!response.ok){
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        throw new Error(errorData.details || "Update failed");
      }

      const data = await response.json();
      console.log("Update successful:", data);
      
      setRefresh((pre)=>!pre);
      setisEditEnable(false);
    }
    catch(error){
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setformData(studentData);
    setisEditEnable(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6347EB] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-[#6347EB] rounded-full flex items-center justify-center text-white text-3xl font-bold shrink-0">
                {getInitials(studentData.name)}
              </div>
              
              {/* Basic Info */}
              <div className="space-y-3">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{studentData.name || 'Your Name'}</h1>
                  <p className="text-[#6347EB] font-medium">{studentData.status}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{studentData.email || 'No email'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{studentData.phone || 'No phone'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{studentData.location || 'No location'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{studentData.birthdate || 'No birthdate'}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 pt-2">
                  {studentData.github && (
                    <a href={studentData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-[#6347EB] hover:text-white hover:border-[#6347EB] transition-colors">
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {studentData.linkedin && (
                    <a href={studentData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-[#6347EB] hover:text-white hover:border-[#6347EB] transition-colors">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  {studentData.portfolio && (
                    <a href={studentData.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-[#6347EB] hover:text-white hover:border-[#6347EB] transition-colors">
                      <Briefcase className="w-4 h-4" />
                      Portfolio
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button 
              onClick={() => setisEditEnable(!isEditEnable)} 
              className="flex items-center gap-2 px-4 py-2 bg-[#6347EB] text-white rounded hover:bg-[#593fD4] transition-colors"
            >
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Edit Form Modal */}
        {isEditEnable && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Personal Information */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                      >
                        <option>Active Student</option>
                        <option>Inactive Student</option>
                        <option>Alumni</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                      />
                    </div>
                  </div>
                </section>

                {/* Social Links */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        GitHub
                      </label>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder="https://github.com/username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Portfolio
                      </label>
                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        placeholder="https://yourportfolio.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                      />
                    </div>
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        placeholder="Add a skill"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-4 py-2 bg-[#6347EB] text-white rounded-md hover:bg-[#593fD4] transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 text-[#6347EB] rounded-full text-sm font-medium border border-[#6347EB] flex items-center gap-2"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-[#6347EB] hover:text-[#593fD4]"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Career Information */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Career Goals
                      </label>
                      <textarea
                        name="careerGoals"
                        value={formData.careerGoals}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role Interests
                      </label>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRole())}
                            placeholder="Add a role interest"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                          />
                          <button
                            type="button"
                            onClick={addRole}
                            className="px-4 py-2 bg-[#6347EB] text-white rounded-md hover:bg-[#593fD4] transition-colors flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.roleInterests.map((role, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-orange-500 text-white rounded text-sm font-medium flex items-center gap-2"
                            >
                              {role}
                              <button
                                type="button"
                                onClick={() => removeRole(role)}
                                className="text-white hover:text-gray-200"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Availability
                      </label>
                      <input
                        type="text"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        placeholder="e.g., Full-time (Summer), Part-time (During Semester)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                      />
                    </div>
                  </div>
                </section>

                {/* Academic Information */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Academic Information</h3>
                    <button
                      type="button"
                      onClick={addAcademicInfo}
                      className="px-3 py-1.5 bg-[#6347EB] text-white rounded-md hover:bg-[#593fD4] transition-colors flex items-center gap-2 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Program
                    </button>
                  </div>
                  <div className="space-y-4">
                    {formData.academic.map((academicItem, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                        {formData.academic.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAcademicInfo(index)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Program
                            </label>
                            <input
                              type="text"
                              value={academicItem.title}
                              onChange={(e) => handleAcademicChange(index, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Year Level
                            </label>
                            <select
                              value={academicItem.yearLevel}
                              onChange={(e) => handleAcademicChange(index, 'yearLevel', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                            >
                              <option>1st Year</option>
                              <option>2nd Year</option>
                              <option>3rd Year</option>
                              <option>4th Year</option>
                              <option>5th Year</option>
                              <option>Graduate</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Major
                            </label>
                            <input
                              type="text"
                              value={academicItem.major}
                              onChange={(e) => handleAcademicChange(index, 'major', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Marks/GPA
                            </label>
                            <input
                              type="text"
                              value={academicItem.marks}
                              onChange={(e) => handleAcademicChange(index, 'marks', e.target.value)}
                              placeholder="e.g., 87.5%, 3.8 GPA"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Passing Year
                            </label>
                            <input
                              type="text"
                              value={academicItem.passingYear}
                              onChange={(e) => handleAcademicChange(index, 'passingYear', e.target.value)}
                              placeholder="e.g., 2025"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </form>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-[#6347EB] text-white rounded-md hover:bg-[#593fD4] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills & Expertise */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-[#6347EB]" />
                Skills & Expertise
              </h2>
              {studentData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {studentData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-[#6347EB] rounded-full text-sm font-medium border border-[#6347EB]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No skills added yet. Click Edit Profile to add skills.</p>
              )}
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
                <GraduationCap className="w-5 h-5 text-[#6347EB]" />
                Academic Information
              </h2>
              
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
                        <p className="text-sm text-[#6347EB] font-semibold">{academicItem.yearLevel}</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Major</h3>
                        <p className="text-sm text-[#6347EB] font-semibold">{academicItem.major || 'Not specified'}</p>
                      </div>
                      {academicItem.marks && (
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Marks/GPA</h3>
                          <p className="text-sm text-[#6347EB] font-bold">{academicItem.marks}</p>
                        </div>
                      )}
                      {academicItem.passingYear && (
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Passing Year</h3>
                          <p className="text-sm text-[#6347EB] font-bold">{academicItem.passingYear}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}