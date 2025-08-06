'use client'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Eye, Package } from 'lucide-react'
import { Product } from '@/lib/features/products/productSlice'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  onDelete: () => void
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0].replace(/[\[\]"]/g, '')
    : 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg'

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0">
      <CardContent className="p-0">
<div className="relative overflow-hidden rounded-t-lg">
  <Image
    src={imageUrl}
    alt={product.title}
    layout="responsive"
    width={100}
    height={100}
    className="w-full h-auto object-cover"
  />
  <div className="absolute top-2 right-2">
    <Badge className="bg-emerald-600">
      ${product.price}
    </Badge>
  </div>
</div>

        
        <div className="p-4">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs">
              {product.category.name}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {product.description}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="flex space-x-2 w-full">
          <Link href={`/assignment-2/products/${product.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </Link>
          <Link href={`/assignment-2/products/${product.id}/edit`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={onDelete}
            className="flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}