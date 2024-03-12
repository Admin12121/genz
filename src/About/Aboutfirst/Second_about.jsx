import React from 'react'
import Lottie from "lottie-react";
import Animation from '../../assets/Animation3.json'

const Second_about = () => {
  return (
    <>
            <div className="first_wrap">
        <div className="About_desc">
        <div className="About_first_img">
            <Lottie animationData={Animation}/>
          </div>
          <div className="About_text">
            <div className="about_head">
              <h1>What We Believe</h1>
            </div>
              <p>
              We are living in a world where technology changes as fast as night and day. New techniques, new innovations, and new systems are being developed at an accelerated pace and in order to succeed, one has to be in tune with these changing dynamics. By harnessing the power of the internet, traditional classrooms have given way to virtual ones - and this interconnected ecosystem ensures that you get all the facilities of classroom training without actually attending one.
<br/>
<br/>
In the words of Benjamin Franklin, "Tell me and I forget. Teach me and I remember. Involve me and I learn". We at Sipalaya InfoTech endorse this ideology, which is why our courses are designed to include maximum student participation. We are a dedicated bunch of trainers and professionals who want to promote industry best practices in education through collaboration with corporates and leading organizations.
              </p>
          </div>

        </div>
        </div>
    </>
  )
}

export default Second_about
