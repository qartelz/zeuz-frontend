import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import { useSelector } from 'react-redux';


const DashboardPage = () => {

  const { name, access, refresh } = useSelector((state) => state.auth);

  // if (!user) return <p>No user data available</p>;

  

  
  return (
    <div >
        <Navbar/>
        <HeroSection
        username={name}
        welcomemsg=" Welcome to Beetle ZeuZ,"
        question="Ready to start trading? "
        answers="With ZeuZ, you can learn by doing in a risk-free environment. Let’s get started on your journey to becoming a confident trader!"
        
      />
    
      
    </div>
  )
}

export default DashboardPage
