'use client'
import { useEffect } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { fetchProducts, fetchCategories } from '@/lib/features/products/productSlice'
import ProductList from '@/components/products/ProductList'
import Navigation from '@/components/products/Navigation'

export default function Assignment2Page() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Assignment-2: <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">CRUD Product App</span>
        </h1>
        <p className="text-gray-600">Full-featured Product Management with search, filtering, and CRUD operations</p>
      </div>

      <Navigation />
      
      <div className="mt-8">
        <ProductList />
      </div>
    </div>
  )
}