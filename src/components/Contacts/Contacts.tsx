import React from 'react'
import { useForm } from 'react-hook-form'
import myIcon from '../../assets/images/map_logo.png'
import {Map, Placemark, YMaps, ZoomControl} from 'react-yandex-maps'
import { ReactComponent as Footer} from '../../assets/images/footer.svg'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Contacts.scss'

type Props = {}

type FormData = {
  email: string,
  subject: string,
  message: string,
}

const footerVariants = {
  hidden: { y: 300, opacity: 0},
  visible: { y: 0, opacity: 1, transition: { duration: 3, type: 'spring' }}
}


const Contacts: React.FC<Props> = (props) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  })

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => console.log(data));

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
        <form className="message-form" onSubmit={onSubmit}>
          <label>
            <p>Ваше имя</p>
            <input {...register("subject")} />
          </label>
          <label>
            <p>E-mail
              {errors.email && (
                <span className="error">&nbsp;необходимо заполнить</span>
              )}
            </p>
            <input {...register("email",{ required: true })} />
          </label>
          <label>
            <p>Ваше сообщение
              {errors.message && (
              <span className="error">&nbsp; отсутствует, не стесняйтесь</span>
            )}</p>
            <textarea {...register("message",{ required: true })} />
          </label>
          <input className="send" type="submit" value="Отправить" />
        </form>
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
