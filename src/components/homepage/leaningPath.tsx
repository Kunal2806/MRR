"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
// import { GraduationCap, Rocket, Target, Trophy, Star, Briefcase, ArrowRight } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import FloatingCircles from "./FloatingCircles";
// import sproutImage from "@/assets/sprout-seed.png";
import { domains, Domain } from "@/data/domains";
// import Link from "next/link";
import {DomainNode} from "@/components/homepage/learningnode";
 
// const offerings = [
//   {
//     id: "courses",
//     icon: GraduationCap,
//     title: "Expert-Led Courses",
//     description:
//       "Learn from industry professionals with hands-on projects and real-world applications",
//     details: {
//       highlights: [
//         "Industry-expert instructors with 10+ years experience",
//         "Hands-on projects for every module",
//         "Real-world case studies and applications",
//         "Flexible learning schedules",
//         "Lifetime access to course materials",
//       ],
//       items: [
//         "Full Stack Development Bootcamp",
//         "AI & Machine Learning Mastery",
//         "Cloud Architecture Professional",
//         "Cybersecurity Specialist Training",
//       ],
//     },
//   },
//   {
//     id: "domains",
//     icon: Rocket,
//     title: "Technology Domains",
//     description:
//       "Master cutting-edge fields: AI, Web Dev, Blockchain, Cloud, Cybersecurity, and Data Science",
//     details: {
//       highlights: [
//         "6 comprehensive technology domains",
//         "Latest tools and technologies",
//         "Industry-relevant skill development",
//         "Career-focused learning paths",
//         "Expert mentorship in each domain",
//       ],
//       items: [
//         "Artificial Intelligence & ML",
//         "Web Development (Frontend & Backend)",
//         "Blockchain & Crypto",
//         "Cloud Computing (AWS, Azure, GCP)",
//         "Cybersecurity & Ethical Hacking",
//         "Data Science & Analytics",
//       ],
//     },
//   },
//   {
//     id: "events",
//     icon: Target,
//     title: "Live Events & Workshops",
//     description:
//       "Participate in hackathons, webinars, and interactive sessions with industry experts",
//     details: {
//       highlights: [
//         "Monthly hackathons with prizes",
//         "Weekly webinars with industry leaders",
//         "Hands-on workshops every week",
//         "Networking opportunities with peers",
//         "Certificate for participation",
//       ],
//       items: [
//         "AI Innovation Hackathon 2025",
//         "Web3 Development Workshop",
//         "Cloud Security Masterclass",
//         "Data Science Competition",
//       ],
//     },
//   },
//   {
//     id: "certifications",
//     icon: Trophy,
//     title: "Industry Certifications",
//     description:
//       "Earn recognized certifications that boost your career and validate your skills",
//     details: {
//       highlights: [
//         "Industry-recognized certificates",
//         "Shareable digital credentials",
//         "LinkedIn profile enhancement",
//         "Portfolio-ready proof of skills",
//         "Verified by industry partners",
//       ],
//       items: [
//         "Professional Full Stack Developer",
//         "Certified AI/ML Specialist",
//         "Cloud Solutions Architect",
//         "Cybersecurity Expert",
//         "Blockchain Developer Professional",
//       ],
//     },
//   },
//   {
//     id: "learning",
//     icon: Star,
//     title: "Personalized Learning",
//     description:
//       "Follow customized learning paths tailored to your goals and skill level",
//     details: {
//       highlights: [
//         "Personalized learning roadmaps",
//         "Skill assessment and gap analysis",
//         "Adaptive difficulty levels",
//         "Progress tracking dashboard",
//         "Customized recommendations",
//       ],
//       items: [
//         "Beginner to Advanced paths",
//         "Self-paced learning modules",
//         "Interactive coding challenges",
//         "Real-time progress analytics",
//         "Personalized mentor guidance",
//       ],
//     },
//   },
//   {
//     id: "career",
//     icon: Briefcase,
//     title: "Career Support",
//     description:
//       "Get mentorship, portfolio guidance, and industry connections for your tech career",
//     details: {
//       highlights: [
//         "One-on-one career mentorship",
//         "Resume and portfolio review",
//         "Interview preparation sessions",
//         "Industry networking events",
//         "Job placement assistance",
//       ],
//       items: [
//         "Career counseling sessions",
//         "Portfolio development workshops",
//         "Mock interview preparation",
//         "LinkedIn profile optimization",
//         "Industry referral network",
//       ],
//     },
//   },
// ];

export default function ExploreSection() {
  const router = useRouter();
  // const [activeSection, setActiveSection] = useState("courses");
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = offerings.map((o) => o.id);
  //     const scrollPosition = window.scrollY + 200;

  //     for (const sectionId of sections) {
  //       const element = document.getElementById(sectionId);
  //       if (element) {
  //         const { offsetTop, offsetHeight } = element;
  //         if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
  //           setActiveSection(sectionId);
  //           break;
  //         }
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   handleScroll();

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const scrollToSection = (id: string) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     const offset = 100;
  //     const elementPosition = element.getBoundingClientRect().top;
  //     const offsetPosition = elementPosition + window.scrollY - offset;
  //     window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  //     setActiveSection(id);
  //   }
  // };

  const handleDomainClick = (domain: Domain) => {
    router.push(`/learning-path?domain=${domain.id}&from=home`);
  };

  const getZIndex = (domainId: string) => {
    return hoveredDomainId === domainId ? 40 : 10;
  };

  return (
    <section className="py-10 bg-background relative overflow-hidden min-h-[800px]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-primary">Seeds of Learning</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground mb-3 max-w-3xl mx-auto font-extrabold"
          >
            Every domain starts as a seed. Plant it, nurture it, watch it branch into your future.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl italic text-muted-foreground mb-2 font-bold"
          >
            {/* "You&apos;re not just learning — you&apos;re blooming." 🌿 */}
            {"\"You're not just learning — youre blooming. 🌿 \""}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-3 text-lg"
          >
            <span className="text-3xl">🌱</span>
            <span className="text-muted-foreground">→</span>
            <span className="text-3xl">🌿</span>
            <span className="text-muted-foreground">→</span>
            <span className="text-3xl">🌳</span>
            <span className="text-muted-foreground ml-2 font-semibold">Your growth journey awaits</span>
          </motion.div>
        </div>

        {/* Domain Seeds Layout */}
        <div className="relative w-full h-[450px] md:h-[650px] max-w-7xl mx-auto">
          {domains.map((domain) => (
            <DomainNode
              key={domain.id}
              domain={domain}
              isSelected={false}
              isHidden={false}
              onClick={() => handleDomainClick(domain)}
              onHoverChange={(isHovered) =>
                setHoveredDomainId(isHovered ? domain.id : null)
              }
              zIndex={getZIndex(domain.id)}
            />
          ))}
        </div>

        {/* Explore More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          
        </motion.div>
      </div>
    </section>
  );
}
