import React from 'react'
import { ReactComponent as ArrowDown} from '../../../assets/images/arrow-down.svg'
import { ReactComponent as ArrowUp} from '../../../assets/images/arrow-up.svg'
import { ReactComponent as Remove} from '../../../assets/images/close.svg'
import './CartItem.scss'

type Props = {
  img: string,
  title: string,
  desc: string,
  price: number,
  quantity: number,
  add: () => void,
  subtract: () => void,
  remove: () => void,
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
        <div className="quantity">
          Количество:
          <ArrowDown className="arrow" role="button" onClick={props.subtract} />
          <b>{props.quantity}</b>
          <ArrowUp className="arrow" role="button" onClick={props.add}/>
          <Remove role="button" className="remove" onClick={props.remove}/>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CartItem)
