// page.tsx
'use client';

import React, { useState } from 'react';
import { Mail, Phone, Calendar, MapPin, Github, Linkedin, Briefcase, GraduationCap, Target, Clock, Code, Palette, Zap, X, Plus, Trash2 } from 'lucide-react';

interface Skill {
  name: string;
}

interface AcademicInfo {
  program: string;
  yearLevel: string;
  major: string;
  marks: string;
}

interface StudentData {
  name: string;
  status: string;
  email: string;
  phone: string;
  location: string;
  birthdate: string;
  avatar: string;
  github: string;
  linkedin: string;
  portfolio: string;
  skills: Skill[];
  roleInterests: string[];
  careerGoals: string;
  availability: string;
  academic: AcademicInfo[];
}

export default function StudentProfile() {
  const [studentData, setStudentData] = useState<StudentData>({
    name: 'Sarah Johnson',
    status: 'Active Student',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, California',
    birthdate: '13/01/2002',
    avatar: 'SJ',
    github: 'https://github.com/sarahjohnson',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    portfolio: 'https://sarahjohnson.dev',
    skills: [
      { name: 'JavaScript',},
      { name: 'React',},
      { name: 'Python', },
      { name: 'Node.js', },
      { name: 'SQL', },
      { name: 'Git',},
      { name: 'UI/UX Design',},
      { name: 'Agile',}
    ],
    roleInterests: [
      'Software Developer',
      'Frontend Engineer',
      'UX Engineer'
    ],
    careerGoals: 'Seeking to leverage my technical skills and passion for creating intuitive user experiences in a dynamic software development role. Interested in building scalable web applications that make a positive impact.',
    availability: 'Full-time (Summer), Part-time (During Semester)',
    academic: [
      {
        program: 'Bachelor of Science in Computer Science',
        yearLevel: '3rd Year',
        major: 'Software Engineering',
        marks: '87.5%'
      }
    ]
  });

  const [isEditEnable, setisEditEnable] = useState(false);
  const [formData, setformData] = useState<StudentData>(studentData);
  const [newSkill, setNewSkill] = useState('');
  const [newRole, setNewRole] = useState('');

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
      academic: [...prev.academic, { program: '', yearLevel: '1st Year', major: '', marks: '' }]
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
    if (newSkill.trim() && !formData.skills.some(s => s.name === newSkill.trim())) {
      setformData(prev => ({
        ...prev,
        skills: [...prev.skills, { name: newSkill.trim() }]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setformData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.name !== skillToRemove)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentData(formData);
    setisEditEnable(false);
  };

  const handleCancel = () => {
    setformData(studentData);
    setisEditEnable(false);
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
            <button onClick={()=>{isEditEnable? setisEditEnable(false):setisEditEnable(true)}} className="flex items-center gap-2 px-4 py-2 bg-[#6347EB] text-white rounded hover:bg-[#593fD4] transition-colors">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
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
                          {skill.name}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill.name)}
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
                              Program *
                            </label>
                            <input
                              type="text"
                              value={academicItem.program}
                              onChange={(e) => handleAcademicChange(index, 'program', e.target.value)}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Year Level *
                            </label>
                            <select
                              value={academicItem.yearLevel}
                              onChange={(e) => handleAcademicChange(index, 'yearLevel', e.target.value)}
                              required
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
                              Major *
                            </label>
                            <input
                              type="text"
                              value={academicItem.major}
                              onChange={(e) => handleAcademicChange(index, 'major', e.target.value)}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6347EB]"
                            />
                          </div>

                          <div className="md:col-span-2">
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
                {studentData.academic.map((academicItem, index) => (
                  <div key={index} className={index > 0 ? "pt-4 border-t" : ""}>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Program</h3>
                      <p className="text-sm text-gray-900 font-medium">
                        {academicItem.program}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 mt-2 border-t">
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Year Level</h3>
                        <p className="text-sm text-[#6347EB] font-semibold">{academicItem.yearLevel}</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Major</h3>
                        <p className="text-sm text-[#6347EB] font-semibold">{academicItem.major}</p>
                      </div>
                      {academicItem.marks && (
                        <div className="col-span-2">
                          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Marks/GPA</h3>
                          <p className="text-sm text-[#6347EB] font-bold">{academicItem.marks}</p>
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