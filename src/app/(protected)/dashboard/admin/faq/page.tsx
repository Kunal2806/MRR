'use client'

import React, { useState, useEffect } from 'react';
import { Pencil, Save, X, AlertCircle, Loader2, Plus, CheckCircle } from 'lucide-react';

interface Faq {
  id: number;
  question: string;
  answer: string;
}

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ question: '', answer: '' });
  const [saving, setSaving] = useState(false);
  // const [showCreateForm, setShowCreateForm] = useState(false);
  // const [createForm, setCreateForm] = useState({ question: '', answer: '' });
  // const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Auto-hide error message after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/faq');
      
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }
      
      const data = await response.json();
      setFaqs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq: Faq) => {
    setEditingId(faq.id);
    setEditForm({
      question: faq.question,
      answer: faq.answer
    });
    setError(null);
    setSuccess(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ question: '', answer: '' });
    setError(null);
  };

  const handleSave = async (id: number) => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      const response = await fetch('/api/faq', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          question: editForm.question,
          answer: editForm.answer
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update FAQ');
      }

      await fetchFaqs();
      setEditingId(null);
      setEditForm({ question: '', answer: '' });
      setSuccess('FAQ updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update FAQ');
    } finally {
      setSaving(false);
    }
  };

  // const handleCreate = async () => {
  //   if (!createForm.question.trim() || !createForm.answer.trim()) {
  //     setError('Question and answer are required');
  //     return;
  //   }

  //   try {
  //     setCreating(true);
  //     setError(null);
  //     setSuccess(null);
      
  //     const response = await fetch('/api/faq', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         question: createForm.question,
  //         answer: createForm.answer
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to create FAQ');
  //     }

  //     await fetchFaqs();
  //     setShowCreateForm(false);
  //     setCreateForm({ question: '', answer: '' });
  //     setSuccess('FAQ created successfully!');
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Failed to create FAQ');
  //   } finally {
  //     setCreating(false);
  //   }
  // };

  // const handleCancelCreate = () => {
  //   setShowCreateForm(false);
  //   setCreateForm({ question: '', answer: '' });
  //   setError(null);
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading FAQs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Admin FAQ Management</h1>
                <p className="text-blue-100 text-sm mt-1">Manage frequently asked questions</p>
              </div>
              {/* <button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Add New FAQ
              </button> */}
            </div>
          </div>

          {/* Success Alert */}
          {success && (
            <div className="mx-6 mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 animate-slideDown">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-900">Success</h3>
                <p className="text-green-700 text-sm">{success}</p>
              </div>
              <button
                onClick={() => setSuccess(null)}
                className="text-green-600 hover:text-green-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="mx-6 mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-slideDown">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="p-6">
            {/* {showCreateForm && (
              <div className="mb-6 border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New FAQ</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      value={createForm.question}
                      onChange={(e) => setCreateForm({ ...createForm, question: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter question"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Answer
                    </label>
                    <textarea
                      value={createForm.answer}
                      onChange={(e) => setCreateForm({ ...createForm, answer: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter answer"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreate}
                      disabled={creating}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {creating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Create FAQ
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancelCreate}
                      disabled={creating}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )} */}

            {faqs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No FAQs found</p>
                <p className="text-sm mt-2">Click "Add New FAQ" to create your first question</p>
              </div>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    {editingId === faq.id ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Question
                          </label>
                          <input
                            type="text"
                            value={editForm.question}
                            onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter question"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Answer
                          </label>
                          <textarea
                            value={editForm.answer}
                            onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter answer"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(faq.id)}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {saving ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                Save
                              </>
                            )}
                          </button>
                          <button
                            onClick={handleCancel}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                                #{index + 1}
                              </span>
                              <span className="text-xs text-gray-500">ID: {faq.id}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {faq.question || 'No question'}
                            </h3>
                            <p className="text-gray-700 whitespace-pre-wrap">
                              {faq.answer || 'No answer'}
                            </p>
                          </div>
                          <button
                            onClick={() => handleEdit(faq)}
                            className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                            title="Edit FAQ"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}