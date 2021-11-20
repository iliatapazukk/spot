import React from 'react'
import {Link} from 'react-router-dom'
import { ReactComponent as Spot} from '../../assets/images/spot.svg'
import './GiftBasket.scss'

type Props = {}

const GiftBasket: React.FC<Props> = (props) => {
  return (
    <div className="GiftBasket">
      <header className="header">
        <div>
          <Link to="/">
            <Spot className="logo" />
          </Link>
        </div>
        <h1>Подарочные наборы</h1>
        <div>
          Cart
        </div>
      </header>
      <div className="comeback">
        <Link to="/">
          Вернуться назад
        </Link>
      </div>
    </div>
  )
}

export default React.memo(GiftBasket)
