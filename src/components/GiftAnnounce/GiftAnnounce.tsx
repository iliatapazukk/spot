import React from 'react'
import './GiftAnnounce.scss'
import {Link} from 'react-router-dom';
import {ReactComponent as Gift} from '../../assets/images/giftbox.svg';

type Props = {}

const GiftAnnounce: React.FC<Props> = (props) => {
  return (
    <div className="GiftAnnounce">
      <h2>Крымский тёплый 🧡</h2>
      <p>Друзья, предлагаем порадовать близких, друзей или самих себя согревающим сердце подарком, который мы доставим к
        вам прямиком из горного Крыма. Атмосфера этих мест притянула и объединила мастеров различных мастей,
        поддерживающих единые ценности.</p>
      <p>Из продуктов их творчества мы и собрали для вас эти подарочные наборы.
      Все элементы набора сделаны вручную из натуральных ингредиентов, главный из которых - любовь!
    </p>

    <Link to="gift-basket" className="lnk">
      Выбери свой крымский теплый <Gift/>
    </Link>

    </div>
  )
}

export default React.memo(GiftAnnounce)
