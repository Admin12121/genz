import React from 'react'

const Map = ({size}) => {
  console.log(size)
  return (
    <>
    <div className="map_wrapper">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.4809055668065!2d85.34317037528362!3d27.671527727070668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190536c1caa7%3A0xf92fcf603dac3960!2sSipalaya%20Info%20Tech%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1704596656269!5m2!1sen!2snp" width={size} height="350" style={{border:"0px",borderRadius:"16px"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    </>
  )
}

export default Map
