import React from "react";
import "./Home.scss";
import Intro from "./Intro/Intro";
import Animation from "./IPhone-x/Animation";
import Description from "./Description/Description";
import Begin from "./Beginers/Begin";
import Students from "./Students/Students";

const Home = () => {
  return (
    <>
    <section>
      <Intro/>
    </section>
    <section id="desp">
      <Description/>
    </section>
    <section>
      <Begin/>
    </section>
    <section id="students_home">
      <Students/>
    </section>
    <section>
      <Animation/>
    </section>
    </>
  );
};

export default Home;
