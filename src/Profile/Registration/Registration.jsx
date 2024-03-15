import React,{useEffect} from 'react'
import './reg.scss'
import Form from './Form'
const Registration = ({api}) => {

  return (
    <>
    <div className="projects-section">
      <Form api={api}/>
    </div>
    </>
  )
}

export default Registration
