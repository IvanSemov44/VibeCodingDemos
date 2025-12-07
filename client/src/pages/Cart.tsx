import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { remove as removeFromCart, clear as clearCart } from '../store/cartSlice'

export default function CartPage() {
  const items = useAppSelector((s) => s.cart.items)
  const dispatch = useAppDispatch()

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  if (items.length === 0) return <div>Your cart is empty.</div>

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {items.map((it) => (
          <li key={it.id} style={{ marginBottom: 8 }}>
            <strong>{it.name}</strong> — ${it.price} x {it.quantity}
            <div>
              <button onClick={() => dispatch(removeFromCart(it.id))}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 12 }}>
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => dispatch(clearCart())}>Clear cart</button>
      </div>
    </div>
  )
}
