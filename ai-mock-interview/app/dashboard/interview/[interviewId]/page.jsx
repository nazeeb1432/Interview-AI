"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";
import { Lightbulb } from 'lucide-react';

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  useEffect(() => {
    // Fetch interview data using params.interviewId
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);
  /**
   * Used to get interview details by mockId/interviewId
   */
  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    console.log(result);
    setInterviewData(result[0]);
  }

  return (
    <div className='my-10 flex justify-center flex-col items-center'>
      <h2 className='font-bold text-2xl'>Let's get started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>


        {/*info section */}
        <div className='flex flex-col my-5'>
          <h2 className='text-lg' >
            <strong>Job Role/Job Position:</strong>{" "}
            {interviewData ? interviewData.jobPosition : "Loading..."}
          </h2>

          <h2 className='text-lg' >
            <strong>Job Description:</strong>{" "}
            {interviewData ? interviewData.jobDesc : "Loading..."}
          </h2>
          <h2 className='text-lg' >
            <strong>Years of Experience:</strong>{" "}
            {interviewData ? interviewData.jobExperience : "Loading..."} years
          </h2>
        </div>

        <div className='p-5 border rounded-lg border-yellow-300 bg-amber-200'>
        
          <h2 className='flex gap-2 items-center text-yellow-600'>  <Lightbulb /><strong>Information: </strong></h2>
          <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
        </div>
        {/*Camera section */}
        <div>
          {webcamEnabled ? <Webcam
            onUserMedia={() => setWebcamEnabled(true)}
            onUserMediaError={() => setWebcamEnabled(false)}
            mirrored={true}
            style={{
              height: 300,
              width: 300
            }}
          /> :
            <>
              <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
              <Button onClick={() => setWebcamEnabled(true)}>Enable webcam and microphone</Button>
            </>

          }


        </div>
        <div className='flex justify-end items-end'>
          <Button
            onClick={() => {
              window.location.href = `/dashboard/interview/${params.interviewId}/start`;
            }}
          >
            Start mock interview
          </Button>
        </div>

      </div>





    </div>
  )
}

export default Interview
