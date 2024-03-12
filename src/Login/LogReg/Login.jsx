import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import './Login.scss'
import SignIn from './SignIn';
import SignUp from './SignUp';
import Lottie from 'lottie-react';
import Animation1 from './Animation2.json'
import Animation2 from './Animation.json'

const App = () => {
  const location = useLocation();

  // Access the props passed from the SignUp component
  const signUpProps = location.state;

  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  return (
    <div className={`containerr ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-containerr">
        <div className="signin-signup">
            <SignIn/>
            <SignUp/>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Don't have an account ?</h3>
            {/* <p>
              Register Now
            </p> */}
            <button className="btn transparent" onClick={handleSignUpClick}>
            Register
            </button>
          </div>
          <Lottie className='image' animationData={Animation1}/>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already Have an Account ?</h3>
            <button className="btn transparent" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <Lottie className='image' animationData={Animation2}/>
        </div>
      </div>
    </div>
  );
};

export default App;
