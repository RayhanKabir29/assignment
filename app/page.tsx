'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GamepadIcon, ShoppingCart, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const router = useRouter()

  const assignments = [
    {
      id: 'assignment-1',
      title: 'Assignment-1: Tic-Tac-Toe Game',
      description: 'A multi-player Tic-Tac-Toe game with Redux state management, leaderboard, and session tracking.',
      icon: GamepadIcon,
      href: '/assignment-1',
      features: ['2-Player Gameplay', 'Best of 5 Rounds', 'Session Leaderboard', 'Redux State Management'],
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 'assignment-2', 
      title: 'Assignment-2: CRUD Product App',
      description: 'A full-featured Product Management system with search, filtering, and complete CRUD operations.',
      icon: ShoppingCart,
      href: '/assignment-2',
      features: ['Product Management', 'Real-time Search', 'Category Filtering', 'Form Validation'],
      gradient: 'from-emerald-600 to-teal-600'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Assignments</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore two comprehensive applications built with Next.js, Redux Toolkit, and TypeScript
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${assignment.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <assignment.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                {assignment.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {assignment.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Key Features:</h4>
                <ul className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                  {assignment.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                onClick={() => router.push(assignment.href)}
                className={`w-full bg-gradient-to-r ${assignment.gradient} hover:shadow-lg transition-all duration-300 group/btn`}
              >
                <span>Explore {assignment.id === 'assignment-1' ? 'Game' : 'App'}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Built with Modern Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {['Next.js', 'React', 'Redux Toolkit', 'TypeScript', 'Tailwind CSS'].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}