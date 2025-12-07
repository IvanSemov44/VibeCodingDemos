import { useProducts } from '../api/useProducts'
import { useAppDispatch } from '../store/hooks'
import { add as addToCart } from '../store/cartSlice'
import ProductCard from '../components/ProductCard'

export default function ProductList() {
  const { data: products, isLoading, isError, error } = useProducts()
  const dispatch = useAppDispatch()

  if (isLoading) return <div>Loading products…</div>
  if (isError) return <div>Error: {error?.message}</div>

  return (
    <div>
      <h1>Products</h1>

      <ul className="product-list">
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={(prod) => dispatch(addToCart(prod))} />
        ))}
      </ul>
    </div>
  )
}
