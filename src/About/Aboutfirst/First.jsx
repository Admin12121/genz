import React from "react";
import Lottie from "lottie-react";
import Animation from '../../assets/Animation2.json'
const First = () => {
  return (
    <>
      <div className="first_wrap">
      <div className="left-text">SiPalaya</div>
        <div className="About_title">
          <h1>About Us</h1>
        </div>
        <div className="About_desc">
          <div className="About_text">
            <div className="about_head">
              <h1>Who We Are</h1>
            </div>
              <p>
                Sipalaya has been helping professionals and students advance
                their careers in the tech industry for years. We are dedicated
                to providing high-quality, comprehensive training programs that
                are tailored to meet the needs of our students. Our team of
                instructors are all industry experts with years of experience in
                their fields. They are committed to sharing their knowledge and
                skills with our students and providing personalized support
                throughout the training process. We offer a wide range of
                courses covering the latest technologies and best practices in
                the industry. Our courses are designed to be interactive and
                hands-on, so that students can gain practical experience and
                build their skills. We are proud to have helped many students
                and professionals advance their careers and achieve their goals.
                We are confident that we can help you do the same.
              </p>
          </div>
          <div className="About_first_img">
            <Lottie animationData={Animation}/>
          </div>
        </div>
        </div>
    </>
  );
};

export default First;
