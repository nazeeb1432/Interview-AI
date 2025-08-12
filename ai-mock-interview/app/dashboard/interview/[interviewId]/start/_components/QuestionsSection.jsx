import { Lightbulb, Volume2 } from 'lucide-react';
import React, { useState, useEffect } from 'react'


function QuestionsSection({ mockInterviewQuestions, activeQuestionIndex = 0 }) {
  const [questions, setQuestions] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const textToSpeech = (text) => {
    if('speechSynthesis' in window){
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }else{
        alert('Sorry your browser does not support text-to-speech');
    }
    
  };

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);
    
    // Safely parse JSON on client side to avoid hydration issues
    if (Array.isArray(mockInterviewQuestions)) {
      setQuestions(mockInterviewQuestions);
    } else if (typeof mockInterviewQuestions === 'string') {
      try {
        const parsed = JSON.parse(mockInterviewQuestions);
        setQuestions(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Error parsing interview questions:', error);
        setQuestions([]);
      }
    } else {
      setQuestions([]);
    }
  }, [mockInterviewQuestions]);

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return <div className='p-5 border rounded-lg'>Loading questions...</div>;
  }

  return (
    <div className='p-5 border rounded-lg'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 '>
            {questions.map((question, index) => (
                <div key={index}>
                    <h2
                        className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                            activeQuestionIndex === index
                                ? 'bg-primary text-white'
                                : 'bg-secondary'
                        }`}
                    >
                        Question {index + 1}
                    </h2>
                   
                </div>
                
            ))}
        </div>
         <p className='my-5 text-md md:text-lg'>{questions[activeQuestionIndex]?.question}</p>
<Volume2 className='cursor-pointer' onClick={()=>textToSpeech(questions[activeQuestionIndex]?.question)}/>
   
   <div className='border rounded-lg p-5 bg-blue-100'>
    <h2 className='flex gap-2 items-center text-primary'>
        <Lightbulb/>
        <strong>Note: </strong>
    </h2>
    <h2 className='my-2 text-sm text-primary'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
   </div>
   
   
   
    </div>
  );
}

export default QuestionsSection
