import React from 'react'
import { ReactComponent as Add} from '../../../assets/images/add.svg'
import { ReactComponent as Check} from '../../../assets/images/check.svg'
import { ReactComponent as CheckMark} from '../../../assets/images/check-mark.svg'
import {AnimatePresence, motion} from 'framer-motion'
import './Gift.scss'

type Props = {
  id: number,
  title: string,
  img: string,
  desc: [],
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
      <div className="content">
        <h3 className="card-title">{props.title}</h3>
        <ul className="description">
          {props.desc.map((item, index) =>
            <li key={index}>
              <CheckMark/>
              {item}
            </li>
          )}
        </ul>
        <div className="total">
          <div>
            Цена: <b>{props.price}₽</b>
          </div>
          <AnimatePresence>
            {props.selected ? (
              <motion.div
                className="selected"
                initial={{scale: 4, opacity: 0}}
                animate={{ scale: 1, opacity: 1, rotate: 360, transition: { type: 'spring' } }}
              >
                <Check/>
              </motion.div>
            ) : (
              <motion.div
                className="add"
                role="button"
                whileHover={{ scale: 1.1, transition: { type: 'spring' } }}
                onClick={props.addToCart}
              >
                <b>Добавить в корзину</b> <Add/>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Gift)
