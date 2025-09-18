import React from 'react'
import Header from './_components/Header';

function DashboardLayout({children}) {
  return (
    <div>
      <Header />
      <div 
        className='mx-5 md:mx-20 lg:mx-36 my-2'
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 80px)',
          borderRadius: '10px',
        }}
      >
        {/* Background image with reduced opacity */}
        <div
          style={{
            backgroundImage: 'url(/interview-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.5, // Reduced opacity for a more subtle background
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            zIndex: 1,
          }}
        />
        <div className="relative z-10 p-6 rounded-lg">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout;