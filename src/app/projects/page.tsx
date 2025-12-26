// page.tsx
import { Github, ExternalLink, Star, GitFork, Calendar, User } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  stars: number;
  forks: number;
  status: 'Completed' | 'In Progress' | 'Planning';
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Chat Application',
    description: 'Real-time chat application with AI-powered message suggestions and sentiment analysis. Built with WebSockets for instant messaging.',
    image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&h=600&fit=crop',
    author: 'Sarah Chen',
    date: 'Dec 2024',
    stars: 234,
    forks: 45,
    status: 'Completed',
    tags: ['React', 'Node.js', 'OpenAI', 'WebSocket'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: '2',
    title: 'E-Commerce Dashboard',
    description: 'Comprehensive analytics dashboard for e-commerce businesses with real-time data visualization and inventory management.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    author: 'Mike Johnson',
    date: 'Nov 2024',
    stars: 187,
    forks: 32,
    status: 'In Progress',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'],
    githubUrl: 'https://github.com'
  },
  {
    id: '3',
    title: 'Fitness Tracking App',
    description: 'Mobile-first fitness tracker with workout plans, progress tracking, and social features for sharing achievements.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
    author: 'Emily Davis',
    date: 'Jan 2025',
    stars: 156,
    forks: 28,
    status: 'Completed',
    tags: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: '4',
    title: 'Blockchain Voting System',
    description: 'Decentralized voting platform ensuring transparency and security using blockchain technology and smart contracts.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    author: 'Alex Kumar',
    date: 'Oct 2024',
    stars: 312,
    forks: 67,
    status: 'Completed',
    tags: ['Solidity', 'Web3.js', 'Ethereum', 'React'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: '5',
    title: 'Smart Home Automation',
    description: 'IoT platform for controlling and monitoring smart home devices with voice commands and automated routines.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop',
    author: 'Lisa Wang',
    date: 'Planning',
    stars: 89,
    forks: 15,
    status: 'Planning',
    tags: ['IoT', 'Python', 'MQTT', 'React'],
    githubUrl: 'https://github.com'
  },
  {
    id: '6',
    title: 'Social Media Analytics Tool',
    description: 'Comprehensive analytics tool for tracking social media metrics across multiple platforms with AI-powered insights.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    author: 'David Brown',
    date: 'Dec 2024',
    stars: 203,
    forks: 41,
    status: 'In Progress',
    tags: ['Vue.js', 'Python', 'MongoDB', 'D3.js'],
    githubUrl: 'https://github.com'
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center text-white mb-16 pt-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            💻 Featured Projects
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Explore innovative solutions built by talented developers
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500 text-white';
      case 'In Progress':
        return 'bg-blue-500 text-white';
      case 'Planning':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-3 hover:shadow-3xl group">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-1">
          {project.title}
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3 min-h-[4.5rem]">
          {project.description}
        </p>

        {/* Author & Date */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>{project.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{project.date}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-gray-600">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            <span className="text-sm">{project.stars}</span>
          </div>
          <div className="flex items-center">
            <GitFork className="w-4 h-4 mr-1 text-gray-500" />
            <span className="text-sm">{project.forks}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}