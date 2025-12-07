import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { remove as removeFromCart, clear as clearCart, decrease as decreaseFromCart, add as addToCart } from '../store/cartSlice'
import { useNavigate } from 'react-router-dom'

export default function CartPage() {
  const items = useAppSelector((s) => s.cart.items)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  if (items.length === 0)
    return (
      <div>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <button onClick={() => navigate('/')}>Browse products</button>
      </div>
    )

  return (
    <div>
      <h1>Your Cart</h1>
      <ul className="cart-list">
        {items.map((it) => (
          <li key={it.id} className="cart-item">
            <div className="cart-item-main">
              <div>
                <strong>{it.name}</strong>
                <div className="muted">${it.price.toFixed(2)} each</div>
              </div>
              <div className="cart-controls">
                <button className="btn small" onClick={() => dispatch(decreaseFromCart(it.id))}>−</button>
                <div className="qty">{it.quantity}</div>
                <button className="btn small" onClick={() => dispatch(addToCart({ id: it.id, name: it.name, price: it.price }))}>+</button>
              </div>
            </div>
            <div className="cart-item-sub">Subtotal: ${ (it.price * it.quantity).toFixed(2) }</div>
            <div style={{ marginTop: 8 }}>
              <button className="btn" onClick={() => dispatch(removeFromCart(it.id))}>Remove</button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 12 }}>
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button className="btn primary">Checkout</button>
        <button className="btn" onClick={() => dispatch(clearCart())}>Clear cart</button>
      </div>
    </div>
  )
}
