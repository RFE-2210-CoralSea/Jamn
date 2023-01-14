import homePageStyles from '../styles/Home.module.css'
import { motion } from "framer-motion";
// import Vinyl from '../'


const home = () => {
  return (
    <div className={homePageStyles.mainContainer}>
      <motion.img className={homePageStyles.mainImage}
        src='/Vinyl.png'

      />
    </div>
  )
}

export default home