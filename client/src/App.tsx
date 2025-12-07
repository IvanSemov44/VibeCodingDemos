import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ProductList from './pages/ProductList'
import CartPage from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import { useAppSelector } from './store/hooks'

export default function App() {
  const navigate = useNavigate()
  const count = useAppSelector((s) => s.cart.items.reduce((acc, i) => acc + i.quantity, 0))

  return (
      <div>
        <header style={{ padding: 12, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', padding: 0, margin: 0, color: 'inherit', cursor: 'pointer', fontSize: 18 }}
            aria-label="Go to home"
          >
            Vibe Shop
          </button>
          <div style={{ marginLeft: 'auto' }}>
            <button
              onClick={() => navigate('/cart')}
              style={{ background: 'none', border: 'none', padding: 0, margin: 0, color: 'inherit', cursor: 'pointer' }}
              aria-label="Open cart"
            >
              Cart{count > 0 ? ` (${count})` : ''}
            </button>
          </div>
        </header>
        <main style={{ padding: 12 }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </div>
  )
}
