import { useQuery } from '@tanstack/react-query'
import type { Product } from '../types/product'

async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`/api/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

export function useProduct(id?: number) {
  return useQuery<Product, Error>(['product', id], () => fetchProduct(id as number), {
    enabled: !!id,
    staleTime: 1000 * 60,
  })
}
