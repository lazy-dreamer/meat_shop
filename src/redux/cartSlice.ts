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
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
    },
    addDiscount: (state, action) => {
      state.cartDiscount = action.payload
    }
  }
})

export const {addToCart, removeFromCart} = cartSlice.actions

export default cartSlice.reducer