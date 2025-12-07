import React from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types/product'

type Props = {
  product: Product
  onAdd: (product: { id: number; name: string; price: number }) => void
}

export default function ProductCard({ product, onAdd }: Props) {
  const img = product.imageUrl || `https://picsum.photos/seed/product-${product.id}/160/120`

  return (
    <li key={product.id} className="product-card">
      <div className="product-card-inner">
        <div className="product-image-wrap">
          <img src={img} alt={product.name} className="product-image" />
        </div>
        <div className="product-body">
          <Link to={`/products/${product.id}`} className="product-link">
            <strong>{product.name}</strong>
          </Link>
          <div className="muted">${product.price.toFixed(2)}</div>
          {product.category && <div className="muted">Category: {product.category}</div>}
          {product.sku && <div className="muted">SKU: {product.sku}</div>}
          <div style={{ marginTop: 8 }}>{product.description}</div>
        </div>
        <div className="product-actions">
          <button className="btn" onClick={() => onAdd({ id: product.id, name: product.name, price: product.price })}>
            Add to cart
          </button>
        </div>
      </div>
    </li>
  )
}
