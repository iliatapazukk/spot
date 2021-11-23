import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactComponent as Spot} from '../../assets/images/spot.svg'
import { ReactComponent as Cart} from '../../assets/images/cart.svg'
import Gift from './Gift'
import { connect } from 'react-redux'
import { AddCart } from '../../actions/cartActions'
import './GiftBasket.scss'

type Props = {
  //TODO: прописать типы
  _products: any
  AddCart?: any
}

const GiftBasket: React.FC<Props> = (props) => {
  const {_products} = props._products
  console.log('!!! products:', _products)
  const handleClick = (item) => {
    console.log('!!! item:', item)
    AddCart(item)
  }

  // const isSelected = (id) => {
  //   return props.addedItems.find(item => item.id === id)
  // }
  // const [counter, setCounter] = React.useState<number>(0)
  // React.useEffect(() => {setCounter(Object.keys(props.addedItems).length)}, [props.addedItems])
  return (
    <div className="GiftBasket">
      <header className="header">
        <div>
          <Link to="/">
            <Spot className="logo" />
          </Link>
        </div>
        <Link to="/cart" className="order">
          {/*<AnimatePresence>*/}
            {/*{ counter !== 0 && (*/}
              <motion.div
                initial={{ opacity: 0, x: -150 }}
                animate={{ opacity: 1, x: 0}}
                transition={{ duration: 1, type: 'spring' }}
                exit={{ opacity: 0 }}
              >
                <b>Оформить заказ</b>
              </motion.div>
            {/*)}*/}
            <div className="cart">
                {/*{ counter !== 0 && (*/}
                {/*  <motion.div*/}
                {/*    initial={{ opacity: 0, scale: 3 }}*/}
                {/*    animate={{ opacity: 1,  scale: 1 }}*/}
                {/*    transition={{ duration: 1, type: 'spring' }}*/}
                {/*    exit={{ opacity: 0, scale: 2 }}*/}
                {/*    className="counter"*/}
                {/*  >{counter}</motion.div>*/}
                {/*)}*/}
              <Cart />
            </div>
          {/*</AnimatePresence>*/}
        </Link>
      </header>
      <div className="content">
        <h2>Подарочные наборы от Спота</h2>
        <div className="items">
          {_products.length > 0 && (
            _products.map((item, key) => {
            return (
              <Gift
                key={key}
                id={item.id}
                title={item.title}
                desc={item.desc}
                price={item.price}
                img={item.img}
                selected={false}
                addToCart={()=> props.AddCart(item)}
              />
            )}
            )
          )}
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
  console.log('!!! state:', state)
  return {
    _products: state._todoProduct,
  };
}

function mapDispatchToProps(dispatch){
  return{
    AddCart:item => dispatch(AddCart(item))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GiftBasket)
