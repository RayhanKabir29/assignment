'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, Plus, List } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProductNavigation() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Products', href: '/assignment-2', icon: Package },
    { name: 'Add Product', href: '/assignment-2/create', icon: Plus },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link key={item.name} href={item.href}>
            <Button
              variant={isActive ? "default" : "outline"}
              className={`flex items-center space-x-2 transition-all duration-300 ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Button>
          </Link>
        )
      })}
    </div>
  )
}