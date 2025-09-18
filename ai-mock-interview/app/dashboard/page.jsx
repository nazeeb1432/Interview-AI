"use client"
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'


function DashboardPage() {
  return (
    <div className='p-10 bg-transparent'>
        <h2 className='font-bold text-2xl text-black'>Dashboard Page</h2>
        <h2 className='text-black'>Create and Start your AI Mockup Interview</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
          <AddNewInterview/>
        </div>

        {/* previous interview list  */}
        <InterviewList/>
   </div>
    
  )
}

export default DashboardPage