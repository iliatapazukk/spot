import React from 'react'
import { connect } from 'react-redux'
import { IncreaseQuantity, DecreaseQuantity, DeleteCart, ClearCart } from '../../actions/cartActions'
import OrderForm from '../OrderForm'
import CartItem from './CartItem'
import {Link} from 'react-router-dom'
import {ReactComponent as Spot} from '../../assets/images/spot.svg'
import {ReactComponent as Gift} from '../../assets/images/giftbox.svg'
import {AnimatePresence, motion} from 'framer-motion'
import Backdrop from '../Backdrop';
import './Cart.scss'

type Props = {
  items: any,
  IncreaseQuantity: any,
  DecreaseQuantity: any,
  DeleteCart: any,
  ClearCart: any,
}

const mapStateToProps = state => { return { items:state._todoProduct }}

const Cart: React.FC<Props> = (props) => {
  let ListCart = []
  let TotalCart = 0
  if (props.items.Carts) {
    Object.keys(props.items.Carts).forEach(
      (item) => {
        TotalCart += props.items.Carts[item].quantity * props.items.Carts[item].price;
        // @ts-ignore
        ListCart.push(props.items.Carts[item])
    })
  }

  type gift = {
    title: string,
    quantity: number
  }
  const totalOrderText = ListCart.map((gift: gift) => { return gift.title + ' ' + gift.quantity });

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);


  const dropIn = {
    hidden: {
      y: '-100vh',
      opacity: 0,
      transform: 'scale(0) rotateX(-360deg)',
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.2,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: '-100vh',
      opacity: 0,
    },
  };

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
          {ListCart.length ? (
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
          <div className="total">
            <h3>Общая сумма: <b>{TotalCart}₽</b></h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="order-button"
              onClick={() => (modalOpen ? close() : open())}
            >
            Оформить заказ
            </motion.button>
          </div>
        )}

        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {modalOpen && (
            <Backdrop onClick={close}>
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal orange-gradient"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <OrderForm
                  totalCart={ TotalCart }
                  storeCallback={() => props.ClearCart()}
                  totalOrder={ totalOrderText.toString() }
                />
              </motion.div>
            </Backdrop>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default connect(mapStateToProps,{IncreaseQuantity, DecreaseQuantity, DeleteCart, ClearCart})(Cart)
