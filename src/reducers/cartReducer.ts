import Item1 from '../assets/slides/1.jpg'
import Item2 from '../assets/slides/7.jpg'
import Item3 from '../assets/slides/3.jpg'
import Item4 from '../assets/slides/4.jpg'
import Item5 from '../assets/slides/5.jpg'
import Item6 from '../assets/slides/6.jpg'
import { combineReducers } from 'redux';
import {GET_ALL_PRODUCT, GET_NUMBER_CART, ADD_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, DELETE_CART} from  '../actions/cartActions';

const initState = {
  _products: [
    {
      id: 1,
      title: 'Стол да книга',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 110,
      img: Item1
    },
    {
      id: 2,
      title: 'Бирюли',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 80,
      img: Item2
    },
    {
      id: 3,
      title: 'Кофеек',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 120,
      img: Item3
    },
    {
      id: 4,
      title: 'Ветроволос',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 260,
      img: Item4
    },
    {
      id: 5,
      title: 'Цугцванг',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 160,
      img: Item5
    },
    {
      id: 6,
      title: 'Бирюли-висюли',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.',
      price: 90,
      img: Item6
    }
  ],
  numberCart: 0,
  Carts: [],
}

function todoProduct(state = initState, action){
  switch(action.type){
    case GET_ALL_PRODUCT:
      return{
        ...state,
        _products:action.payload
      }
    case GET_NUMBER_CART:
      return{
        ...state
      }
    case ADD_CART:
      if(state.numberCart==0){
        let cart = {
          id:action.payload.id,
          quantity:1,
          title:action.payload.title,
          desc:action.payload.desc,
          img:action.payload.img,
          price:action.payload.price
        }
        // @ts-ignore
        state.Carts.push(cart);
      }
      else{
        let check = false;
        state.Carts.map((item,key)=>{
          // @ts-ignore
          if(item.id==action.payload.id){
            // @ts-ignore
            state.Carts[key].quantity++;
            check=true;
          }
        });
        if(!check){
          let _cart = {
            id:action.payload.id,
            quantity:1,
            title:action.payload.title,
            desc:action.payload.desc,
            img:action.payload.img,
            price:action.payload.price
          }
          // @ts-ignore
          state.Carts.push(_cart);
        }
      }
      return{
        ...state,
        numberCart:state.numberCart+1
      }
    case INCREASE_QUANTITY:
      state.numberCart++
      // @ts-ignore
      state.Carts[action.payload].quantity++;

      return{
        ...state
      }
    case DECREASE_QUANTITY:
      // @ts-ignore
      let quantity = state.Carts[action.payload].quantity;
      if(quantity>1){
        state.numberCart--;
        // @ts-ignore
        state.Carts[action.payload].quantity--;
      }

      return{
        ...state
      }
    case DELETE_CART:
      // @ts-ignore
      let quantity_ = state.Carts[action.payload].quantity;
      return{
        ...state,
        numberCart:state.numberCart - quantity_,
        Carts:state.Carts.filter(item=>{
          // @ts-ignore
          return item.id!=state.Carts[action.payload].id
        })

      }
    default:
      return state;
  }
}

const ShopApp = combineReducers({
  _todoProduct:todoProduct
});

export default ShopApp;
