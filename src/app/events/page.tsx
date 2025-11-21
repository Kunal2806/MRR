"use client"
import React, { useState } from 'react';
import Image from "next/image"
import { Search, MapPin } from 'lucide-react';

interface Event {
  id: string;
  date: string;
  month: string;
  time: string;
  title: string;
  organizer: string;
  location: string;
  tags: string[];
  attendees: number;
  badge: string;
  image: string;
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const events: Event[] = [
    {
      id: '1',
      date: '13 & 14',
      month: 'Nov 25',
      time: '9:00 AM Onwards',
      title: 'PRAYUKTI - TECH FEST 2025',
      organizer: 'Graphic Era Hill University',
      location: 'Graphic Era Hill University, Bhimtal Campus',
      tags: ['prayukti 2025', 'engineering', 'competition', '+3'],
      attendees: 146,
      badge: 'Graphic Era Fest',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">All Events</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'past'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Past
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events, location, or organizer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>All Status</option>
            <option>Open</option>
            <option>Closed</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Date</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>

        {/* Event Card */}
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex">
              {/* Date Section */}
              <div className="flex flex-col items-center justify-center bg-gray-50 px-8 py-6 border-r border-gray-200">
                <div className="text-3xl font-bold text-gray-900">{event.date}</div>
                <div className="text-sm text-gray-600 mt-1">{event.month}</div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6">
                {/* Badge */}
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full mb-3">
                  {event.badge}
                </span>

                {/* Time */}
                <div className="text-sm text-gray-600 mb-2">{event.time}</div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h2>

                {/* Organizer */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🎓</span>
                  </div>
                  <span className="text-sm text-gray-700">By {event.organizer}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{event.location}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Attendees */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white"></div>
                  </div>
                  <span className="text-sm text-gray-600">+{event.attendees}</span>
                </div>
              </div>

              {/* Image Section */}
              <div className="w-48 relative">
                {/* <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                /> */}
                <Image
                  src={event.image}
                  alt={event.title}
                  width={192}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}