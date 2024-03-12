import React from 'react'
import Button from '../../Components/Button'
import Beginers from './Beginers'
import './Begin.scss'
import {Link} from "react-router-dom"

const Begin = () => {
  return (
    <>
      <div className="Begin">
        <div id="three">
          <Beginers/>
        </div>
        <div className="Begin_text_wrapper">
          <span>Beginners welcome</span>
          <h1>Start Coding in seconds</h1>
          <p>Go a head, Dive into the coding adventure! From day one, you'll be crafting real code in our hands-on learning playground.</p>
          <span>
            <Link to="course">
          <Button text="Start lesson →"/>
            </Link>
          <a href="">More beginner courses</a>
          </span>
        </div>
        <div className="small_screen">
        <img src='https://gist.githubusercontent.com/mondenoir/995f7044c4b789858ae804911d7fd83e/raw/792c146cda9fa2a38de144babc5853646f64ed79/ipad.svg' alt='iPad'/>
        </div>
      </div>
    </>
  )
}

export default Begin
