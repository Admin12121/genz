import React,{useEffect} from 'react'
import Admission from '../../Admission/Admission'
import './reg.scss'
import Form from './Form'
const Registration = ({api}) => {

  return (
    <>
    <div className="projects-section">
      {/* <Admission/> */}
      <Form api={api}/>
    </div>
    </>
  )
}

export default Registration
