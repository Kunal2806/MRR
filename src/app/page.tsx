import MentorshipHero from '@/components/homepage/Hero'
import Engagement  from '@/components/homepage/Engagement'
import React from 'react'
import LearningPathPage from '@/components/homepage/leaningPath'

const Homepage = () => {
  return (
    <div>
      <MentorshipHero/>
      <LearningPathPage />
      <Engagement/>
    </div>
  )
}

export default Homepage