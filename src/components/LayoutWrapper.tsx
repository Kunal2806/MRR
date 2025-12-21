'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide navbar and footer for dashboard routes
  const isDashboardRoute = pathname?.startsWith('/dashboard') || 
                          pathname?.startsWith('/admin') ||
                          pathname?.startsWith('/user');

  return (
    <>
      {!isDashboardRoute && <Navbar />}
      {children}
      {!isDashboardRoute && <Footer />}
    </>
  );
}