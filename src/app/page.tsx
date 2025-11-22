import MentorshipHero from '@/components/homepage/Hero'
import Engagement  from '@/components/homepage/Engagement'
import React from 'react'
import LearningPathPage from '@/components/homepage/leaningPath'
import InternshipOpportunities from '@/components/homepage/InternshipOpportunities'
import Faq from '@/components/homepage/Faq'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Homepage = () => {
  return (
    <div>
      <MentorshipHero/>
      <div id='learningPath' >
        <LearningPathPage />
        <div className='flex justify-center items-center'>
        <Link
            href="/learning-path"
            className="group inline-flex items-center gap-2 text-lg font-bold text-primary hover:text-primary/80 transition-all duration-300"
          >
            <span className="relative py-0 my-[55px] text-[#6347EB]">
              Explore More
              <span className="absolute bottom-0 left-0 w-full h-0.5  bg-[#6347EB] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </span>
            <ArrowRight className="w-5 h-5 text-[#6347EB] group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          </div>
      </div>
      <div className='flex flex-col py-40'>
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Internship Opportunities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gain hands-on experience with real-world projects and expert mentorship
          </p>
        </div>
            <InternshipOpportunities/>
      </div>
      <Engagement/>
      <Faq/>
    </div>
  )
}

export default Homepage