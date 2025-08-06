'use client'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setSelectedCategory } from '@/lib/features/products/productSlice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, X } from 'lucide-react'

export default function CategorySidebar() {
  const dispatch = useAppDispatch()
  const { categories, selectedCategory, filteredProducts } = useAppSelector((state) => state.products)

  const handleCategorySelect = (categoryName: string) => {
    dispatch(setSelectedCategory(categoryName === selectedCategory ? '' : categoryName))
  }

  const categoryCount = (categoryName: string) => {
    return filteredProducts.filter(product => 
      selectedCategory === categoryName || product.category.name === categoryName
    ).length
  }

  return (
    <div className="sticky top-24">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Categories</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={selectedCategory === '' ? 'default' : 'ghost'}
            className={`w-full justify-start ${
              selectedCategory === '' 
                ? 'bg-emerald-600 text-white' 
                : 'hover:bg-emerald-50 hover:text-emerald-600'
            }`}
            onClick={() => dispatch(setSelectedCategory(''))}
          >
            <span>All Categories</span>
            <Badge variant="secondary" className="ml-auto">
              {filteredProducts.length}
            </Badge>
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                selectedCategory === category.name 
                  ? 'bg-emerald-600 text-white' 
                  : 'hover:bg-emerald-50 hover:text-emerald-600'
              }`}
              onClick={() => handleCategorySelect(category.name)}
            >
              <span className="truncate">{category.name}</span>
              <Badge variant="secondary" className="ml-auto">
                {categoryCount(category.name)}
              </Badge>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}