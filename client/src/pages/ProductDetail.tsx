import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProduct } from '../api/useProduct'
import { useAppDispatch } from '../store/hooks'
import { add as addToCart } from '../store/cartSlice'

export default function ProductDetail() {
  const { id } = useParams()
  const productId = id ? parseInt(id, 10) : undefined
  const { data: product, isLoading, isError, error } = useProduct(productId)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (!productId) return <div>Invalid product id</div>
  if (isLoading) return <div>Loading product…</div>
  if (isError) return <div>Error: {error?.message}</div>
  if (!product) return <div>Product not found</div>

  return (
    <div className="product-detail">
      <button className="btn" onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>← Back</button>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: '0 0 240px' }}>
          <img
            src={product.imageUrl || `https://picsum.photos/seed/product-${product.id}/480/320`}
            alt={product.name}
            style={{ width: '100%', borderRadius: 8, objectFit: 'cover', border: '1px solid #eee' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h1>{product.name}</h1>
          <div className="muted">${product.price.toFixed(2)}</div>
          <p style={{ marginTop: 12 }}>{product.description || 'No description available.'}</p>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <button className="btn primary" onClick={() => dispatch(addToCart({ id: product.id, name: product.name, price: product.price }))}>
          Add to cart
        </button>
      </div>
    </div>
  )
}
