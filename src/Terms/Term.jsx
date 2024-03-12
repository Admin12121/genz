import React from "react";
import "./term.scss";
const Term = () => {
  return (
    <>
      <div className="term">
        <h1>Terms and Conditions</h1>
        <p>
          By paying the course fee or signing up for a course, you are legally
          bound to agree to all the terms and conditions stated below. This is
          valid till you complete the course or the course is cancelled or your
          admission revoked, in accordance to the terms and conditions.
        </p>
        <br />
        <div>
          <span>Student conduct and commitment:</span> <br />
          <p>
            Sipalaya InfoTech courses are intensive, career makers. We expect a
            fair amount of professionalism from our candidates when they take
            our course. Any form of disruptive behaviour or misconduct with the
            faculty will not be tolerated. If such incidents are brought to our
            notice, we will give a warning and counsel the candidate.
          </p>
          <p>
            A repeat misconduct will lead to the admission being revoked and the
            student barred from our institute.
          </p>
          <p>
            Our courses require a fair amount of dedication from our students.
            Our faculty are committed to your success and will try their best to
            coach and guide you. But if we feel that the student is unable to
            perform or complete the course within the stipulated time, we
            reserve the right to ask the student to leave the course.
          </p>
        </div>
        <br />
        <div>
          <span>Course Content and Format:</span> <br />
          <p>
            Each course runs for a scheduled period of time. The timings and
            schedule will be fixed by us. No two courses are the same hence the
            content, structure and format of a course you previously attended
            may be different from the one you are attending now. While the basic
            structure of each course is the same, we try to continually improve
            them and there may be minor transitions.
          </p>
          <br />
          <span>Learning Deposit:</span> <br />
          <p>
            If you have decided to pursue a course and want to enrol for the
            same, you have to pay an initial deposit of INR . This is a
            non-refundable deposit and will be retained by us even if you are
            unable to attend or cancel your admission due to unavoidable
            circumstances or your admission is revoked by us.
          </p>
        </div>
      </div>
    </>
  );
};

export default Term;
