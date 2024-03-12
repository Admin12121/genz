import React from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../../Components/Button";
import Logout from "../../../Components/Logout";
import { unSetUserToken } from '../../../Fetch_Api/Feature/authSlice';
import {getToken, removeToken} from  '../../../Fetch_Api/Service/LocalStorageServices'

const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  close: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
  close: {
    y: 50,
    opacity: 0,
  },
};

const data = [
  {
    items: "All Courses",
    links: "course",
  },
  {
    items: "About Us",
    links: "about",
  },
  {
    items: "Development",
    links: "development",
  },
  {
    items: "Contact",
    links: "contact",
  },
];
const items = ["About Us", "Our Menu", "Our Services", "Allergy Advice"];

const Links = ({setOpen}) => {
  const { access_token } = getToken()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(unSetUserToken({ access_token: null }))
    removeToken()
    navigate('/')
  }
  return (
    <motion.div className="links" variants={variants}>
      {data.map(({ items, links }) => (
        <motion.span
          key={Math.random()}
          transition={{ type: "spring", stiffness: 100 }}
          variants={itemVariants}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.93 }}
        >
          <Link to={`/${links}`} onClick={()=> setOpen((prev)=>!prev)} className="ink">
            {items}
          </Link>
        </motion.span>
      ))}
              {access_token ?  <motion.div className="social" variants={itemVariants}>
        <Link>
          <Logout handleLogout={handleLogout} text="Log out" />
        </Link>
      </motion.div> :       <motion.div className="social" variants={itemVariants}>
        <Link to="login">
          <Button text="Log In" />
        </Link>
        <Link to="login">
          <Button text="Sign Up" />
        </Link>
      </motion.div>}

    </motion.div>
  );
};

export default Links;
