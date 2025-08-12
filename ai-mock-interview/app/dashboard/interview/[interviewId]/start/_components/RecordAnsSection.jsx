"use client"
import Webcam from 'react-webcam'
import Image from 'next/image'
import React, { useEffect,useState } from 'react'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
function RecordAnsSection() {
    const [userAnswer, setUserAnswer] = useState('')
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result)=>{
        setUserAnswer(prevAns=>prevAns+result?.transcript)
    })

  },[results])


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
<Button variant="outline" className="my-10"
onClick={isRecording ? stopSpeechToText : startSpeechToText}>
    {isRecording ?
        <h2 className='text-red-600'>
            <Mic /> Recording...
        </h2>
        :
        'Record Answer'
    }
</Button>

<Button onClick={() => console.log(userAnswer)}>Show the answer</Button>

    </div>
  )
}

export default RecordAnsSection
