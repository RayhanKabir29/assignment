'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { fetchProduct, updateProduct, clearCurrentProduct } from '@/lib/features/products/productSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, ArrowLeft, Package } from 'lucide-react'
import Link from 'next/link'

interface FormData {
  title: string
  price: string
  description: string
}

interface FormErrors {
  title: string
  price: string
  description: string
}

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentProduct, loading, error } = useAppSelector((state) => state.products)
  
  const productId = Number(params.id)
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: '',
    description: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({
    title: '',
    price: '',
    description: ''
  })
  
  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId))
    }
    
    return () => {
      dispatch(clearCurrentProduct())
    }
  }, [dispatch, productId])

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        title: currentProduct.title,
        price: currentProduct.price.toString(),
        description: currentProduct.description
      })
    }
  }, [currentProduct])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      title: '',
      price: '',
      description: ''
    }

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required'
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters'
    }

    // Price validation
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required'
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number'
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    } else if (formData.description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters'
    }

    setErrors(newErrors)
    return Object.values(newErrors).every(error => !error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setSubmitLoading(true)
    try {
      if (!currentProduct) {
        setSubmitLoading(false)
        return
      }
      const updateData = {
        id: productId,
        title: formData.title.trim(),
        price: Number(formData.price),
        description: formData.description.trim(),
        categoryId: currentProduct.category.id,
        images: currentProduct.images
      }
      
      await dispatch(updateProduct(updateData)).unwrap()
      router.push(`/assignment-2/products/${productId}`)
    } catch (error) {
      console.error('Failed to update product:', error)
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href={`/assignment-2/products/${productId}`}>
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Product
          </Button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Edit className="w-5 h-5" />
              <span>Edit Product</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title *</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter product title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={errors.title ? 'border-red-300 focus:border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className={errors.price ? 'border-red-300 focus:border-red-500' : ''}
                />
                {errors.price && (
                  <p className="text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={errors.description ? 'border-red-300 focus:border-red-500' : ''}
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{formData.description.length}/500 characters</span>
                  {errors.description && (
                    <span className="text-red-600">{errors.description}</span>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Category and images cannot be modified through the API. 
                  Only title, price, and description can be updated.
                </p>
              </div>

              <div className="flex gap-4">
                <Link href={`/assignment-2/products/${productId}`} className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={submitLoading}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600"
                >
                  {submitLoading ? 'Updating...' : 'Update Product'}
                  <Edit className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}