'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Internship } from '@/components/carrer/Internship';
import { Building2, Calendar } from "lucide-react";
import Link from "next/link";

export default function Internships() {
    // const [data, setData] = useState({message: "nothing"})
    // const [internship, s]
    const {data: session} = useSession();
    const userId = session?.user.id;

    const [internship, setInternship] = useState<Internship[]>([]);

    useEffect(() => {
      const fetchInternship = async () => {
        try{
            const response = await fetch(`/api/userdashboard/internship/${userId}`);
            if(!response)
                throw new Error("cannot get internships");
            const data = await response.json();
            // setData(data)
            setInternship(data);
        }
        catch(error) {
            console.log("cannot get internships")
        }
      }
      fetchInternship();
    }, [])
    
    const getStatusStyle = (status: string) => {
    const styles = {
      open: 'bg-green-500',
      upcoming: 'bg-yellow-500',
      close: 'bg-red-500',
      closed: 'bg-gray-500'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-500';
  };

    return (
        // <div>{data.message}</div>
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internship.map((internship) => (
                <div
                    key={internship.id}
                    className="border-2 border-solid rounded-2xl p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
                    style={{
                    backgroundColor: internship.bgColor,
                    borderColor: internship.borderColor
                    }}
                >
                    {/* Company Badge */}
                    <div className="mb-4">
                    <span 
                        className="inline-flex items-center gap-1.5 text-white text-xs font-medium px-3 py-1.5 rounded-full"
                        style={{
                        backgroundColor: internship.borderColor
                        }}
                    >
                        <Building2 size={12} />
                        Ravi Rautela Mentorship Hub
                    </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {internship.title}
                    </h3>
                    
                    {/* Overview */}
                    <p className="text-gray-600 mb-4 flex-grow text-sm">
                    {internship.overview}
                    </p>
                    
                    {/* Domain & Level */}
                    <div className="flex gap-2 mb-3">
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-white">
                        {internship.domain}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-white">
                        {internship.level}
                    </span>
                    </div>
                    
                    
                    {/* Mode & Stipend */}
                    <div className="flex gap-2 mb-3">
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-white">
                        {internship.mode}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-white">
                        {internship.stipend}
                    </span>
                    </div>
                    
                    {/* Timeline & Status */}
                    <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar size={16} />
                        <span>{internship.timeline}</span>
                    </div>
                    <span 
                        className={`${getStatusStyle(internship.status)} text-white text-xs font-semibold px-3 py-1 rounded-full capitalize`}
                    >
                        {internship.status}
                    </span>
                    </div>
    
                    {/* Deadline */}
                    {internship.deadline && (
                    <p className="text-xs text-gray-600 mb-4">
                        Deadline: {new Date(internship.deadline).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                        })}
                    </p>
                    )}
                    
                    {/* CTA Button */}
                    <Link href={`/internships/${internship.id}`}>
                    <button 
                        className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-all hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                        backgroundColor: internship.borderColor
                        }}
                        disabled={internship.status === 'close'}
                    >
                        {internship.status === 'open' ? 'I am Interested' : 
                        internship.status === 'upcoming' ? 'Coming Soon' : 'Closed'}
                        {(internship.status === 'open' || internship.status === 'upcoming') && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        )}
                    </button>
                    </Link>
                </div>
                ))}
            </div>
            </div>
        </div>
    )
}
