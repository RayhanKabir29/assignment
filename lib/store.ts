import { configureStore } from '@reduxjs/toolkit'
import ticTacToeReducer from './features/ticTacToe/ticTacToeSlice'
import productReducer from './features/products/productSlice'

export const store = configureStore({
  reducer: {
    ticTacToe: ticTacToeReducer,
    products: productReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch