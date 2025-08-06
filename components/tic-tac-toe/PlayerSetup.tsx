'use client'
import { useState } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { setPlayers } from '@/lib/features/ticTacToe/ticTacToeSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Users, Play } from 'lucide-react'

export default function PlayerSetup() {
  const dispatch = useAppDispatch()
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')
  const [errors, setErrors] = useState({ player1: '', player2: '' })

  const validateForm = () => {
    const newErrors = { player1: '', player2: '' }
    
    if (!player1.trim()) {
      newErrors.player1 = 'Player 1 name is required'
    } else if (player1.trim().length < 2) {
      newErrors.player1 = 'Name must be at least 2 characters'
    }
    
    if (!player2.trim()) {
      newErrors.player2 = 'Player 2 name is required'
    } else if (player2.trim().length < 2) {
      newErrors.player2 = 'Name must be at least 2 characters'
    }
    
    if (player1.trim() === player2.trim() && player1.trim()) {
      newErrors.player2 = 'Player names must be different'
    }
    
    setErrors(newErrors)
    return !newErrors.player1 && !newErrors.player2
  }

  const handleStartGame = () => {
    if (validateForm()) {
      dispatch(setPlayers({ player1: player1.trim(), player2: player2.trim() }))
    }
  }

  const isFormValid = player1.trim().length >= 2 && player2.trim().length >= 2 && player1.trim() !== player2.trim()

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Player Setup</CardTitle>
          <CardDescription>
            Enter names for both players to start the game
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="player1" className="text-sm font-medium">
              Player 1 (X)
            </Label>
            <Input
              id="player1"
              type="text"
              placeholder="Enter Player 1 name"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              className={`transition-all duration-300 ${
                errors.player1 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'focus:border-blue-500'
              }`}
            />
            {errors.player1 && (
              <p className="text-sm text-red-600">{errors.player1}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="player2" className="text-sm font-medium">
              Player 2 (O)
            </Label>
            <Input
              id="player2"
              type="text"
              placeholder="Enter Player 2 name"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              className={`transition-all duration-300 ${
                errors.player2 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'focus:border-blue-500'
              }`}
            />
            {errors.player2 && (
              <p className="text-sm text-red-600">{errors.player2}</p>
            )}
          </div>

          <Button
            onClick={handleStartGame}
            disabled={!isFormValid}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Game
          </Button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Game Rules:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Best of 5 rounds (first to 3 wins)</li>
              <li>• Win: 2 points, Loss: 1 point, Draw: 0 points</li>
              <li>• Scores are tracked in the leaderboard</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}