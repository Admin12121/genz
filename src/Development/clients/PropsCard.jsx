
import {motion} from 'framer-motion'
const PropsCard = ({width}) => {

  const data = [
    {
      img:"https://i.pinimg.com/564x/83/e1/85/83e185921e0296870f2172557192abe4.jpg",
      name: "Martin",
      desc: "I can't stand when I have spent the last 47 minutes adjusting the rgb on my gradient only to have a dementor appear and suck my soul out.",
    },
    {
      img:"https://i.pinimg.com/564x/4d/1d/66/4d1d66cbd7998f91d83de8ceede4bc59.jpg",
      name: "Adrin",
      desc: "I can't stand when I have spent the last 47 minutes adjusting the rgb on my gradient only to have a dementor appear and suck my soul out.",
    },
    {
      img:"https://i.pinimg.com/564x/93/fa/c5/93fac528166218c917e66cbede6a8344.jpg",
      name: "Clark",
      desc: "I can't stand when I have spent the last 47 minutes adjusting the rgb on my gradient only to have a dementor appear and suck my soul out.",
    },
    {
      img:"https://i.pinimg.com/736x/f2/b9/49/f2b94946034a8d65cbedcf71ad4b9b85.jpg",
      name: "Jonson",
      desc: "I can't stand when I have spent the last 47 minutes adjusting the rgb on my gradient only to have a dementor appear and suck my soul out.",
    },
    {
      img:"https://i.pinimg.com/564x/bb/96/e0/bb96e00ff8fcee78bef6f1a5524f6193.jpg",
      name: "Kartal",
      desc: "I can't stand when I have spent the last 47 minutes adjusting the rgb on my gradient only to have a dementor appear and suck my soul out.",
    },
  ]
  return (
    <>
    <motion.div drag='x' dragConstraints={{right: 0, left: -width}} className="tert">
      {data.map(({img,name,desc},index)=>(
        <motion.div key={index} className="cardmart">
        <div className="card-contentmart">
          <div className="img_mart_wrapper">
            <img src={img} alt={name} />
          </div>
          <h3>{name}</h3>
      <p>{desc}</p>
        </div>
      </motion.div>
      ))}

    </motion.div>
    </>
  )
}

export default PropsCard
