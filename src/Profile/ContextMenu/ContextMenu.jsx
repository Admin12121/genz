import React from 'react'
import { GrRefresh } from "react-icons/gr";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdContentCopy, MdReport } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
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
                <GrRefresh/>
                <span>
                    Refresh
                </span>
            </button>
            </span>
            <span>
            <button className="Menu_icons_wrapper" onClick={handleCopyClick}>
                <MdContentCopy/>
                <span>
                    Copy
                </span>
            </button>
            </span>
            <span>
            <button className="Menu_icons_wrapper">
                <IoShareSocialSharp/>
                <span>
                    Share
                </span>
            </button>
            </span>
            <span>
            <button className="Menu_icons_wrapper">
                <MdReport/>
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
            <Link className='ahref' to="/profile/settings">
            <button className="Menu_icons_wrapper ahrefff">
                <IoSettingsOutline/>
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
