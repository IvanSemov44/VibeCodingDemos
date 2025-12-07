import React from 'react'
import { useProducts } from '../api/useProducts'
import { useAppDispatch } from '../store/hooks'
import { add as addToCart } from '../store/cartSlice'

export default function ProductList() {
  const { data: products, isLoading, isError, error } = useProducts()

  if (isLoading) return <div>Loading products…</div>
  if (isError) return <div>Error: {error?.message}</div>

  const dispatch = useAppDispatch()

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products?.map((p) => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <strong>{p.name}</strong> — ${p.price}
            <div>{p.description}</div>
            <div>
              <button onClick={() => dispatch(addToCart({ id: p.id, name: p.name, price: p.price }))}>
                Add to cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
