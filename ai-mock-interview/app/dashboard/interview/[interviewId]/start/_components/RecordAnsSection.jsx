"use client"
import Webcam from 'react-webcam'
import Image from 'next/image'
import React, { useEffect,useState } from 'react'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { sendMessage } from '@/utils/GeminiAiModel'; // Import the function to send messages to Gemini AI
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { UserAnswer } from '@/utils/schema'
import { db } from '@/utils/db'
import moment from 'moment'
function RecordAnsSection({mockInterviewQuestions,activeQuestionIndex,interviewData}) {
    const [userAnswer, setUserAnswer] = useState('')
    const {user} = useUser();
    const [loading,setLoading]=useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result)=>{
        setUserAnswer(prevAns=>prevAns+result?.transcript)
    })

  },[results])
  
  useEffect(() => {
    if(!isRecording && userAnswer?.length>10){
      UpdateUserAnswer();
    }
     if(userAnswer?.length<10){
        setLoading(false);
        toast('Error while saving your answer. Please try again.');
        return;
      }  
  }, [userAnswer]);

  const StartStopRecording=async()=>{
    if(isRecording)
    {
      stopSpeechToText()  
    }
    else{
      startSpeechToText()
    }
  }

  const UpdateUserAnswer=async()=>{
    console.log("User Answer: "+userAnswer);
    setLoading(true);

    const feedbackPrompt="Question:"+mockInterviewQuestions[activeQuestionIndex]?.question +", User Answer:"+userAnswer+". Depends on question and answer for give interview question. please give us rating for answer and feedback as area of improvement if any.   "+
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field. "
    
      const result = await sendMessage(feedbackPrompt);
      const MockJsonResp = result.replace('```json', '').replace('```', '');
      console.log('Question Prompt',feedbackPrompt);
    
      console.log("Feedback from Gemini AI: "+MockJsonResp);
      const JsonFeedbackResp = JSON.parse(MockJsonResp);

      const resp = await db.insert(UserAnswer).values({
      mockId:interviewData?.mockId,
      question:mockInterviewQuestions[activeQuestionIndex]?.question,
      correctAns:mockInterviewQuestions[activeQuestionIndex]?.answer,
      userAns:userAnswer,
      rating:JsonFeedbackResp?.rating,
      feedback:JsonFeedbackResp?.feedback,
      userEmail:user?.primaryEmailAddress.emailAddress,
      createdAt: moment().format('DD-MM-yyyy')

      })
      if(resp){
        toast.success('User answer recorded successfully!');
        setUserAnswer('');
        setResults([]);
        
      }else{
        toast.error('Error while saving your answer. Please try again.');
      }
      setResults([]);
      
      setLoading(false);

  }


  return (
    <div>
    <div className='flex flex-col my-20 justify-center items-center bg-white rounded-lg p-5'>
      <Image src={'/webcam.avif'} width={200} height={200} className='absolute' alt="Webcam"/>
      <Webcam
      mirrored={true}
      style={{
        height:200,
        width: '50%',
        zIndex:10
      }}
      /> 
    </div>
<Button disabled={loading} variant="outline" className="my-10"
onClick={StartStopRecording}>
    {isRecording ?
        <h2 className='text-red-600'>
            <Mic /> Recording...
        </h2>
        :
        'Record Answer'
    }
</Button>



    </div>
  )
}

export default RecordAnsSection
