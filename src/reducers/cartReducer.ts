import Privet from '../assets/gifts/privet.jpeg'
import Radost from '../assets/gifts/radost.jpeg'
import Vdoh from '../assets/gifts/vdoh.jpeg'
import Vostorg from '../assets/gifts/vostorg.jpeg'
import { combineReducers } from 'redux';
import {
  GET_ALL_PRODUCT,
  GET_NUMBER_CART,
  ADD_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART,
  CLEAR_CART
} from  '../actions/cartActions';


const initState = {
  products: [
    {
      id: 1,
      title: 'Крымский тёплый ПРИВЕТ',
      desc: [
        'Свеча медовая из вощины (воск с пасеки) с натуральными смолами и травами',
        'Натуральное мыло с добавлением крымских трав',
        'Баночка варенья с айвой из домашнего сада (100 гр)',
        'Чайный сбор плиткой из крымских трав, ягод и цветов',
        'Шоколад на меду по RAW технологии от домашней мастерской (100 гр)',
        'Благовония из крымских трав',
        'Новогодняя игрушка из спила дерева с изображением тигра',
        'Авторская открытка от местной художницы',
        'Шишка горная лесная'
      ],
      price: 3000,
      img: Privet,
    },
    {
      id: 2,
      title: 'Крымское тёплое ВДОХНОВЕНИЕ',
      desc: [
        'Свеча медовая из вощины (воск с пасеки) с натуральными смолами и травами',
        'Эфирное масло лаванды (10 мл)',
        'Натуральное мыло с добавлением крымских трав',
        'Баночка варенья с айвой из домашнего сада (100 гр)',
        'Чайный сбор плиткой из крымских трав, ягод и цветов',
        'Шоколад на меду по RAW технологии от домашней мастерской (100 гр)',
        'Благовония из крымских трав',
        'Букетик лаванды',
        'Новогодняя игрушка из спила дерева с изображением тигра',
        'Авторская открытка от местной художницы',
        'Шишка горная лесная',
      ],
      price: 3500,
      img: Vdoh,
    },
    {
      id: 3,
      title: 'Крымская тёплая РАДОСТЬ',
      desc: [
        'Свеча медовая из вощины (воск с пасеки) с натуральными смолами и травами ',
        'Эфирное масло лаванды (10 мл)',
        'Натуральное мыло с добавлением крымских трав',
        'Баночка варенья с айвой из домашнего сада (100 гр)',
        'Чайный сбор плиткой из крымских трав, ягод и цветов ',
        'Шоколад на меду по RAW технологии от домашней мастерской 100 гр',
        'Благовония из крымских трав',
        'Букетик лаванды',
        'Новогодняя игрушка из спила дерева с изображением тигра',
        'Авторская открытка от местной художницы',
        'Шишка горная лесная',
        'Керамическая вазочка от семейной мастерской'
      ],
      price: 4000,
      img: Radost,
    },
    {
      id: 4,
      title: 'Крымский тёплый ВОСТОРГ',
      desc: [
        'Свеча медовая из вощины (воск с пасеки) с натуральными смолами и травами',
        'Эфирное масло лаванды (10 мл)',
        'Натуральное мыло с добавлением крымских трав',
        'Баночка варенья с айвой из домашнего сада (100 гр)',
        'Чайный сбор плиткой из крымских трав, ягод и цветов',
        'Шоколад на меду по RAW технологии от домашней мастерской (100 гр)',
        'Благовония из крымских трав',
        'Букетик лаванды',
        'Новогодняя игрушка из спила дерева с изображением тигра',
        'Авторская открытка от местной художницы',
        'Шишка горная лесная',
        'Керамическая пиала, декорированная глазурью, от семейной мастерской'
      ],
      price: 4500,
      img: Vostorg,
    },
  ],
  numberCart: 0,
  Carts: [],
}

function todoProduct(state = initState, action){
  switch(action.type){
    case GET_ALL_PRODUCT:
      return{
        ...state,
        products:action.payload
      }
    case GET_NUMBER_CART:
      return{
        ...state
      }
    case ADD_CART:
      if(state.numberCart === 0){
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
        state.Carts.map( (item,key) => {
          // @ts-ignore
          if(item.id === action.payload.id){
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
      return {
        ...state,
        numberCart: state.numberCart - quantity_,
        Carts:state.Carts.filter(item=>{
          // @ts-ignore
          return item.id !== state.Carts[action.payload].id
        })
      }
      case CLEAR_CART:
        return {
          ...state,
          numberCart: 0,
          Carts: [],
        }
    default:
      return state;
  }
}

const ShopApp = combineReducers({
  _todoProduct:todoProduct
});

export default ShopApp;
