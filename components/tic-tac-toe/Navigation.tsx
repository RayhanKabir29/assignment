'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, Gamepad2, Trophy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TicTacToeNavigation() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Game', href: '/assignment-1', icon: Gamepad2 },
    { name: 'Leaderboard', href: '/assignment-1/leaderboard', icon: Trophy },
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
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300'
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