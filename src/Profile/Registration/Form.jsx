import React,{useEffect, useState} from "react";
// import "./Form.scss";
import { useRegistrationMutation} from "../../Fetch_Api/Service/User_Auth_Api";
import Notification from "../../Notification/Notification";

const Form = ({api}) => {
    const [server_error, setServerError] = useState();
    const [registration, {isLoading}] = useRegistrationMutation();
    const ms = "registration successfull "

    
    const handleSubmitCode = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            name: data.get("name"),
            DOB: data.get("dob"),
            email: data.get("email"),
            phone: data.get("phone"),
            gender: data.get("gender"),
            collage: data.get("collage"),
            Academic_status: data.get("academic"),
            intrested_course: data.get("course"),
            preferred_Shedule: data.get("shedule"),
            Intern_ship: data.get("internship"),
            inquery: data.get("inquery"),
            
        };
        try {
            const res = await registration(actualData);
            // Check if the API call was successful
            if (res.status === 201) {
                // Handle the success message
                setServerError(res.data.msg);
                // Optionally, you can perform additional actions here
            } else {
                // Handle other status codes or error scenarios
                setMessage(true)
                setServerError( res.data.msg);
                document.getElementById('registrationSuccess').reset();
                setTimeout(() => {
                    setMessage(false);
                }, 5000);
            }
        } catch (error) {
            // Handle network errors or other exceptions
            setServerError(error.message)
        }
    }
    const [message, setMessage] = useState(false)
    const handelMessage = () =>{
        
        setTimeout(() => {
            setMessage(false);
        }, 5000);
    };
    const [coursename, SetCoursename] = useState([])
    useEffect(()=>{
        fetch(api)
        .then(response => response.json())
        .then(data => SetCoursename(data))
        .catch(err => console.log(err))
    }, [])
    return (
        <>
          {/* <Notification message={message} data={server_error} set={handelMessage}/> */}
          <section className="sec_wra_admission">
<div className="container_form_wrapper">
        <header>Admission Form</header>
        <form id="registrationSuccess" onSubmit={handleSubmitCode} >
            <div className="form first">
                <div className="details personal">
                    <span className="form-title">Personal Details</span>
                    <div className="fields">
                        <div className="form-input-field">
                            <label>Name *</label>
                            <input type="text" name="name" placeholder="Name" required/>
                        </div>
                        <div className="form-input-field">
                            <label>Address *</label>
                            <input type="text" name="dob" placeholder="Address" required/>
                        </div>
                        <div className="form-input-field">
                            <label>Email *</label>
                            <input type="text" name="email" placeholder="Email" required/>
                        </div>
                        <div className="form-input-field">
                            <label>Phone *</label>
                            <input type="number" name="phone" placeholder="Phone" required/>
                        </div>
                        <div className="form-input-field">
                            <label>Gender *</label>
                            <select name="gender" defaultValue="" required>
                                <option value="" disabled >Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="form-input-field">
                            <label>Occupation</label>
                            <input type="text" placeholder="Occupation" required/>
                        </div>
                    </div>
                </div>
                <div className="details ID">
                    <span className="form-title">Identity Details</span>
                    <div className="fields">
                        <div className="form-input-field">
                            <label>College / Institution Name *</label>
                            <input type="text" name="collage" placeholder="College / Institution Name" required/>
                        </div>
                        <div className="form-input-field">
                            <label>Academic Status *</label>
                            <select name="academic" defaultValue="" required>
                                <option value="" disabled >Academic Status</option>
                                <option value="Bachlor Completed/ Running">Bachlor Completed/ Running</option>
                                <option value="SEE">SEE</option>
                                <option value="+2">+2</option>
                                <option value="Master">Master</option>
                            </select>
                        </div>
                        <div className="form-input-field">
                            <label>Interested Course *</label>
                            {/* <input type="text" name="course" placeholder="Interested Course" required/> */}
                            <select name="course" defaultValue="" required>
                                <option value="" disabled >Select</option>
                                {coursename.map(({course},index)=>(
                                    <option key={index} value={course}>{course}</option>
                                ))}
                                {/* <option value="Evening">Evening</option> */}
                            </select>
                        </div>
                        <div className="form-input-field">
                            <label>Preferred Shedule *</label>
                            <select name="shedule" defaultValue="" required>
                                <option value="" disabled >Select</option>
                                <option value="Morning">Morning</option>
                                <option value="Evening">Evening</option>
                            </select>
                        </div>
                        <div className="form-input-field">
                            <label>I want to join Sipalaya Internship program after my training is over *</label>
                            <select name="internship" defaultValue="" required>
                                <option disabled value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="fields">
                    <div className="form-input-field">
                            <label>Any queries? *</label>
                            {/* <input type="text" placeholder="Enter expiry date" required/> */}
                            <textarea name="inquery" id="" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                    <button type="submit" className="nextBtn">
                        <span className="btnText">Submit</span>
                        <i className="uil uil-navigator"></i>
                    </button>
                </div> 
            </div>
        </form>
    </div>
    <Notification message={message} data={server_error} set={handelMessage}/>
    </section>
    </>
  )
}

export default Form
