"use client"

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"  
import { ChevronsUpDown, ChevronsUpDownIcon, LucideChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback({params}) {

    const [feedbackList,setFeedbackList]=useState([]);  
    const router=useRouter();
    useEffect(()=>{
        GetFeedback();
    },[])

    const GetFeedback=async()=>{

        const result=await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockId,params.interviewId))
        .orderBy(UserAnswer.id)

        console.log(result);
        setFeedbackList(result);
    }

  // Calculate average rating out of 10
  const totalRating = feedbackList.reduce((sum, item) => sum + (Number(item.rating) || 0), 0);
  console.log("total rating " + totalRating);
  const averageRating = feedbackList.length > 0 ? ((totalRating / 25) * 10).toFixed(1) : null;

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback.</h2>
      {/* Display all ratings as numbers */}
      <div className="my-4">
        <h3 className="font-semibold">Ratings (out of 5 for each question):</h3>
        <ul>
          {feedbackList.map((item, idx) => (
            <li key={idx}>
              <strong>Question {idx + 1}: </strong> {Number(item.rating) || 0}
            </li>
          ))}
        </ul>
      </div>
      {feedbackList.length === 0 && (
        <h2 className='text-red-700 my-5'>
          No feedback available. Please complete the interview first.
        </h2>
      )}

      <h2 className='text-primary text-lg my-3'>
        Your overall interview rating:
        
          {averageRating !== null ? <b>{averageRating}/10</b> : 'N/A'}
        
      </h2>

      <h2 className='text-sm text-gray-500'>
        Find below interview question with correct answer, your answer and feedback for improvement
      </h2>
      {feedbackList &&
        feedbackList.map((item, index) => (
          <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full'>
              {item.question} <ChevronsUpDownIcon className='h-5 w-5' />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 border rounded-lg '>
                  <strong>Rating:</strong> {item.rating}
                </h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                  <strong>Your Answer: </strong>
                  {item.userAns}
                </h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'>
                  <strong>Correct Answer: </strong>
                  {item.correctAns}
                </h2>
                <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'>
                  <strong>Feedback: </strong>
                  {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

      <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback