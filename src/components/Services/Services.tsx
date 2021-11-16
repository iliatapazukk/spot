import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactComponent as Mosque} from '../../assets/images/mosque.svg'
import './Services.scss'

const residents = [
  {text: 'Кофейня и коворкинг'},
  {text: 'Шоу-рум с натуральной и hand-made продукцией от местных мастеров'},
  {text: 'Событийная площадка: мастер-классы, музыкальные вечеринки, киновечера, встречи по интересам'},
  {text: 'Массажный кабинет и тату-студия'},
  {text: 'Инфоцентр для туристов, где можно взять в аренду туристическое снаряжение, принять душ и воспользоваться прачечной'},
]

const residentVariants = {
  visible: (index) => ({
    opacity: 1,
    transition: {
      delay: index * 0.5,
    },
    y: 0,
  }),
  hidden: {
    opacity: 0,
    y: 100,
  }
}

const mosqueVariants = {
  hidden: { x: -400, opacity: 0},
  visible: { x: 0, opacity: 1, transition: { duration: 2 }}
}

const Services: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  })
  return (
    <div className="Services" id="Services">
      <h3 className="header">Что мы делаем</h3>
      <div className="content">
        <motion.div
          variants={mosqueVariants}
          animate={inView ? 'visible' : 'hidden'}
          className="mosque">
          <Mosque/>
        </motion.div>
        <div className="text" ref={ref}>
          <p>Мы видим SPOT как открытое пространство для неформального общения,
            воплощения в жизнь крутых творческих идей и предоставления востребованных
            сервисов для жителей и гостей Долины.</p>
          <p><b>Наши сервисы или услуги</b></p>
            <ul className="residents">
              {residents.map((resident, index) => (
                <motion.li
                  variants={residentVariants}
                  animate={inView ? 'visible' : 'hidden'}
                  key={index}
                  custom={index}
                >
                  {resident.text}
                </motion.li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Services
