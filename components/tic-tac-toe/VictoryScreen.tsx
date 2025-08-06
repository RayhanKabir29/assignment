'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { resetGame } from '@/lib/features/ticTacToe/ticTacToeSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, RotateCcw, Users } from 'lucide-react'

export default function VictoryScreen() {
  const dispatch = useAppDispatch()
  const { players, winner } = useAppSelector((state) => state.ticTacToe)

  const handleResetGame = () => {
    dispatch(resetGame())
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="text-center">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
            winner === 'Draw' 
              ? 'bg-gradient-to-r from-gray-600 to-gray-700'
              : 'bg-gradient-to-r from-yellow-500 to-orange-500'
          }`}>
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">
            {winner === 'Draw' ? 'Game Draw!' : `${winner} Wins!`}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge variant="outline" className="text-lg px-4 py-2 mb-4">
              Final Results
            </Badge>
          </div>

          {/* Final Scores */}
          <div className="space-y-3">
            {players
              .slice()
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <div 
                  key={player.name} 
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    index === 0 && winner !== 'Draw'
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`font-bold text-2xl ${
                      player.symbol === 'X' ? 'text-blue-600' : 'text-purple-600'
                    }`}>
                      {player.symbol}
                    </span>
                    <span className="font-semibold text-lg">{player.name}</span>
                    {index === 0 && winner !== 'Draw' && (
                      <Trophy className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Rounds: {player.roundWins}/5</div>
                    <div className="font-bold text-xl">{player.score} pts</div>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleResetGame}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <Users className="w-4 h-4 mr-2" />
              New Players
            </Button>
            <Button
              onClick={handleResetGame}
              variant="outline"
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Scores have been added to the leaderboard
          </div>
        </CardContent>
      </Card>
    </div>
  )
}