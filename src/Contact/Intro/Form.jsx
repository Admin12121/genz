import React,{useState} from 'react'
import Button from '../../Components/Button';
import Glob from '../Glob/Glob';
import { useContactMutation } from "../../Fetch_Api/Service/User_Auth_Api";
import { useNavigate } from 'react-router-dom';
import Box from './Box';
import Map from './Map';
const Form = () => {
  const [size,setSize] =useState("400")
  const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(''); // Initial state
const [contact,{ isLoading, isSuccess, isError }] = useContactMutation();
const [errors,setErrors] = useState(false);
const [dat,setDat] =useState(false);    
const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const handleSubmit = async (e) =>{
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const actualData ={
        first_name: data.get("first"),
        last_name: data.get("last"),
        email: data.get("email"),
        phonr: data.get("phone"),
        desc: data.get("desc")
      };
      try {
        const res = await contact(actualData);
        
        if (isError == true) {
          console.error('Form submission failed:', isError);
          document.getElementById('formdatasubmit').reset();
          setErrors(false)
          setDat(true)
          setTimeout(() => {
            setDat(false)
          }, 3000)
        } else {
          document.getElementById('formdatasubmit').reset();
          navigate('/contact');
          console.log('Form submitted successfully');
          setErrors(true)
          setDat(true)
          setTimeout(() => {
            setDat(false)
          }, 3000)
        }
      } 
      catch (error) {
        // Handle other scenarios if needed
        console.error('Form failed:', error);
      }
    }

  return (
    <>
        <div className="contact_form">
          <div className="contact_form_data">
          <form id='formdatasubmit' className="contact_form_box" onSubmit={handleSubmit}>
            <div className="user_name">
              <span className="hdr">
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="first" />
              </span>
              <span className="hdr">
                <label htmlFor="lname">Last Name</label>
                <input type="text" id="fname" name="last" />
              </span>
            </div>
            <span>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </span>
            <span>
              <label htmlFor="email">Phone</label>
              <input type="text" id="email" name="phone" />
            </span>
            <span>
              <label htmlFor="email">Message</label>
              <textarea className="form-control" name="desc"></textarea>
            </span>
            {/* <Button type="submit" text="Send Message" /> */}
            <button type='submit'>Send Message</button>
            {dat ? <div>{errors ? <h5>Oops! 🙊 It seems there was an issue submitting your message. Please try again or reach us directly at +977 9851344071. We appreciate your patience! 🌐</h5>: <h5>Success! 🎉 Your message has been received. Our team will be in touch shortly. Thank you for reaching out!</h5>}</div> : ''}
            
    </form>
    <div className="contact_form_text">
        <span>
            <h2>CONTACT US</h2>
            <span>
                <p>Reach out now and let's start shaping your success story together.</p>
            </span>
        </span>
        <div id="mess">
            <Glob/>
        </div>
        <div id="messs">
            <Map size={size}/>
        </div>
    </div>
          </div>
    <Box/>
    </div>

    </>
  )
}

export default Form
