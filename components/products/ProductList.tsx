'use client'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setSearchQuery, setSelectedCategory, setCurrentPage, deleteProduct } from '@/lib/features/products/productSlice'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Edit, Trash2, Eye, Filter, Package, Plus } from 'lucide-react'
import Link from 'next/link'
import CategorySidebar from './CategorySidebar'
import ProductCard from './ProductCard'
import Pagination from './Pagination'

export default function ProductList() {
  const dispatch = useAppDispatch()
  const { 
    filteredProducts, 
    loading, 
    error, 
    searchQuery, 
    selectedCategory,
    currentPage,
    itemsPerPage,
    totalPages
  } = useAppSelector((state) => state.products)
  
  const [showSidebar, setShowSidebar] = useState(false)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value))
  }

  const handleDeleteProduct = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center space-x-2">
          <Package className="w-8 h-8 animate-spin text-emerald-600" />
          <span className="text-lg text-gray-600">Loading products...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <Package className="w-16 h-16 mx-auto mb-2 opacity-50" />
          <p className="text-xl font-semibold">Error loading products</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile filter button */}
      <div className="lg:hidden">
        <Button
          onClick={() => setShowSidebar(!showSidebar)}
          variant="outline"
          className="w-full"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`lg:w-80 ${showSidebar ? 'block' : 'hidden lg:block'}`}>
        <CategorySidebar />
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Search Bar */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products by name..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="border-0 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            {(searchQuery || selectedCategory) && (
              <div className="flex items-center space-x-2 mt-3">
                {searchQuery && (
                  <Badge variant="secondary">
                    Search: &quot;{searchQuery}&quot;
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary">
                    Category: {selectedCategory}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    dispatch(setSearchQuery(''))
                    dispatch(setSelectedCategory(''))
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} products found
          </p>
          <Link href="/assignment-2/create">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Product Grid */}
        {currentProducts?.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-500 mb-2">No products found</p>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentProducts?.map((product) => (
                <ProductCard 
                  key={product?.id} 
                  product={product} 
                  onDelete={() => handleDeleteProduct(product?.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination />
            </div>
          </>
        )}
      </div>
    </div>
  )
}