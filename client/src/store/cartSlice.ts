import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

type State = {
  items: CartItem[]
}

const STORAGE_KEY = 'vibe_cart'

const initialState: State = {
  items: [],
}

function loadInitial(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { items: JSON.parse(raw) }
  } catch {
    // ignore
  }
  return initialState
}

const slice = createSlice({
  name: 'cart',
  initialState: loadInitial(),
  reducers: {
    add(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
      const { id, name, price } = action.payload
      const existing = state.items.find((i) => i.id === id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ id, name, price, quantity: 1 })
      }
    },
    decrease(state, action: PayloadAction<number>) {
      const id = action.payload
      const existing = state.items.find((i) => i.id === id)
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1
        } else {
          state.items = state.items.filter((i) => i.id !== id)
        }
      }
    },
    remove(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    set(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload
    },
    clear(state) {
      state.items = []
    },
  },
})

export const { add, decrease, remove, set, clear } = slice.actions
export default slice.reducer
