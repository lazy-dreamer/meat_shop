import {createSlice} from '@reduxjs/toolkit'

export interface ICartItemFeatures {
  sliceType: string;
  sliceThickness: string;
  comment: string;
}

export interface ICartItem {
  id: number;
  image: string;
  title: string;
  price: number;
  priceUnit: string;
  itemCount: number;
  weight: number;
  weightUnit: string;
  cartItemInfo: ICartItemFeatures
}

export interface ICartDiscount {
  d_code: string;
  d_var: number;
  d_val: number;
}

interface State {
  cartItems: ICartItem[],
  cartDiscount: ICartDiscount;
  totalCartPrice: number
}

const initialState: State = {
  cartItems: [],
  cartDiscount: {
    d_code: "",
    d_var: 0,
    d_val: 0
  },
  totalCartPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload]
    },
    changeCartItem: (state, action) => {
      state.cartItems = state.cartItems.map(item => {
        if (item.id === action.payload.id) {
          return action.payload
        } else return item
      })
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
    },
    clearCart: (state) => {
      state.cartItems = []
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload
    },
    setDiscount: (state, action) => {
      state.cartDiscount = action.payload
    },
    clearDiscount: (state) => {
      state.cartDiscount = {
        d_code: '',
        d_var: 0,
        d_val: 0
      }
    },
    setCartTotal: (state, action) => {
      state.totalCartPrice = action.payload
    }
  }
})

export const {
  addToCart,
  changeCartItem,
  removeFromCart,
  clearCart,
  setCartItems,
  setCartTotal,
  setDiscount,
  clearDiscount
} = cartSlice.actions

export default cartSlice.reducer