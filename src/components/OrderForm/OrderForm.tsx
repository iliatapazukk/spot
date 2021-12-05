import React from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import Confetti from 'react-dom-confetti'
import './OrderForm.scss'

type Props = {
  totalOrder: string,
  totalCart: number,
  storeCallback: () => void
}

const OrderForm: React.FC<Props> = (props) => {

  const confetti = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
  }

  const [isEmailSend, setIsEmailSend] = React.useState<boolean>(false)
  const API_PATH = 'https://spotcreative.space/api/order/index.php'
  type FormData = {
    email: string,
    messengerNumber: string,
    messengerType: string,
    name: string,
    address: string,
    totalOrderSum: number,
    totalOrderText: string,
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

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
        props.storeCallback()
      })
      .catch((error) => {
        setIsEmailSend(false)
        console.log(error)
      })
  }

  const contactData = [
    {
      value: "Telegram",
      label: "Telegram"
    },{
      value: "Whatsapp",
      label: "Whatsapp"
    },{
      value: "Viber",
      label: "Viber"
    },{
      value: "Phone",
      label: "Телефон"
    },
  ];

  return (
    <div className="OrderForm">
      {isEmailSend ? (
        <AnimatePresence>
          <motion.div
            className="success"
            initial={{ opacity: 0, scale: 0, borderRadius: '50%' }}
            animate={{ opacity: 1,  scale: 1, borderRadius: '8px', transition: {duration: 1.2} }}
          >
            <h4>Спасибо за ваш заказ!</h4>
            <p>Наш менеджер свяжется с вами в ближайшее время</p>
          </motion.div>
        </AnimatePresence>
      ) : (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>ФИО</p>
          <input {...register("name")} />
        </label>
        <label>
          <p>Выберете удобный для вас вид связи через мессенджер</p>
          <div className="combined">
            <select {...register("messengerType")}>
              {contactData.map((contact, index) =>
                <option value={contact.value} key={index}>{contact.label}</option>
              )})
            </select>
            <input {...register("messengerNumber")} />
          </div>
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
          <p>Адрес доставки
            {errors.address && (
              <AnimatePresence>
                <motion.span
                  className="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: {duration: 1} }}
                >&nbsp; должен быть указан</motion.span>
              </AnimatePresence>
            )}</p>
          <textarea
            placeholder="Почтовый индекс, город, улица, дом, квартира"
            maxLength={1600}
            {...register("address",{ required: true })}
          />
        </label>
        <input type="hidden" value={props.totalOrder} {...register("totalOrderText")}/>
        <input type="hidden" value={props.totalCart} {...register("totalOrderSum")}/>
        <input className="send" type="submit" value="Отправить" />
      </form>
      )}
      <Confetti active={isEmailSend} config={confetti}/>
    </div>
  )
}

export default React.memo(OrderForm)
