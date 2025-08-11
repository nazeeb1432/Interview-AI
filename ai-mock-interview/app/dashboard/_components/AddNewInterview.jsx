"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Ghost, LoaderCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sendMessage } from '@/utils/GeminiAiModel'; // Import the function to send messages to Gemini AI
import { MockInterview } from '@/utils/schema';
import { uuid } from 'drizzle-orm/gel-core';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment';
import { db } from '../../../utils/db';
import { date } from 'drizzle-orm/mysql-core';
function AddNewInterview() {

    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();
    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt = "Job Position: " + jobPosition + ", Job Description: " + jobDesc + ", Years of Experience: " + jobExperience + ", Depending on Job Position,Job Description and Years of Experience, Give us " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_LIMIT + " Interview questions along with answers in JSON format.Give us question and answer field on JSON";
        console.log(InputPrompt);

        try {
            const result = await sendMessage(InputPrompt);
            const MockJsonResp = result.replace('```json', '').replace('```', '');
            console.log(JSON.parse(MockJsonResp));
            setJsonResponse(MockJsonResp);

            if (MockJsonResp) {

                const resp = await db.insert(MockInterview).values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResp,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('YYYY-MM-DD')
                }).returning({ mockId: MockInterview.mockId });

                console.log("Inserted ID:", resp);
                if(resp){
                    setOpenDialog(false);
                    router.push('/dashboard/interview'+resp[0]?.mockId)
                }

            } else {
                console.log("ERROR")
            }

            setLoading(false)


        } catch (error) {
            console.error("Error getting response from Gemini:", error);
        }


    }


    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}>
                <h2 className='font-bold text-lg text-center'>+ Add New</h2>
            </div>

            <Dialog open={openDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your job Interviewing</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add details about your job position/role, Job description and years of experience</h2>
                                    <div className='mt-7 my-3'>
                                        <label className='font-semibold'>Job Role/Job Position</label>
                                        <Input placeholder="Ex. Full stack developer" required
                                            onChange={(e) => setJobPosition(e.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-semibold'>Job Description/Tech Stack(In short)</label>
                                        <Textarea placeholder="Ex. React, Angular, NodeJS, MySQL etc." required
                                            onChange={(e) => setJobDesc(e.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-semibold'>Years of Experience</label>
                                        <Input placeholder="5" type="number" max="50" required
                                            onChange={(e) => setJobExperience(e.target.value)} />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end mt-5'>
                                    <Button variant="ghost" type="button" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ?
                                            <><LoaderCircle className='animate-spin' /> 'Generating...'</>
                                            : 'Start Interview'}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview