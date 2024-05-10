import { useRef } from 'react';
import "./feedback.scss";
import {toast } from 'sonner';
import {useGetLoggedUserQuery, useFeedbackMutation  } from "../../Fetch_Api/Service/User_Auth_Api";

const Feedback = () => {
    const formRef = useRef(null);
    const [ Feedback, {isLoading}] = useFeedbackMutation();
    const {
        data: userData,
      } = useGetLoggedUserQuery();

    const HandleFeedback = async(e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const actualData = {
        user: userData && userData.email,
        answer: data.get("answer"),
      };
      try{
        const res = await Feedback({actualData}) ;
        if (res.error) {
          toast.error("Failed to Submit");
        }
        if (res.data) {
          formRef.current.reset();
          toast.success("Feedback submited");
        }
      } catch (error) {
        console.error("Error in HandleProjectSubmit:", error);
      }
    }
  return (
    <>
      <div className="feedback_section">
        <div className="feedback_Wrapper">
          <div className="feedback_logo_wrapper">
            <img src="meta.png"  style={{height:"100px",filter:" invert(1)"}} alt="logo" />
            <h1>genzcoder</h1>
          </div>
          <div className="feedback_textfield">
            <h1>Feedback for ....</h1>
            <p>
              Thank you for giving us feedback! if you want to give us a chance
              to respond to your feedback
            </p>
            <span>
                <div className="inputForm" >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        viewBox="0 0 32 32"
                        height="20"
                        >
                        <g data-name="Layer 3" id="Layer_3">
                            <path fill="#9cd16b" d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                        </g>
                        </svg>
                       {userData && <input placeholder={`${userData.email}`} disabled className="input" type="text" name="email" required/>}
                </div>
              <form ref={formRef} id="project_formrt" onSubmit={HandleFeedback}>
                <div className="form">
                  <input
                    className="input"
                    placeholder="Your answer"
                    type="text"
                    name="answer"
                    required
                  />
                  <span className="input-border"></span>
                </div>
                <button type="submit" className="feedback_button">submit</button>
              </form>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
