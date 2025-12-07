import { useQuery } from '@tanstack/react-query'
import type { Product } from '../types/product'

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/api/products')
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export function useProducts() {
  return useQuery<Product[], Error>(['products'], fetchProducts, {
    staleTime: 1000 * 60, // 1 minute
  })
}
