'use client';
import Link from "next/link";
import Image from "next/image";

// import { useState } from 'react';
import { 
  Linkedin, 
  Twitter, 
  Youtube, 
  Instagram, 
  Facebook,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Events', href: '/events' },
      { label: 'Learning', href: '/learning' },
      { label: 'Internships', href: '/internships' },
      { label: 'More..', href: '/more' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Event Guidelines', href: '/guidelines' },
      { label: 'Community Forum', href: '/forum' },
      { label: 'Blog', href: '/blog' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

export default function Footer() {
  // const [email, setEmail] = useState('');

  // const handleSubscribe = () => {
  //   if (email && email.includes('@')) {
  //     console.log('Subscribing:', email);
  //     // Add your subscription logic here
  //     alert(`Subscribed with: ${email}`);
  //     setEmail('');
  //   } else {
  //     alert('Please enter a valid email address');
  //   }
  // };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="py-4">
             <Link href="/">
                          <div className="flex items-center space-x-1 cursor-pointer">
                              <Image src="/mentor-ravi-logo.png" alt="logo" height={150} width={150}></Image>
                          </div>
                        </Link>  
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </a>
            </div>
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Stay Updated Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h4>
            <div className="space-y-3 mb-6">
              <a
                href="mailto:ravi@mentorravirautela.com"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                ravi@mentorravirautela.com
              </a>
              <a
                href="tel:+919010018925"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 90100 18925
              </a>
              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Noida, Uttar Pradesh, India
              </div>
            </div>

            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 MentorRaviRautela. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/terms"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/privacy"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/cookies"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}