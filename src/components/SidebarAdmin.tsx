// components/Sidebar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";
import { useCurrentUser } from '@/hooks/auth';


export default function SidebarAdmin() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMinimized, setIsMinimized] = useState(false);
  // const session = useSession();
  const user = useCurrentUser();
  // const [logout, setLogout] = useState(false);

  useEffect(()=>{
    if(!user){
    router.push('/');
    }
  },[user])
  // async function Logout () {
  //   // await signOut();
  //   router.push('/');
  // }

  // if(logout){
  //   console.log(logout);
  // }

  return (
    <>
      <aside className={`fixed left-0 top-0 bg-white border-r border-gray-200 h-screen overflow-y-auto transition-all duration-300 z-40 ${
        isMinimized ? 'w-20' : 'w-64'
      }`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isMinimized && (
              <h2 className="text-xl font-bold text-indigo-600">Student Portal</h2>
            )}
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-500 hover:text-gray-700 ml-auto"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Go Back Button */}
        <div className="p-4 border-b border-gray-200">
          <button 
            onClick={() => router.push('/')}
            className={`flex items-center ${isMinimized ? 'justify-center' : 'gap-3'} px-4 py-3 w-full text-gray-700 hover:bg-gray-50 rounded-lg transition-colors`}
            title="Go Back"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {!isMinimized && <span>Go Back</span>}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/dashboard" 
            className={`flex items-center ${isMinimized ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
              pathname === '/dashboard' 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            title="Dashboard"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {!isMinimized && <span>Dashboard</span>}
          </Link>

          <Link 
            href="/dashboard/admin/internships" 
            className={`flex items-center ${isMinimized ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
              pathname === '/dashboard/internships' 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            title="Internships"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {!isMinimized && <span>Internships</span>}
          </Link>

          <Link 
            href="/dashboard/admin/profile" 
            className={`flex items-center ${isMinimized ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-colors ${
              pathname === '/dashboard/profile' 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            title="Profile"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {!isMinimized && <span>Profile</span>}
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <button 
            className={`flex items-center ${isMinimized ? 'justify-center' : 'gap-3'} px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors`}
            title="Logout"
            onClick={() => {
              // setIsOpen(false);
              // router.push('/');
              signOut();
              // if(!check) console.log(check)
              // setLogout(true);
              // Logout();
            }}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!isMinimized && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Spacer div to push content */}
      <div className={`transition-all duration-300 ${isMinimized ? 'w-20' : 'w-64'}`} />
    </>
  );
}