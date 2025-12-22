// app/(protected)/dashboard/layout.tsx
'use client';

import React from 'react';
import SidebarAdmin from '@/components/SidebarAdmin'

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Component - Fixed */}
      <SidebarAdmin />

      {/* Main Content Area */}
      <main className="flex-1 transition-all duration-300">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}