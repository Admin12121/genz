import DevHome from './Dev_Home/DevHome'
import Propert from './Propert/Propert'
import './style.scss'
import Footer_dev from './Dev_footer/Footer_dev'
import Client from './clients/Client'
import Header from './Header/Header'

const Development = () => {

  return (
    <>
    <Header/>
      <section>
        <DevHome/>
      </section>
        <Propert/>
        <Client/>
      <Footer_dev/>
    </>
  )
}

export default Development
