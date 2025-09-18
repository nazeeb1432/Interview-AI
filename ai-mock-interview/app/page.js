"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto p-4 flex  items-center">
        <Image
          src="/logo.svg"
          alt="MockInterview Logo"
          width={200}
          height={300}
          className="rounded-lg"
          priority
        />
      </div>
      <div className="container mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                #1 Interview Practice Platform
              </div>
              <h1 className="text-5xl font-extrabold mb-6 text-gray-800 leading-tight">
                Prepare for Your <span className="text-blue-600">Dream Job</span> Interview
              </h1>
              <p className="text-xl mb-8 text-gray-600 leading-relaxed">
                Practice with our AI-powered mock interview platform. Get instant feedback, refine your answers, and build the confidence you need to succeed.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button variant="default" className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
                  Start Your Interview
                </Button>
              </Link>
           
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-bold bg-blue-${i*100 + 300}`}>
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-gray-800">1,000+ Users</div>
                  <div className="text-sm text-gray-500">Joined this month</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-blue-300 rounded-full blur-3xl opacity-20 transform scale-150"></div>
            <div className="relative z-10">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-300 rounded-lg rotate-12 blur-lg opacity-70"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-400 rounded-full blur-xl opacity-70"></div>
              
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-2 border border-gray-100">
                <Image 
                  src="/home-page.jpg" 
                  alt="Virtual Interview Illustration" 
                  width={1500} 
                  height={1500}
                  className="rounded-xl"
                  style={{ maxWidth: '100%', height: 'auto' }}
                  priority
                />
                
              
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
     
      </div>
   
  );
}
