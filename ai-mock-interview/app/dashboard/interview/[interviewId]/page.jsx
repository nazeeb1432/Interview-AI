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
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="font-extrabold text-4xl text-yellow-700 mb-2 drop-shadow">Let's get started</h2>
          <p className="text-lg text-black font-medium">Prepare for your mock interview with all the details below.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Card */}
          <div className="bg-transparent backdrop-blur-sm rounded-xl shadow-lg p-6 flex flex-col gap-4 border border-blue-200">
            <strong><h3 className="text-xl font-bold text-yellow-700 mb-2">Interview Details</h3></strong>
            <div className="space-y-2">
              <div>
                <span className="font-bold text-black">Job Role/Position:</span>{" "}
                <span className="text-black">{interviewData ? interviewData.jobPosition : "Loading..."}</span>
              </div>
              <div>
                <span className="font-bold text-black">Job Description:</span>{" "}
                <span className="text-black">{interviewData ? interviewData.jobDesc : "Loading..."}</span>
              </div>
              <div>
                <span className="font-bold text-black">Years of Experience:</span>{" "}
                <span className="text-black">{interviewData ? interviewData.jobExperience : "Loading..."} years</span>
              </div>
            </div>
          </div>
          
          {/* Camera Card */}
          <div className="bg-transparent backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-200 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-yellow-700 mb-4">Webcam & Microphone</h3>
            {webcamEnabled ? (
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                mirrored={true}
                style={{ height: 300, width: 300, borderRadius: 16, border: '2px solid #FBBF24' }}
              />
            ) : (
              <>
                <WebcamIcon className="h-48 w-48 my-4 p-6 bg-blue-50 rounded-xl border border-blue-200 transition hover:scale-105" />
                <Button className="mt-2 bg-blue-700 hover:bg-blue-900 text-white font-bold px-4 py-2 rounded-lg shadow" onClick={() => setWebcamEnabled(true)}>
                  Enable webcam and microphone
                </Button>
              </>
            )}
            
            {/* Information section moved inside camera card */}
          <div className="mt-4 bg-amber-100 rounded-lg shadow p-2 border border-yellow-300 flex flex-col gap-2 w-3/4 max-w-xs">
              <h3 className="flex gap-2 items-center text-yellow-700 text-base font-semibold">
                <Lightbulb /> Information
              </h3>
              <p className="text-gray-700 text-xs">{process.env.NEXT_PUBLIC_INFORMATION}</p>
            </div>
          </div>
        </div>
       <div className="flex justify-center mt-8">
          {/* Start Interview Button */}
          <div className="flex flex-col items-center justify-center">
            <Button
              className="bg-blue-700 hover:bg-blue-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg text-lg transition-all duration-200"
              onClick={() => {
                window.location.href = `/dashboard/interview/${params.interviewId}/start`;
              }}
            >
              Start mock interview
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Interview
