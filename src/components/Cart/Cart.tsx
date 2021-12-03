import React from 'react'
import { connect } from 'react-redux'
import {IncreaseQuantity, DecreaseQuantity, DeleteCart} from '../../actions/cartActions'
import CartItem from './CartItem'
import {Link} from 'react-router-dom'
import {ReactComponent as Spot} from '../../assets/images/spot.svg'
import {ReactComponent as Gift} from '../../assets/images/giftbox.svg'
import {AnimatePresence, motion} from 'framer-motion'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import './Cart.scss'

type Props = {
  items: any,
  IncreaseQuantity: any,
  DecreaseQuantity: any,
  DeleteCart: any,
}

const mapStateToProps = state =>{
  return{
    items:state._todoProduct
  }
}

const Cart: React.FC<Props> = (props) => {
  let ListCart = []
  let TotalCart = 0
  Object.keys(props.items.Carts).forEach(function(item){
    TotalCart += props.items.Carts[item].quantity * props.items.Carts[item].price;
    // @ts-ignore
    ListCart.push(props.items.Carts[item]);
  })
  // @ts-ignore
  const totalOrderText = ListCart.map((gift) => { return gift.title + ' ' + gift.quantity });
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
  } = useForm<FormData>();

  ListCart = []
  console.log('!!!:', ListCart.length)
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
        ListCart = []
        TotalCart = 0
      })
      .catch((error) => {
        setIsEmailSend(false)
        console.log('!!!', error)
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
    <div className="Cart">
      <header className="header">
          <Link to="/">
            <Spot className="logo" />
          </Link>
          <Link to="/gift-basket" className="back">
            Вернуться к подаркам <Gift/>
          </Link>
      </header>
      <div className="content">
        <h2>Корзина подарков</h2>
        <div className="collection">
          {ListCart.length > 0 ? (
            ListCart.map( (item: any, key) => {
              return (
                  <CartItem
                    key={key}
                    price={item.price}
                    img={item.img}
                    title={item.title}
                    desc={item.desc}
                    quantity={item.quantity}
                    add={()=> props.IncreaseQuantity(key)}
                    subtract={()=> props.DecreaseQuantity(key)}
                    remove={() => props.DeleteCart(key)}
                  />
                )
              })
            ) : (
              <div className="empty">
                <h4>Корзина пуста</h4>
              </div>
            )}
        </div>
        {TotalCart > 0 && (
          <h3 className="total">Общая сумма заказа: <b>{TotalCart}₽</b></h3>
        )}

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
        <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
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
          <input type="hidden" value={totalOrderText.toString()} {...register("totalOrderText")}/>
          <input type="hidden" value={TotalCart} {...register("totalOrderSum")}/>
          <input className="send" type="submit" value="Отправить" />
        </form>
        )}
      </div>
    </div>
  )
}

export default connect(mapStateToProps,{IncreaseQuantity, DecreaseQuantity, DeleteCart})(Cart)
