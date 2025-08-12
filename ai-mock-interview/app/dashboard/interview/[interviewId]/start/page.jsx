"use client"
import React,{useEffect,useState} from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnsSection from './_components/RecordAnsSection';
function StartInterview({params}) {

    const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState(); 
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(()=>{

GetInterviewDetails();

    },[]);

     /**
       * Used to get interview details by mockId/interviewId
       */
      const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));
       


        const jsonMockResp =JSON.parse( result[0].jsonMockResp);
         console.log(jsonMockResp);
        setMockInterviewQuestions(jsonMockResp);
        setInterviewData(result[0]);
      }
    
  
    return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/*question*/}

          <QuestionsSection mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}/>

        {/*video/audio recording*/}
        <RecordAnsSection/>
      </div>
    </div>
  )
}

export default StartInterview
