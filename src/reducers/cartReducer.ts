import Item1 from '../assets/slides/1.jpg'
import Item2 from '../assets/slides/7.jpg'
import Item3 from '../assets/slides/3.jpg'
import Item4 from '../assets/slides/4.jpg'
import Item5 from '../assets/slides/5.jpg'
import Item6 from '../assets/slides/6.jpg'
import { ADD_TO_CART } from '../actions/action-types/cart-actions'

const initState = {
  items: [
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
  addedItems: [],
  total: 0
}

const cartReducer = (state = initState, action) => {
  if(action.type === ADD_TO_CART){
    let addedItem = state.items.find(item=> item.id === action.id)
    //check if the action id exists in the addedItems
    // @ts-ignore
    let existed_item= state.addedItems.find(item=> action.id === item.id)
    if(existed_item)
    {
      // @ts-ignore
      addedItem.quantity += 1
      return{
        ...state,
        // @ts-ignore
        total: state.total + addedItem.price
      }
    }
    else{
      // @ts-ignore
      addedItem.quantity = 1;
      //calculating the total
      // @ts-ignore
      let newTotal = state.total + addedItem.price

      return{
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total : newTotal
      }

    }
  }
  else{
    return state
  }
}

export default cartReducer;
