import React from "react";
import "./compo.scss";
import Lottie from "lottie-react";
import A4 from "./a1.json";
import A1 from "./a2.json";
import A5 from "./a3.json";
import A6 from "./a4.json";
import A3 from "./a5.json";
import A2 from "./a6.json";
const Comp_card = () => {
  return (
    <>
      <div id="bg-developer_mode" className="props_wrapper_development ">
        <div id="compo_cards">
            <div className="exp_card">
              <div className="exp-card-content">
                <div className="card-image">
                  <Lottie className="imp-image" animationData={A1} />
                </div>
                <div className="exp-exp-card-info-wrapper">
                  <div className="exp-card-info">
                    <i className="fa-duotone fa-apartment"></i>
                    <div className="exp-card-info-title">
                      <h3>Android Development</h3>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="exp_card">
              <div className="exp-card-content">
                <div className="card-image">
                  <Lottie className="imp-image" animationData={A2} />
                </div>
                <div className="exp-exp-card-info-wrapper">
                  <div className="exp-card-info">
                    <i className="fa-duotone fa-apartment"></i>
                    <div className="exp-card-info-title">
                      <h3>Web Development</h3>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="exp_card">
              <div className="exp-card-content">
                <div className="card-image">
                  <Lottie className="imp-image" animationData={A3} />
                </div>
                <div className="exp-exp-card-info-wrapper">
                  <div className="exp-card-info">
                    <i className="fa-duotone fa-apartment"></i>
                    <div className="exp-card-info-title">
                      <h3>UI UX</h3>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="exp_card">
              <div className="exp-card-content">
                <div className="card-image">
                  <Lottie className="imp-image" animationData={A4} />
                </div>
                <div className="exp-exp-card-info-wrapper">
                  <div className="exp-card-info">
                    <i className="fa-duotone fa-apartment"></i>
                    <div className="exp-card-info-title">
                      <h3>SEO</h3>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="exp_card">
              <div className="exp-card-content">
                <div className="card-image">
                  <Lottie className="imp-image" animationData={A5} />
                </div>
                <div className="exp-exp-card-info-wrapper">
                  <div className="exp-card-info">
                    <i className="fa-duotone fa-apartment"></i>
                    <div className="exp-card-info-title">
                      <h3>Graphic Deginer</h3>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="exp_card">
              <div className="exp-card-content">
                <div className="card-image">
                  <Lottie className="imp-image" animationData={A6} />
                </div>
                <div className="exp-exp-card-info-wrapper">
                  <div className="exp-card-info">
                    <i className="fa-duotone fa-apartment"></i>
                    <div className="exp-card-info-title">
                      <h3>Digital Markiting</h3>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Comp_card;
