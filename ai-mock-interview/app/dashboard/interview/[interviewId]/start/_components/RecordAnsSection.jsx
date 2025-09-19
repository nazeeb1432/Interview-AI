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

    const feedbackPrompt="Question:"+mockInterviewQuestions[activeQuestionIndex]?.question +", User Answer:"+userAnswer+". Depends on question and answer for give interview question. please give us rating for answer and feedback as area of improvement if any.    "+
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
    <div className='flex flex-col justify-center items-center bg-transparent rounded-lg p-0 m-0'>
      <Image src={'/webcam.avif'} width={450} height={270} className='absolute' alt="Webcam"/>
      <Webcam
      mirrored={true}
      style={{
        height: 400,
        width: '90%',
        zIndex: 10,
        padding: '0',
        margin: '0',
        borderRadius: '8px',
      }}
      />
      
      <Button 
        disabled={loading} 
        variant={isRecording ? "destructive" : "default"}
        className="mt-4 px-6 py-1 shadow-md"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <div className="flex items-center gap-2">
            <Mic className="animate-pulse" />
            <span className='text-white'>Recording...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Mic />
            <span>Record Answer</span>
          </div>
        )}
      </Button>
 
    </div>



    </div>
  )
}

export default RecordAnsSection
