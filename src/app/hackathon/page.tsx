// page.tsx
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';

interface Hackathon {
  id: string;
  title: string;
  date: string;
  location: string;
  participants: string;
  prize: string;
  status: 'Open' | 'Soon' | 'Closed';
  tags: string[];
  description: string;
}

const hackathons: Hackathon[] = [
  {
    id: '1',
    title: 'AI Innovation Summit 2025',
    date: 'January 15-17, 2025',
    location: 'San Francisco, CA',
    participants: '500+',
    prize: '$50,000',
    status: 'Open',
    tags: ['AI/ML', 'Web3', 'Blockchain'],
    description: 'Build the future of AI and blockchain technology'
  },
  {
    id: '2',
    title: 'GreenTech Challenge',
    date: 'February 5-7, 2025',
    location: 'Virtual Event',
    participants: '1000+',
    prize: '$30,000',
    status: 'Open',
    tags: ['Climate Tech', 'IoT', 'Sustainability'],
    description: 'Create solutions for a sustainable future'
  },
  {
    id: '3',
    title: 'HealthTech Revolution',
    date: 'March 12-14, 2025',
    location: 'Boston, MA',
    participants: '300+',
    prize: '$40,000',
    status: 'Soon',
    tags: ['Healthcare', 'AI/ML', 'Telemedicine'],
    description: 'Innovate healthcare with cutting-edge technology'
  }
];

export default function HackathonsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center text-white mb-16 pt-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            🚀 Upcoming Hackathons
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Join the innovation revolution and build something amazing
          </p>
        </header>

        {/* Hackathons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {hackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-500/30 text-white';
      case 'Soon':
        return 'bg-yellow-500/30 text-white';
      case 'Closed':
        return 'bg-red-500/30 text-white';
      default:
        return 'bg-gray-500/30 text-white';
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-3 hover:shadow-3xl cursor-pointer">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-8 relative">
        <span
          className={`absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-bold ${getStatusColor(
            hackathon.status
          )}`}
        >
          {hackathon.status}
        </span>
        <h2 className="text-2xl font-bold mb-2">{hackathon.title}</h2>
        <div className="flex items-center text-sm opacity-90">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{hackathon.date}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <p className="text-gray-600 mb-6">{hackathon.description}</p>

        {/* Info Rows */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center text-gray-700">
            <MapPin className="w-5 h-5 mr-3 text-purple-600" />
            <span>{hackathon.location}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Users className="w-5 h-5 mr-3 text-purple-600" />
            <span>{hackathon.participants} Participants</span>
          </div>
          <div className="flex items-center text-gray-700">
            <DollarSign className="w-5 h-5 mr-3 text-purple-600" />
            <span>{hackathon.prize} Prize Pool</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {hackathon.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
          {hackathon.status === 'Soon' ? 'Notify Me' : 'Register Now'}
        </button>
      </div>
    </div>
  );
}