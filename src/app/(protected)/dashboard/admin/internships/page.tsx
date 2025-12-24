'use client'

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Save, ChevronDown, ChevronUp, Eye, Calendar, Award, Clock, Users, Code, CheckCircle, XCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  links?: string[];
}

interface Internship {
  id: string;
  title: string;
  domain: string;
  status: string;
  mode: string;
  level: string;
  stipend: string;
  certificate: string;
  deadline: string;
  bgColor: string;
  borderColor: string;
  overview: string;
  eligibility: string[];
  tasks: Task[];
  technologyStack: string[];
  submissionProcess: string[];
  timeline: string;
  criteria: { name: string; weightage: string; }[];
  interviewCall: string;
}

const initialFormState: Internship = {
  id: '',
  title: '',
  domain: '',
  status: 'open',
  mode: 'Remote',
  level: 'beginner',
  stipend: 'Unpaid',
  certificate: 'Issued on Completion',
  deadline: '',
  bgColor: '#fdf2f8',
  borderColor: '#db2777',
  overview: '',
  eligibility: [],
  tasks: [],
  technologyStack: [],
  submissionProcess: [],
  timeline: '',
  criteria: [],
  interviewCall: ''
};

export default function InternshipAdminPanel() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Internship>(initialFormState);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Form arrays
  const [eligibilityText, setEligibilityText] = useState('');
  const [technologyStackText, setTechnologyStackText] = useState('');
  const [submissionProcessText, setSubmissionProcessText] = useState('');
  
  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskLinksText, setTaskLinksText] = useState('');

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admindashboard/internships/");
      if(!response.ok) 
        throw new Error(`HTTP error! Status: ${response.status}`);
      
      const result = await response.json();
      setInternships(result.data || []);
    } catch (error) {
      console.error('Error fetching internships:', error);
      alert('Error loading internships');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditMode(false);
    setFormData(initialFormState);
    setEligibilityText('');
    setTechnologyStackText('');
    setSubmissionProcessText('');
    setTasks([]);
    setActiveTab('basic');
    setShowModal(true);
  };

  const handleEdit = (internship: Internship) => {
    setEditMode(true);
    setFormData(internship);
    setEligibilityText(internship.eligibility?.join('\n') || '');
    setTechnologyStackText(internship.technologyStack?.join(', ') || '');
    setSubmissionProcessText(internship.submissionProcess?.join('\n') || '');
    setTasks(internship.tasks || []);
    setActiveTab('basic');
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this internship?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/admindashboard/internships/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        alert('Internship deleted successfully');
        fetchInternships();
      } else {
        alert(result.error || 'Failed to delete internship');
      }
    } catch (error) {
      console.error('Error deleting internship:', error);
      alert('Error deleting internship');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTask = () => {
    setEditingTask({
      id: '',
      title: '',
      description: '',
      status: 'open',
      links: []
    });
    setTaskLinksText('');
    setShowTaskForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask({ ...task });
    setTaskLinksText(task.links?.join('\n') || '');
    setShowTaskForm(true);
  };

  const handleSaveTask = () => {
    if (!editingTask?.title || !editingTask?.description) {
      alert('Please fill in task title and description');
      return;
    }

    const taskWithLinks = {
      ...editingTask,
      links: taskLinksText.split('\n').map(l => l.trim()).filter(l => l)
    };

    if (!taskWithLinks.id) {
      // New task
      const newTask = {
        ...taskWithLinks,
        id: `TASK-${Date.now()}`
      };
      setTasks([...tasks, newTask]);
    } else {
      // Update existing task
      setTasks(tasks.map(t => t.id === taskWithLinks.id ? taskWithLinks : t));
    }
    
    setShowTaskForm(false);
    setEditingTask(null);
    setTaskLinksText('');
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Delete this task?')) {
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.domain) {
      alert('Please fill in required fields: Title and Domain');
      return;
    }

    try {
      const processedData: Internship = {
        ...formData,
        eligibility: eligibilityText.split('\n').filter(e => e.trim()),
        technologyStack: technologyStackText.split(',').map(t => t.trim()).filter(t => t),
        submissionProcess: submissionProcessText.split('\n').filter(s => s.trim()),
        tasks: tasks
      };

      setLoading(true);

      if (editMode) {
        const response = await fetch(`/api/admindashboard/internships/${processedData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(processedData),
        });

        const result = await response.json();

        if (result.success) {
          alert('Internship updated successfully');
          fetchInternships();
        } else {
          alert(result.error || 'Failed to update internship');
        }
      } else {
        // processedData.id = `INT-${Date.now()}`;
        
        const response = await fetch('/api/admindashboard/internships', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(processedData),
        });

        const result = await response.json();

        if (result.success) {
          alert('Internship created successfully');
          fetchInternships();
        } else {
          alert(result.error || 'Failed to create internship');
        }
      }

      setShowModal(false);
      setFormData(initialFormState);
    } catch (error) {
      console.error('Error saving internship:', error);
      alert('Error saving internship');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpandRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'closed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-indigo-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Internship Management
              </h1>
              <p className="text-gray-600 mt-1">Manage and track all internship programs</p>
            </div>
            <button
              onClick={handleCreate}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <Plus size={20} />
              Add Internship
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-5 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Open Positions</p>
                <p className="text-2xl font-bold text-green-600">{internships.filter(i => i.status === 'open').length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Closed</p>
                <p className="text-2xl font-bold text-red-600">{internships.filter(i => i.status === 'closed').length}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="text-red-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Programs</p>
                <p className="text-2xl font-bold text-indigo-600">{internships.length}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Users className="text-indigo-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100">
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
              <p className="mt-3 text-gray-600 font-medium">Loading internships...</p>
            </div>
          )}

          {!loading && internships.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No internships yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first internship program</p>
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-medium"
              >
                <Plus size={20} />
                Add First Internship
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700"></th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Domain</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Mode</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Level</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Deadline</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {internships.map((internship) => (
                    <React.Fragment key={internship.id}>
                      <tr className="hover:bg-indigo-50/50 transition-colors">
                        <td className="px-4 py-4">
                          <button
                            onClick={() => toggleExpandRow(internship.id)}
                            className="p-1 hover:bg-indigo-100 rounded-lg transition-colors"
                          >
                            {expandedRow === internship.id ? 
                              <ChevronUp size={18} className="text-indigo-600" /> : 
                              <ChevronDown size={18} className="text-gray-600" />
                            }
                          </button>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-semibold text-gray-800">{internship.title}</div>
                          <div className="text-xs text-gray-500 font-mono mt-1">{internship.id}</div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
                            <Code size={14} />
                            {internship.domain}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">{internship.mode}</td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                            internship.level === 'beginner' ? 'bg-green-100 text-green-700' :
                            internship.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {internship.level}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-700">
                            <Calendar size={14} className="text-gray-400" />
                            {internship.deadline || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getStatusColor(internship.status)}`}>
                            {internship.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(internship)}
                              disabled={loading}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(internship.id)}
                              disabled={loading}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedRow === internship.id && (
                        <tr className="bg-gradient-to-r from-indigo-50/30 to-purple-50/30">
                          <td colSpan={8} className="px-6 py-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Overview */}
                              <div className="bg-white rounded-xl p-5 shadow-sm border border-indigo-100">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <Eye size={18} className="text-indigo-600" />
                                  Overview
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{internship.overview || 'No overview available'}</p>
                              </div>

                              {/* Details */}
                              <div className="bg-white rounded-xl p-5 shadow-sm border border-indigo-100">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <Award size={18} className="text-indigo-600" />
                                  Program Details
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Certificate:</span>
                                    <span className="font-medium text-gray-800">{internship.certificate}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Stipend:</span>
                                    <span className="font-medium text-gray-800">{internship.stipend}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Timeline:</span>
                                    <span className="font-medium text-gray-800">{internship.timeline || 'N/A'}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Technologies */}
                              <div className="bg-white rounded-xl p-5 shadow-sm border border-indigo-100">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <Code size={18} className="text-indigo-600" />
                                  Technology Stack
                                </h4>
                                {internship.technologyStack && internship.technologyStack.length > 0 ? (
                                  <div className="flex flex-wrap gap-2">
                                    {internship.technologyStack.map((tech, i) => (
                                      <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-lg text-xs font-medium">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-gray-500 text-sm">No technologies specified</p>
                                )}
                              </div>

                              {/* Eligibility */}
                              <div className="bg-white rounded-xl p-5 shadow-sm border border-indigo-100">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <Users size={18} className="text-indigo-600" />
                                  Eligibility
                                </h4>
                                {internship.eligibility && internship.eligibility.length > 0 ? (
                                  <ul className="space-y-2">
                                    {internship.eligibility.map((e, i) => (
                                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{e}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-gray-500 text-sm">No eligibility criteria specified</p>
                                )}
                              </div>

                              {/* Tasks */}
                              <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-indigo-100">
                                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                  <Clock size={18} className="text-indigo-600" />
                                  Tasks ({internship.tasks?.length || 0})
                                </h4>
                                {internship.tasks && internship.tasks.length > 0 ? (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {internship.tasks.map((task) => (
                                      <div key={task.id} className="border-2 border-indigo-100 rounded-xl p-4 bg-gradient-to-br from-white to-indigo-50/30 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                          <h5 className="font-semibold text-gray-800 text-sm">{task.title}</h5>
                                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(task.status)}`}>
                                            {task.status}
                                          </span>
                                        </div>
                                        <p className="text-gray-600 text-xs leading-relaxed mb-2">{task.description}</p>
                                        {task.links && task.links.length > 0 && (
                                          <div className="mb-2">
                                            <p className="text-xs font-semibold text-gray-700 mb-1">Links:</p>
                                            <div className="space-y-1">
                                              {task.links.map((link, i) => (
                                                <a
                                                  key={i}
                                                  href={link}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="block text-xs text-indigo-600 hover:text-indigo-800 hover:underline truncate"
                                                >
                                                  {link}
                                                </a>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                        <div className="text-xs text-gray-500 font-mono">{task.id}</div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-gray-500 text-sm">No tasks available</p>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {editMode ? 'Edit Internship' : 'Create New Internship'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="text-gray-500 hover:text-gray-700 hover:bg-white p-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50 px-6">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeTab === 'basic'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Basic Info
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeTab === 'details'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeTab === 'tasks'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Tasks ({tasks.length})
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'basic' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="e.g., MERN Full Stack Development Internship"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Domain <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="domain"
                        value={formData.domain}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="e.g., MERN Full Stack"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mode
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                      >
                        <option value="open">Open</option>
                        <option value="close">Close</option>
                        <option value="upcomin">Upcoming</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mode
                      </label>
                      <select
                        name="mode"
                        value={formData.mode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                      >
                        <option value="Remote">Remote</option>
                        <option value="Onsite">Onsite</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Level
                      </label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Stipend
                      </label>
                      <input
                        type="text"
                        name="stipend"
                        value={formData.stipend}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="e.g., Unpaid or $1000/month"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Certificate
                      </label>
                      <input
                        type="text"
                        name="certificate"
                        value={formData.certificate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="e.g., Issued on Completion"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Deadline
                      </label>
                      <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Background Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          name="bgColor"
                          value={formData.bgColor}
                          onChange={handleInputChange}
                          className="h-12 w-16 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          name="bgColor"
                          value={formData.bgColor}
                          onChange={handleInputChange}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors font-mono text-sm"
                          placeholder="#fdf2f8"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Border Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          name="borderColor"
                          value={formData.borderColor}
                          onChange={handleInputChange}
                          className="h-12 w-16 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          name="borderColor"
                          value={formData.borderColor}
                          onChange={handleInputChange}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors font-mono text-sm"
                          placeholder="#db2777"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Overview
                    </label>
                    <textarea
                      name="overview"
                      value={formData.overview}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      placeholder="Provide a comprehensive overview of the internship program..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Eligibility Criteria (one per line)
                    </label>
                    <textarea
                      value={eligibilityText}
                      onChange={(e) => setEligibilityText(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      placeholder="Basic understanding of HTML/CSS/JavaScript&#10;Familiarity with React/Node.js is preferred&#10;College students or recent graduates"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Technology Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={technologyStackText}
                      onChange={(e) => setTechnologyStackText(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="MongoDB, Express, React, Node.js, TypeScript"
                    />
                    {technologyStackText && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {technologyStackText.split(',').map((tech, i) => tech.trim() && (
                          <span key={i} className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Submission Process (one per line)
                    </label>
                    <textarea
                      value={submissionProcessText}
                      onChange={(e) => setSubmissionProcessText(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      placeholder="Fork the repository&#10;Complete the assigned task&#10;Submit pull request with detailed documentation"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Timeline
                      </label>
                      <input
                        type="text"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="e.g., 5 days per task"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Interview Process
                      </label>
                      <input
                        type="text"
                        name="interviewCall"
                        value={formData.interviewCall}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="e.g., Shortlisted candidates will be contacted"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tasks' && (
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Manage Tasks</h3>
                    <button
                      onClick={handleAddTask}
                      className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                    >
                      <Plus size={16} />
                      Add Task
                    </button>
                  </div>

                  {tasks.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                      <Clock size={48} className="mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-600 font-medium">No tasks added yet</p>
                      <p className="text-gray-500 text-sm mt-1">Click "Add Task" to create your first task</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {tasks.map((task, index) => (
                        <div key={task.id} className="bg-gradient-to-br from-white to-indigo-50/30 border-2 border-indigo-100 rounded-xl p-5 hover:shadow-md transition-all">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 text-lg">{task.title}</h4>
                                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{task.description}</p>
                                {task.links && task.links.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs font-semibold text-gray-700 mb-1">Links:</p>
                                    <div className="space-y-1">
                                      {task.links.map((link, i) => (
                                        <a
                                          key={i}
                                          href={link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="block text-xs text-indigo-600 hover:text-indigo-800 hover:underline truncate"
                                        >
                                          {link}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                <div className="flex items-center gap-3 mt-3">
                                  <span className="text-xs font-mono text-gray-500">{task.id}</span>
                                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(task.status)}`}>
                                    {task.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-3">
                              <button
                                onClick={() => handleEditTask(task)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit Task"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Task"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Task Form Modal */}
                  {showTaskForm && editingTask && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
                      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                          <h3 className="text-xl font-bold text-gray-800">
                            {editingTask.id ? 'Edit Task' : 'Add New Task'}
                          </h3>
                          <button
                            onClick={() => {
                              setShowTaskForm(false);
                              setEditingTask(null);
                              setTaskLinksText('');
                            }}
                            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        <div className="p-6 space-y-5">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Task ID {editingTask.id && <span className="text-gray-500 text-xs">(Read-only)</span>}
                            </label>
                            <input
                              type="text"
                              value={editingTask.id}
                              disabled={!!editingTask.id}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors font-mono text-sm disabled:bg-gray-100"
                              placeholder="Auto-generated"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Task Title <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={editingTask.title}
                              onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                              placeholder="e.g., Temple Tourism Website"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              value={editingTask.description}
                              onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                              rows={4}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                              placeholder="Provide a detailed description of the task..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Status
                            </label>
                            <select
                              value={editingTask.status}
                              onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                            >
                              <option value="open">Open</option>
                              <option value="closed">Closed</option>
                              <option value="in-progress">In Progress</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Links (one per line)
                            </label>
                            <textarea
                              value={taskLinksText}
                              onChange={(e) => setTaskLinksText(e.target.value)}
                              rows={3}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                              placeholder="https://github.com/repo/task-1&#10;https://example.com/resources"
                            />
                            {taskLinksText && (
                              <p className="text-xs text-gray-500 mt-2">
                                {taskLinksText.split('\n').filter(l => l.trim()).length} link(s) will be added
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                          <button
                            onClick={() => {
                              setShowTaskForm(false);
                              setEditingTask(null);
                              setTaskLinksText('');
                            }}
                            className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveTask}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                          >
                            <Save size={18} />
                            {editingTask.id ? 'Update' : 'Add'} Task
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-white transition-colors disabled:opacity-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 font-medium"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {editMode ? 'Update Internship' : 'Create Internship'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )}