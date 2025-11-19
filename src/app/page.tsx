import MentorshipHero from '@/components/homepage/Hero'
import Engagement  from '@/components/homepage/Engagement'
import React from 'react'
import LearningPathPage from '@/components/homepage/leaningPath'
import InternshipOpportunities from '@/components/homepage/InternShip'
import Faq from '@/components/homepage/Faq'

const Homepage = () => {
  return (
    <div>
      <MentorshipHero/>
      <div id='learningPath'>
        <LearningPathPage />
      </div>
      <Engagement/>
      <InternshipOpportunities/>
      <Faq/>
    </div>
  )
}

export default Homepage