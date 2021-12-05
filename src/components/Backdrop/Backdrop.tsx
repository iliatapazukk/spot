import React from 'react'
import { motion } from "framer-motion"
import './Backdrop.scss'

type Props = {
  children: any,
  onClick: () => void
}

const Backdrop: React.FC<Props> = (props) => {
  return (
    <motion.div
      onClick={props.onClick}
      className="Backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  )
}

export default React.memo(Backdrop)
