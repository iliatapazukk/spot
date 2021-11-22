import React from 'react'
import { ReactComponent as Add} from '../../../assets/images/add.svg'
import { motion } from 'framer-motion'
import './Gift.scss'

type Props = {
  id: number,
  title: string,
  img: string,
  desc: string,
  price: number,
  addToCart: () => {},
}

const Gift: React.FC<Props> = (props) => {
  return (
    <div className="Gift">
      <div className="image">
        <img src={props.img} alt={props.title}/>
      </div>
      <div className="card-title">{props.title}</div>
      <div className="description">
        {props.desc}
      </div>
      <div className="total">
        <div>
          Цена: {props.price}₽
        </div>
        <motion.div
          className="add"
          role="button"
          whileHover={{ scale: 1.3, transition: { type: 'spring' } }}
          onClick={props.addToCart}
        >
          <Add/>
        </motion.div>
      </div>
    </div>
  )
}

export default React.memo(Gift)
