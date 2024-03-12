import React,{useState} from 'react'
import Form from './Form';
import Box from './Box'
import Map from './Map';


const Header = () => {
  const [size,setSize] =useState("1000")

  return (
    <>
          <div className="Contact_wrapper">
    <div className="contact_header_wrapper">
    <h1>Tell Us About YourSelf</h1>
    <p>Connect with us to unlock your IT potential! 🌐 Ready to embark on a journey of skill enhancement and career growth? Reach out now and let's start shaping your success story together.</p>
    </div>    
    <Map size={size}/>
    </div>   
    </>
  )
}

export default Header
