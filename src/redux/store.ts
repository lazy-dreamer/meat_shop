import {configureStore, combineReducers} from "@reduxjs/toolkit";
import cartReducer from './cartSlice'


export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})

const rootReducer = combineReducers({})
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch