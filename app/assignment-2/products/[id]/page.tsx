'use client'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { fetchProduct, clearCurrentProduct } from '@/lib/features/products/productSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Package } from 'lucide-react'
import Link from 'next/link'

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentProduct, loading, error } = useAppSelector((state) => state.products)
  
  const productId = Number(params.id)

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId))
    }
    
    return () => {
      dispatch(clearCurrentProduct())
    }
  }, [dispatch, productId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center space-x-2">
          <Package className="w-8 h-8 animate-spin text-emerald-600" />
          <span className="text-lg text-gray-600">Loading product...</span>
        </div>
      </div>
    )
  }

  if (error || !currentProduct) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-xl font-semibold text-gray-500 mb-2">Product not found</p>
        <p className="text-gray-400 mb-4">{error || 'The product you are looking for does not exist'}</p>
        <Link href="/assignment-2">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>
    )
  }

  const imageUrl = currentProduct.images && currentProduct.images.length > 0 
    ? currentProduct.images[0].replace(/[\[\]"]/g, '')
    : 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg'

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/assignment-2">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative">
              <img
                src={imageUrl}
                alt={currentProduct.title}
                className="w-full h-96 md:h-full object-cover rounded-l-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg'
                }}
              />
              {currentProduct.images && currentProduct.images.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {currentProduct.images.slice(1).map((img, index) => (
                      <img
                        key={index}
                        src={img.replace(/[\[\]"]/g, '')}
                        alt={`${currentProduct.title} ${index + 2}`}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="p-8">
              <div className="mb-4">
                <Badge className="mb-3 bg-emerald-600">
                  {currentProduct.category.name}
                </Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentProduct.title}
                </h1>
                <div className="text-3xl font-bold text-emerald-600 mb-6">
                  ${currentProduct.price}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {currentProduct.description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product ID:</span>
                    <span className="font-medium">#{currentProduct.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{currentProduct.category.name}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href={`/assignment-2/products/${currentProduct.id}/edit`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Product
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}