import React from 'react'
import './CartItem.scss'
import {Link} from 'react-router-dom'

type Props = {
  img: string,
  title: string,
  desc: string,
  price: number,
  quantity: number,
}

const CartItem: React.FC<Props> = (props) => {
  return (
    <div className="CartItem">
      <div className="img">
        <img src={props.img} alt={props.img} className=""/>
      </div>

      <div className="description">
        <h3>{props.title}</h3>
        <p>{props.desc}</p>
        <p><b>Цена: {props.price}₽</b></p>
        <p>
          <b>Количество: {props.quantity}</b>
        </p>
        <div className="add-remove">
          <Link to="/cart">↑</Link>
          <Link to="/cart">↓</Link>
        </div>
        <button className="remove">Убрать из корзины</button>
      </div>
    </div>
  )
}

export default React.memo(CartItem)
