import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactComponent as Spot} from '../../assets/images/spot.svg'
import { ReactComponent as Cart} from '../../assets/images/cart.svg'
import Gift from './Gift'
import { connect } from 'react-redux'
import { addToCart } from '../../actions/cartActions'
import './GiftBasket.scss'

type Props = {
  //TODO: прописать типы
  items: any
  addToCart: any
  addedItems: any
}

const mapStateToProps = (state) => {
  console.log('!!! state:', state)
  return {
    items: state.items,
    addedItems: state.addedItems
  }
}

const mapDispatchToProps = (dispatch)=>{
 return{
    addToCart: (id)=>{dispatch(addToCart(id))}
  }
}

const GiftBasket: React.FC<Props> = (props) => {
  const handleClick = (id) => {
    props.addToCart(id)
  }
  const counter = Object.keys(props.addedItems).length
  console.log('!!! counter:', )

  return (
    <div className="GiftBasket">
      <header className="header">
        <div>
          <Link to="/">
            <Spot className="logo" />
          </Link>
        </div>
        <Link to="/cart" className="order">
          <AnimatePresence>
            { counter !== 0 && (
              <motion.div
                initial={{ opacity: 0, x: -150 }}
                animate={{ opacity: 1, x: 0}}
                transition={{ duration: 1, type: 'spring' }}
                exit={{ opacity: 0 }}
              >
                <b>Оформить заказ</b>
              </motion.div>
            )}
            <div className="cart">
              { counter !== 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 2 }}
                  animate={{ opacity: 1,  scale: 1 }}
                  transition={{ duration: 1, type: 'spring' }}
                  exit={{ opacity: 0 }}
                  className="counter"
                >{counter}</motion.div>
              )}
              <Cart />
            </div>
          </AnimatePresence>
        </Link>
      </header>
      <div className="content">
        <h2>Подарочные наборы от Спота</h2>

        <div className="items">
          { props.items.map(item => {
              return (
                <Gift
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  desc={item.desc}
                  price={item.price}
                  img={item.img}
                  addToCart= {async () => handleClick(item.id)}
                />
              )
            })
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(GiftBasket)
