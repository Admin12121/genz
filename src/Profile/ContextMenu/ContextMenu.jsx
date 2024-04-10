import React from 'react'
import "./Menu.scss"
import { Link } from 'react-router-dom';

const ContextMenu = () => {
      const handleCopyClick = () => {
        // Specify the selector for the element you want to copy
        const elementToCopy = document.querySelector("#idder"); // Change "#elementId" to the actual selector of the element
    
        if (elementToCopy) {
          const textToCopy = elementToCopy.textContent || elementToCopy.innerText;
    
          // Create a temporary textarea element to copy the text
          const tempTextarea = document.createElement("textarea");
          tempTextarea.value = textToCopy;
    
          // Append the textarea to the document
          document.body.appendChild(tempTextarea);
    
          // Select the text in the textarea
          tempTextarea.select();
    
          // Execute the copy command
          document.execCommand("copy");
    
          // Remove the temporary textarea
          document.body.removeChild(tempTextarea);
    
          console.log("Text copied!");
        } else {
          console.error("Element not found or does not have text content.");
        }
      };
    
  return (
    <>
        <div id='idder' className={`Menu_wrapper`}>
            <div className="context_menu">
            <span>
            <button onClick={()=>{window.location.reload();}} className="Menu_icons_wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path  fill="var(--main-color)" d="M17.65 6.35c-1.63-1.63-3.94-2.57-6.48-2.31-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20c3.19 0 5.93-1.87 7.21-4.56.32-.67-.16-1.44-.9-1.44-.37 0-.72.2-.88.53-1.13 2.43-3.84 3.97-6.8 3.31-2.22-.49-4.01-2.3-4.48-4.52C5.31 9.44 8.26 6 12 6c1.66 0 3.14.69 4.22 1.78l-1.51 1.51c-.63.63-.19 1.71.7 1.71H19c.55 0 1-.45 1-1V6.41c0-.89-1.08-1.34-1.71-.71l-.64.65z"/></svg>
                <span>
                    Refresh
                </span>
            </button>
            </span>
            <span>
            <button className="Menu_icons_wrapper" onClick={handleCopyClick}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path  fill="var(--main-color)" d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"/></svg>
                <span>
                    Copy
                </span>
            </button>
            </span>
            <span>
            <button className="Menu_icons_wrapper">
            <svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Iconly/Light/Send" stroke="#000000"  strokeWidth="1.5"  fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                    <g id="Send" transform="translate(3.000000, 3.000000)" stroke="var(--main-color)"  strokeWidth="1.5" >
                        <path d="M12.8324759,5.17463303 L7.10903824,10.9591851 L0.599436312,6.88767232 C-0.333249591,6.30414294 -0.139234755,4.88743509 0.915720913,4.57892564 L16.3712257,0.0527673159 C17.3372579,-0.230371288 18.2325555,0.67283071 17.9455752,1.6419969 L13.3730902,17.0867511 C13.059837,18.1431929 11.6512085,18.331952 11.073206,17.3952605 L7.10600676,10.9602"></path>
                    </g>
                </g>
            </svg>
                <span>
                    Share
                </span>
            </button>
            </span>
            <span>
            <button className="Menu_icons_wrapper">
            <svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Iconly/Light/Danger-Circle" stroke="var(--main-color)"  strokeWidth="2"  fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                    <g id="Danger-Circle" transform="translate(2.000000, 2.000000)" stroke="var(--main-color)" >
                        <path d="M10.0001,0.7501 C15.1081,0.7501 19.2501,4.8911 19.2501,10.0001 C19.2501,15.1081 15.1081,19.2501 10.0001,19.2501 C4.8911,19.2501 0.7501,15.1081 0.7501,10.0001 C0.7501,4.8911 4.8911,0.7501 10.0001,0.7501 Z" id="Stroke-1" strokeWidth="2" ></path>
                        <line x1="9.9952" y1="6.2042" x2="9.9952" y2="10.6232" id="Stroke-3" strokeWidth="2" ></line>
                        <line x1="9.995" y1="13.7961" x2="10.005" y2="13.7961" id="Stroke-5" strokeWidth="2" ></line>
                    </g>
                </g>
            </svg>
                <span>
                    Report
                </span>
            </button>
            </span>
            {/* <button className="Menu_icons_wrapper">
                <FontAwesomeIcon icon={faCartShopping}/>
                <span>
                    Add to cart
                </span>
            </button> */}
            <span>
            <Link className='ahref' to="/settings">
            <button className="Menu_icons_wrapper ahrefff">
                <svg width="24px"  height="24px"  viewBox="0 0 24 24"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g id="Iconly/Light/Setting" stroke="var(--main-color)"  strokeWidth="2"  fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                        <g id="Setting" transform="translate(2.500000, 1.500000)" stroke="var(--main-color)"  strokeWidth="2" >
                            <path d="M18.3066362,6.12356982 L17.6842106,5.04347829 C17.1576365,4.12955711 15.9906873,3.8142761 15.0755149,4.33867279 L15.0755149,4.33867279 C14.6398815,4.59529992 14.1200613,4.66810845 13.6306859,4.54104256 C13.1413105,4.41397667 12.7225749,4.09747295 12.4668193,3.66132725 C12.3022855,3.38410472 12.2138742,3.06835005 12.2105264,2.74599544 L12.2105264,2.74599544 C12.2253694,2.22917739 12.030389,1.72835784 11.6700024,1.3576252 C11.3096158,0.986892553 10.814514,0.777818938 10.2974829,0.778031878 L9.04347831,0.778031878 C8.53694532,0.778031878 8.05129106,0.97987004 7.69397811,1.33890085 C7.33666515,1.69793166 7.13715288,2.18454839 7.13958814,2.69107553 L7.13958814,2.69107553 C7.12457503,3.73688099 6.27245786,4.57676682 5.22654465,4.57665906 C4.90419003,4.57331126 4.58843537,4.48489995 4.31121284,4.32036615 L4.31121284,4.32036615 C3.39604054,3.79596946 2.22909131,4.11125048 1.70251717,5.02517165 L1.03432495,6.12356982 C0.508388616,7.03634945 0.819378585,8.20256183 1.72997713,8.73226549 L1.72997713,8.73226549 C2.32188101,9.07399614 2.68650982,9.70554694 2.68650982,10.3890161 C2.68650982,11.0724852 2.32188101,11.704036 1.72997713,12.0457667 L1.72997713,12.0457667 C0.820534984,12.5718952 0.509205679,13.7352837 1.03432495,14.645309 L1.03432495,14.645309 L1.6659039,15.7345539 C1.9126252,16.1797378 2.3265816,16.5082503 2.81617164,16.6473969 C3.30576167,16.7865435 3.83061824,16.7248517 4.27459956,16.4759726 L4.27459956,16.4759726 C4.71105863,16.2212969 5.23116727,16.1515203 5.71931837,16.2821523 C6.20746948,16.4127843 6.62321383,16.7330005 6.87414191,17.1716248 C7.03867571,17.4488473 7.12708702,17.764602 7.13043482,18.0869566 L7.13043482,18.0869566 C7.13043482,19.1435014 7.98693356,20.0000001 9.04347831,20.0000001 L10.2974829,20.0000001 C11.3504633,20.0000001 12.2054882,19.1490783 12.2105264,18.0961099 L12.2105264,18.0961099 C12.2080776,17.5879925 12.4088433,17.0999783 12.7681408,16.7406809 C13.1274382,16.3813834 13.6154524,16.1806176 14.1235699,16.1830664 C14.4451523,16.1916732 14.7596081,16.2797208 15.0389017,16.4393593 L15.0389017,16.4393593 C15.9516813,16.9652957 17.1178937,16.6543057 17.6475973,15.7437072 L17.6475973,15.7437072 L18.3066362,14.645309 C18.5617324,14.2074528 18.6317479,13.6859659 18.5011783,13.1963297 C18.3706086,12.7066935 18.0502282,12.2893121 17.6109841,12.0366133 L17.6109841,12.0366133 C17.17174,11.7839145 16.8513595,11.3665332 16.7207899,10.876897 C16.5902202,10.3872608 16.6602358,9.86577384 16.9153319,9.42791767 C17.0812195,9.13829096 17.3213574,8.89815312 17.6109841,8.73226549 L17.6109841,8.73226549 C18.5161253,8.20284891 18.8263873,7.04344892 18.3066362,6.13272314 L18.3066362,6.13272314 L18.3066362,6.12356982 Z" id="Path_33946"></path>
                            <circle id="Ellipse_737" cx="9.67505726" cy="10.3890161" r="2.63615562"></circle>
                        </g>
                    </g>
                </svg>
                <span>
                    Settings
                </span>
            </button>
                </Link>
            </span>
            </div>
        </div>
     </>
  )
}

export default ContextMenu
