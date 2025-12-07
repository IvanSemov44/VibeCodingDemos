import { useQuery } from '@tanstack/react-query'

type Product = {
  id: number
  name: string
  description?: string
  price: number
}

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/api/product')
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export function useProducts() {
  return useQuery<Product[], Error, Product[], readonly string[]>(
    ['products'],
    fetchProducts,
    {
      staleTime: 1000 * 60, // 1 minute
    }
  )
}
