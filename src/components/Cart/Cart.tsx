import React from 'react'
import { connect } from 'react-redux'
import {IncreaseQuantity, DecreaseQuantity, DeleteCart} from '../../actions/cartActions'
import CartItem from './CartItem'
import {Link} from 'react-router-dom'
import {ReactComponent as Spot} from '../../assets/images/spot.svg'
import './Cart.scss'

type Props = {
  items: any,
  IncreaseQuantity: any,
  DecreaseQuantity: any,
  DeleteCart: any,
}

const mapStateToProps = state =>{
  //  console.log(state)
  return{
    items:state._todoProduct
  }
}


const Cart: React.FC<Props> = (props) => {
  let ListCart = []
  let TotalCart = 0
  Object.keys(props.items.Carts).forEach(function(item){
    TotalCart += props.items.Carts[item].quantity * props.items.Carts[item].price;
    // @ts-ignore
    ListCart.push(props.items.Carts[item]);
  })
  function TotalPrice(price,tonggia){
    return Number(price * tonggia).toLocaleString('en-US');
  }

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
          {ListCart.length ? (
            ListCart.map( (item: any, key) => {
              return (
                  <CartItem
                    key={key}
                    price={item.price}
                    img={item.img}
                    title={item.title}
                    desc={item.desc}
                    quantity={item.quantity}
                    add={()=> props.IncreaseQuantity(key)}
                    subtract={()=> props.DecreaseQuantity(key)}
                    remove={() => props.DeleteCart(key)}
                  />
                )
              })
            ) : (
              <div className="empty">
                <h4>Корзина пуста</h4>
              </div>
            )}
        </div>
        <div>TOTAL: {TotalCart}</div>
      </div>
    </div>
  )
}


export default connect(mapStateToProps,{IncreaseQuantity, DecreaseQuantity, DeleteCart})(Cart)
