import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductList from './pages/ProductList'

export default function App() {
  return (
    <div>
      <header style={{ padding: 12, borderBottom: '1px solid #eee' }}>
        <Link to="/">Vibe Shop</Link>
      </header>
      <main style={{ padding: 12 }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
        </Routes>
      </main>
    </div>
  )
}
