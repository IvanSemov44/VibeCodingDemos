import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

// Persist cart to localStorage
store.subscribe(() => {
  try {
    const state = store.getState()
    localStorage.setItem('vibe_cart', JSON.stringify(state.cart.items))
  } catch {
    // ignore
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
