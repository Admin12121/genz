import React from 'react'
import './About.scss'
import First from './Aboutfirst/First'
import Second_about from './Aboutfirst/Second_about'
import Team from './OurTeam/Team'

const About = () => {
  return (
    <>
      <section>
        <First/>
      </section>
      <section>
        <Second_about/>
      </section>
      <section id='team'>
        <Team/>
      </section>
    </>
  )
}

export default About
