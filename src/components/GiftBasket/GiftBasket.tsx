import React from 'react'
import {Link} from 'react-router-dom'
import {motion, AnimatePresence} from 'framer-motion'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {ReactComponent as Spot} from '../../assets/images/spot.svg'
import {ReactComponent as Cart} from '../../assets/images/cart.svg'
import {ReactComponent as Divider} from '../../assets/images/divider-mono.svg'
import Gift from './Gift'
import GiftSlides from '../GiftSlides'
import {AddCart} from '../../actions/cartActions'
import './GiftBasket.scss'

type Props = {
  //TODO: прописать типы
  products: any
  AddCart?: any
  numberCart: number
  carts: any
}

const GiftBasket: React.FC<Props> = (props) => {
  const {products} = props.products

  const isSelected = (id) => {
    return props.carts.find(item => item.id === id)
  }

  return (
    <div className="GiftBasket">
      <Helmet>
        <title>Что привезти из Крыма в подарок? Купить подарок онлайн с доставкой.</title>
        <meta name="description" content="Ищите что привезти из Крыма в подарок? Купить сувениры и наборы из Горного
        Крыма с доставкой."/>
      </Helmet>
      <Divider className="divider"/>
      <header className="header">
        <div>
          <Link to="/">
            <Spot className="logo"/>
          </Link>
        </div>
        <Link to="/cart" className="order">
          <AnimatePresence>
            {props.numberCart && props.numberCart !== 0 && (
              <motion.div
                initial={{opacity: 0, x: -150}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 1, type: 'spring'}}
                exit={{opacity: 0}}
              >
                <b>Оформить заказ</b>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            <div className="cart">
              {props.numberCart !== 0 && (
                <motion.div
                  initial={{opacity: 0, scale: 3}}
                  animate={{opacity: 1, scale: 1}}
                  transition={{duration: 1, type: 'spring'}}
                  exit={{opacity: 0, scale: 2}}
                  className="counter"
                >{props.numberCart}</motion.div>
              )}
              {props.numberCart !== 0 && (<Cart/>)}
            </div>
          </AnimatePresence>
        </Link>
      </header>
      <div className="content">
        <h2>Крымский тёплый подарок 🧡</h2>
        <h4>Порадуйте своих друзей, близких или самих себя подарком, согревающим сердце. Подарок, который мы доставим к
          вам прямиком из горного Крыма. Атмосфера этих мест притянула и объединила самых различных мастеров,
          поддерживающих единые ценности. Из продуктов их творчества мы и собрали для вас эти подарочные наборы. Все
          элементы набора сделаны вручную из натуральных ингредиентов, главный из которых - любовь! Купить подарок из
          Крыма онлайн с доставкой по России.</h4>
        <GiftSlides />
        <div className="items">
          {products.length > 0 && (
            products.map((item, key) => {
                return (
                  <Gift
                    key={key}
                    id={item.id}
                    title={item.title}
                    desc={item.desc}
                    price={item.price}
                    img={item.img}
                    selected={isSelected(item.id)}
                    addToCart={() => props.AddCart(item)}
                  />
                )
              }
            )
          )}
        </div>
        <div className="note">
          <p>По возникшим вопросам обращайтесь в <b>Whatsapp: +7 (995) 599-42-55</b></p>
          <p>*Часть изделий выполнена в единичном экземпляре, поэтому ваше изделие (керамика, новогодняя игрушка) может
            отличаться от изображенного на картинке</p>
          <p>**Доставка Почтой России в ближайшее к вам отделение включена в стоимость подарка</p>
          <p>***Доставку посылки на дом можно заказать дополнительно напрямую у Почты России, оставив заявку на сайте
            или позвонив по телефону: <a href="https://www.pochta.ru/support/post-rules/home-delivery" target="_blank"
                                         rel="noopener nofollow">https://www.pochta.ru/support/post-rules/home-delivery</a>
          </p>
        </div>
        <div className="comeback">
          <Link to="/">
            &larr; Вернуться назад
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state._todoProduct,
    numberCart: state._todoProduct.numberCart,
    carts: state._todoProduct.Carts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AddCart: item => dispatch(AddCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftBasket)
