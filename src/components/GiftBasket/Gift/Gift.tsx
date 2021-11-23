import React from 'react'
import { ReactComponent as Add} from '../../../assets/images/add.svg'
import { ReactComponent as Check} from '../../../assets/images/check.svg'
import {AnimatePresence, motion} from 'framer-motion'
import './Gift.scss'

type Props = {
  id: number,
  title: string,
  img: string,
  desc: string,
  price: number,
  selected: boolean,
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
          Цена: <b>{props.price}₽</b>
        </div>
        <AnimatePresence>
          {props.selected ? (
            <motion.div
              className="selected"
              initial={{scale: 2, opacity: 0}}
              animate={{ scale: 1, opacity: 1, rotate: 360, transition: { type: 'spring' } }}
            >
              <Check/>
            </motion.div>
          ) : (
            <motion.div
              className="add"
              role="button"
              whileHover={{ scale: 1.3, transition: { type: 'spring' } }}
              onClick={props.addToCart}
            >
              <Add/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default React.memo(Gift)
