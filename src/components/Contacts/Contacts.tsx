import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import myIcon from '../../assets/images/map_logo.png'
import {Map, Placemark, YMaps, ZoomControl} from 'react-yandex-maps'
import { ReactComponent as Footer} from '../../assets/images/footer.svg'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Contacts.scss'

type Props = {}

const API_PATH = 'https://spotcreative.space/api/contact/index.php'

type FormData = {
  email: string,
  subject: string,
  message: string,
}

const footerVariants = {
  hidden: { y: 300, opacity: 0},
  visible: { y: 0, opacity: 1, transition: { duration: 3}}
}


const Contacts: React.FC<Props> = (props) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  })

  const [isEmailSend, setIsEmailSend] = React.useState<boolean>(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = (data) => {
    axios({
      method: 'POST',
      url: `${API_PATH}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then((response) => {
        setIsEmailSend(true)
        console.log('!!! ', response)
      })
      .catch((error) => {
        setIsEmailSend(false)
        console.log('!!!', error)
      })
  }

  //TODO: проставить типы
  const mapState: any = {
    center: [44.550921, 33.957080],
    zoom: 18,
    mapAutoFocus: false,
    controls: ['zoomControl'],
    disable: 'scrollZoom',
    behaviors: ["disable('scrollZoom')"]
  };

  const placeMarkState: any = {
    geometry: [44.550896, 33.957255],
    options: {
      iconLayout: 'default#image',
      iconImageHref: myIcon,
      iconImageSize: [32, 32],
      iconImageOffset: [-16, -16],
    },
  }

  return (
    <div className="Contacts" id="Contacts" ref={ref}>
      <div className="contact-form">
        <div className="text">
          <h3>Напишите нам</h3>
          <p>
            Если у вас есть вопросы, пожелания или предложения, напишите нам. <br/>
            или задайте вопрос в нашем <br />
            <a href="https://t.me/spot_chat" target="_blank" rel="noreferrer noopener">телеграм-канале</a>
          </p>
        </div>
          {isEmailSend ? (
            <AnimatePresence>
              <motion.div
                className="success"
                initial={{ opacity: 0, scale: 0, borderRadius: '50%' }}
                animate={{ opacity: 1,  scale: 1, borderRadius: '8px', transition: {duration: 1.2} }}
                >
                <h4>Спасибо за ваше сообщение!</h4>
              </motion.div>
            </AnimatePresence>
          ) : (
            <form
              className="message-form" onSubmit={handleSubmit(onSubmit)}>
              <label>
                <p>Ваше имя</p>
                <input {...register("subject")} />
              </label>
              <label>
                <p>E-mail
                  {errors.email && (
                    <AnimatePresence>
                      <motion.span
                        className="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: {duration: 1} }}
                      >, обязательное поле или неверный формат</motion.span>
                    </AnimatePresence>
                  )}
                </p>
                <input {...register("email",{
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: ''
                  }
                })} />
              </label>
              <label>
                <p>Ваше сообщение
                  {errors.message && (
                  <AnimatePresence>
                    <motion.span
                      className="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: {duration: 1} }}
                    >&nbsp; не заполнено, не стесняйтесь</motion.span>
                  </AnimatePresence>
                )}</p>
                <textarea
                  maxLength={1600}
                  {...register("message",{ required: true })}
                />
              </label>
              <input className="send" type="submit" value="Отправить" />
        </form>
          )}
      </div>
      <div  className="location">
        <h3>Локация</h3>
        <div className="text">
          <p>Крым, Бахчисарайский район,<br />
            с. Соколиное, ул. Ленина, д. 6</p>
        </div>
        <div className="map">
          <YMaps query={{ load: 'control.ZoomControl' }}>
            <Map
              width="100%"
              height="100%"
              state={mapState}
            >
              <ZoomControl/>
              <Placemark {...placeMarkState}/>
            </Map>
          </YMaps>
        </div>
      </div>
      <motion.div
        animate={inView ? 'visible' : 'hidden'}
        variants={footerVariants}
        className="footer">
        <Footer/>
      </motion.div>
    </div>
  )
}

export default React.memo(Contacts)
