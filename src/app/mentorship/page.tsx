// page.tsx
import { Users, BookOpen, Target, Award, Calendar, Video, MessageSquare, TrendingUp } from 'lucide-react';

interface MentorshipFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  image: string;
  experience: string;
  mentees: number;
  rating: number;
}

const features: MentorshipFeature[] = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'One-on-One Sessions',
    description: 'Personalized guidance from industry experts'
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Goal Setting',
    description: 'Define and achieve your career objectives'
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: 'Virtual Meetings',
    description: 'Flexible scheduling with video consultations'
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Career Growth',
    description: 'Strategic advice for professional advancement'
  }
];

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Senior AI Research Scientist',
    company: 'Google AI',
    expertise: ['Machine Learning', 'Deep Learning', 'NLP'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    experience: '15+ years',
    mentees: 45,
    rating: 4.9
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Principal Software Engineer',
    company: 'Meta',
    expertise: ['System Design', 'React', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    experience: '12+ years',
    mentees: 38,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Priya Sharma',
    title: 'Blockchain Architect',
    company: 'Ethereum Foundation',
    expertise: ['Blockchain', 'Smart Contracts', 'Web3'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    experience: '10+ years',
    mentees: 32,
    rating: 4.9
  },
  {
    id: '4',
    name: 'David Williams',
    title: 'Chief Data Scientist',
    company: 'Amazon',
    expertise: ['Data Science', 'Analytics', 'Python'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    experience: '14+ years',
    mentees: 52,
    rating: 5.0
  }
];

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Mentorship Program
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Learn from industry leaders and accelerate your career growth
          </p>
          <button className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg">
            Find Your Mentor
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Mentorship Program
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Expert Mentors
            </h2>
            <p className="text-lg text-gray-600">
              Connect with experienced professionals from top companies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard value="500+" label="Active Mentors" />
            <StatCard value="2000+" label="Mentees" />
            <StatCard value="95%" label="Success Rate" />
            <StatCard value="4.8/5" label="Avg Rating" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of professionals who transformed their careers through mentorship
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              Become a Mentee
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white hover:text-indigo-600 transition-colors duration-200">
              Become a Mentor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ feature }: { feature: MentorshipFeature }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
        {feature.icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-gray-600">
        {feature.description}
      </p>
    </div>
  );
}

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-800 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
          <Award className="w-3 h-3" />
          {mentor.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {mentor.name}
        </h3>
        <p className="text-sm font-semibold text-indigo-600 mb-1">
          {mentor.title}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          {mentor.company}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{mentor.experience}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{mentor.mentees} mentees</span>
          </div>
        </div>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.expertise.map((skill, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Button */}
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-colors duration-200">
          Connect
        </button>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-4xl md:text-5xl font-bold mb-2">{value}</div>
      <div className="text-lg opacity-90">{label}</div>
    </div>
  );
}