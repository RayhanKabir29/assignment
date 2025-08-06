'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { createProduct } from '@/lib/features/products/productSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/products/Navigation'

interface FormData {
  title: string
  price: string
  description: string
  categoryId: string
  images: string
}

interface FormErrors {
  title: string
  price: string
  description: string
  categoryId: string
  images: string
}

export default function CreateProductPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector((state) => state.products)
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: '',
    description: '',
    categoryId: '',
    images: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({
    title: '',
    price: '',
    description: '',
    categoryId: '',
    images: ''
  })
  
  const [loading, setLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      title: '',
      price: '',
      description: '',
      categoryId: '',
      images: ''
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

    // Category validation
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required'
    }

    // Images validation
    if (!formData.images.trim()) {
      newErrors.images = 'At least one image URL is required'
    } else {
      const imageUrls = formData.images.split(',').map(url => url.trim())
      const urlRegex = /^https?:\/\/.+\..+/
      if (!imageUrls.every(url => urlRegex.test(url))) {
        newErrors.images = 'Please provide valid image URLs separated by commas'
      }
    }

    setErrors(newErrors)
    return Object.values(newErrors).every(error => !error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    try {
      const productData = {
        title: formData.title.trim(),
        price: Number(formData.price),
        description: formData.description.trim(),
        categoryId: Number(formData.categoryId),
        images: formData.images.split(',').map(url => url.trim())
      }
      
      await dispatch(createProduct(productData)).unwrap()
      router.push('/assignment-2')
    } catch (error) {
      console.error('Failed to create product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Create New Product</span>
        </h1>
        <p className="text-gray-600">Add a new product to the catalog</p>
      </div>

      <Navigation />

      <div className="mt-8 max-w-2xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Product Details</span>
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

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={(value) => handleInputChange('categoryId', value)}>
                  <SelectTrigger className={errors.categoryId ? 'border-red-300 focus:border-red-500' : ''}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && (
                  <p className="text-sm text-red-600">{errors.categoryId}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Image URLs *</Label>
                <Textarea
                  id="images"
                  placeholder="Enter image URLs separated by commas"
                  rows={3}
                  value={formData.images}
                  onChange={(e) => handleInputChange('images', e.target.value)}
                  className={errors.images ? 'border-red-300 focus:border-red-500' : ''}
                />
                {errors.images && (
                  <p className="text-sm text-red-600">{errors.images}</p>
                )}
                <p className="text-sm text-gray-500">
                  Provide multiple image URLs separated by commas for best results
                </p>
              </div>

              <div className="flex gap-4">
                <Link href="/assignment-2" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600"
                >
                  {loading ? 'Creating...' : 'Create Product'}
                  <Plus className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}