import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ProductList from './pages/ProductList'
import CartPage from './pages/Cart'

export default function App() {
  const navigate = useNavigate()
  return (
      <div>
        <header style={{ padding: 12, borderBottom: '1px solid #eee' }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', padding: 0, margin: 0, color: 'inherit', cursor: 'pointer' }}
            aria-label="Go to home"
          >
            Vibe Shop
          </button>
          {' '}
          |
          {' '}
          <button
            onClick={() => navigate('/cart')}
            style={{ background: 'none', border: 'none', padding: 0, margin: 0, color: 'inherit', cursor: 'pointer' }}
            aria-label="Open cart"
          >
            Cart
          </button>
        </header>
        <main style={{ padding: 12 }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </div>
  )
}
