// app/layout.tsx
import 'react-quill/dist/quill.snow.css';

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from '@/components/LayoutWrapper';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "Ravi Rautela Mentorship Hub",
  description: "We're here to Increase your Productivity",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}