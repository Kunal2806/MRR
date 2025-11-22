// import React from 'react';
// import { internships } from '@/data/career';
// import { MapPin, Clock, ArrowLeft, CheckCircle, Sparkles, Target } from 'lucide-react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';

// export default function JobPosting() {
//   // const skills = [
//   //   'HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Git'
//   // ];

//   // const responsibilities = [
//   //   'Develop frontend and backend components',
//   //   'Integrate APIs and databases',
//   //   'Deploy and maintain applications'
//   // ];

//   // const perks = [
//   //   'Certificate of Completion',
//   //   'Real Project Exposure',
//   //   'Mentorship Support'
//   // ];
//   const params = useParams();
//   const internshipId = params.id;
//   return (
//     <>
//       {
//         internships.map((internship,index)=>(
          
//         ))
        
//       }
//     </>
//   );
// }
"use client"
import React from 'react';
import { internships } from '@/data/career';
import { Clock, ArrowLeft, CheckCircle, Sparkles, Target, Code, Award, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function JobPosting() {
  const params = useParams();
  const internshipId = params.content as string;
  console.log(internshipId, params)
  // Find the specific internship
  const internship = internships.find(internship => internship.id === internshipId);
  // Handle case where internship is not found
  if (!internship) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Internship Not Found</h1>
          <Link 
            href="/internships" 
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Internships
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      open: { text: "Open", bg: "bg-green-100", color: "text-green-700" },
      close: { text: "Closed", bg: "bg-red-100", color: "text-red-700" },
      upcoming: { text: "Upcoming", bg: "bg-yellow-100", color: "text-yellow-700" }
    };
    const badge = badges[status as keyof typeof badges] || badges.open;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.color}`}>
        <CheckCircle className="w-4 h-4" />
        {badge.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/internships" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Internships
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{internship.domain}</h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{internship.timeline}</span>
                </div>
                {getStatusBadge(internship.status)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Section */}
        <div 
          className="rounded-lg shadow-md p-6 mb-8 border-l-4" 
          style={{ 
            backgroundColor: internship.bgColor,
            borderColor: internship.borderColor 
          }}
        >
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-6 h-6 mt-1" style={{ color: internship.borderColor }} />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Overview</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{internship.overview}</p>
            </div>
          </div>
          
          {internship.interviewCall && (
            <div className="mt-4 p-4 bg-white/80 rounded-lg">
              <p className="font-medium" style={{ color: internship.borderColor }}>
                📞 {internship.interviewCall}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Available Tasks */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-2xl p-6 border-2 border-solid">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6" style={{ color: internship.borderColor }} />
                Available Tasks
              </h2>
              <div className="space-y-4">
                {internship.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-lg p-5 transition-all hover:shadow-lg`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-gray-300">
                        {task.id}
                      </span>
                      {getStatusBadge(task.status)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h3>
                    <p className="text-gray-700 mb-3">{task.description}</p>
                    
                    {task.links && task.links.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-300">
                        <p className="text-sm font-medium text-gray-600 mb-2">Reference Links:</p>
                        <div className="space-y-1">
                          {task.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span className="truncate">{link}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submission Process */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Submission Process</h2>
              <div className="space-y-4">
                {internship.submissionProcess.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div 
                      className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ backgroundColor: internship.borderColor }}
                    >
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technology Stack */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5" style={{ color: internship.borderColor }} />
                <h3 className="text-xl font-bold text-gray-900">Technology Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {internship.technologyStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm font-medium rounded-full border-2"
                    style={{ 
                      backgroundColor: internship.bgColor,
                      borderColor: internship.borderColor,
                      color: internship.borderColor
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5" style={{ color: internship.borderColor }} />
                <h3 className="text-xl font-bold text-gray-900">Timeline</h3>
              </div>
              <p className="text-3xl font-bold" style={{ color: internship.borderColor }}>
                {internship.timeline}
              </p>
              <p className="text-gray-600 text-sm mt-2">to complete one task</p>
            </div>

            {/* Evaluation Criteria */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5" style={{ color: internship.borderColor }} />
                <h3 className="text-xl font-bold text-gray-900">Evaluation Criteria</h3>
              </div>
              <div className="space-y-3">
                {internship.criteria.map((criterion) => (
                  <div key={criterion.name} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{criterion.name}</span>
                    <span 
                      className="font-bold text-lg"
                      style={{ color: internship.borderColor }}
                    >
                      {criterion.weightage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              className="w-full py-4 rounded-lg text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: internship.borderColor }}
              disabled={internship.status === 'close'}
            >
              {internship.status === 'close' ? 'Applications Closed' : 
               internship.status === 'upcoming' ? 'Opening Soon' : 
               'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}