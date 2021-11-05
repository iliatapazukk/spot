import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactComponent as House } from '../../assets/images/house.svg'
import './About.scss'

const About: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  })

  const houseVariants = {
    hidden: {
      x: 400,
    },
    visible: {
      x: -20,
    }
  }
  const textVariants = {
    visible: { opacity: 1, scale: 1, y: 50 },
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: 0
    }
  }

  return (
    <div className="About" id="About">
      <h2 className="header">Привет, друг!</h2>
      <motion.div
        className="house"
        animate={inView ? 'visible' : 'hidden'}
        variants={houseVariants}
        ref={ref}
        transition={{
          duration: 1,
        }}
      >
        <House className="house"/>
      </motion.div>
      <motion.div
        animate={inView ? 'visible' : 'hidden'}
        variants={textVariants}
        transition={{duration: 1, ease: 'easeOut'}}
        ref={ref}
        className="text"
      >
        <p>Когда окажешься в Бельбекской долине, заходи в гости - у нас всегда происходит что-нибудь интересное!</p>
        <p>В нашем пространстве - приятная релакс-атмосфера, качественный кофе, разноплановые события, шоу-рум с
          аутентичными товарами от местных мастеров и удивительные вдохновляющие люди)</p>
        <p>Мы очень любим гостей и будем рады сориентировать на местности: всегда подскажем, где можно переночевать
          или по какому живописному маршруту пройти.</p>
      </motion.div>
    </div>
  )
}

export default About
