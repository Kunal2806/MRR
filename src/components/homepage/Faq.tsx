'use client'

import React, { useState } from 'react';
import { HelpCircle, MessageSquare, ChevronDown, User, Mail, Phone, Send } from 'lucide-react';

interface FAQItemProps {
  question: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, isOpen, onClick }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-3 overflow-hidden hover:border-indigo-200 transition-colors">
      <button
        onClick={onClick}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-gray-800 font-medium text-sm md:text-base">{question}</span>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform flex-shrink-0 ml-4 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-4 text-gray-600 text-sm md:text-base border-t border-gray-100 pt-4">
          <p>Answer content would go here...</p>
        </div>
      )}
    </div>
  );
};

export default function FAQContactPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    queryType: '',
    message: '',
  });

  const faqs = [
    'What is this platform?',
    'What are the benefits for students?',
    'What is the USP (Unique Selling Point) of this portal?',
    'What kind of events are hosted on this platform?',
    'How do I register for events?',
    'Are the workshops free?',
    'What is the mentorship program?',
    'How can I access internship opportunities?',
    'What types of internships are available?',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* FAQ Section */}
          <div>
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <HelpCircle className="text-indigo-600" size={24} />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 text-center mb-3">
              Frequently Asked Questions
            </h2>
            
            <p className="text-gray-600 text-center mb-8 text-sm md:text-base">
              Find quick answers to common questions
            </p>

            <div className="space-y-0">
              {faqs.map((question, index) => (
                <FAQItem
                  key={index}
                  question={question}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <MessageSquare className="text-indigo-600" size={24} />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 text-center mb-3">
              Let's Connect
            </h2>
            
            <p className="text-gray-600 text-center mb-8 text-sm md:text-base px-4">
              Reach out for event queries, mentorship help, internship support,
              partnerships, or anything else!
            </p>

            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-200">
              {/* Full Name */}
              <div className="mb-5">
                <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                  <User size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Email Address */}
              <div className="mb-5">
                <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Mobile Number */}
              <div className="mb-5">
                <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                  <Phone size={16} />
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Type of Query */}
              <div className="mb-5">
                <label className="text-gray-700 text-sm font-medium mb-2 block">
                  Type of Query
                </label>
                <select
                  name="queryType"
                  value={formData.queryType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm appearance-none bg-white"
                >
                  <option value="">Select query type</option>
                  <option value="event">Event Query</option>
                  <option value="mentorship">Mentorship Help</option>
                  <option value="internship">Internship Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="text-gray-700 text-sm font-medium mb-2 block">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
              >
                Send Message
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}