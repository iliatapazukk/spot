import React from 'react'
import { connect } from 'react-redux'
import CartItem from './CartItem'
import {Link} from 'react-router-dom'
import {ReactComponent as Spot} from '../../assets/images/spot.svg'
import './Cart.scss'

type Props = {
  items: any
}

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    addedItems: state.addedItems,
  }
}

const Cart: React.FC<Props> = (props) => {
  return (
    <div className="Cart">
      <header className="header">
        <div>
          <Link to="/">
            <Spot className="logo" />
          </Link>
        </div>
      </header>
      <div className="content">
        <h2>Корзина подарков</h2>
        <div className="collection">
          {props.items.length ? (
              props.items.map( item => {
                return (
                  <CartItem
                    key={item.id}
                    price={item.price}
                    img={item.img}
                    title={item.title}
                    desc={item.desc}
                    quantity={item.quantity}
                  />
                )
              })
            ) : (
              <div className="empty">
                <h4>Корзина пуста</h4>
              </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Cart)
