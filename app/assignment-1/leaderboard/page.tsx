'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { clearLeaderboard } from '@/lib/features/ticTacToe/ticTacToeSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Trash2, Medal, Award } from 'lucide-react'
import Navigation from '@/components/tic-tac-toe/Navigation'

export default function LeaderboardPage() {
  const dispatch = useAppDispatch()
  const { leaderboard } = useAppSelector((state) => state.ticTacToe)

  const handleClearLeaderboard = () => {
    if (confirm('Are you sure you want to clear the leaderboard?')) {
      dispatch(clearLeaderboard())
    }
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="w-6 h-6 text-yellow-500" />
      case 1: return <Medal className="w-6 h-6 text-gray-400" />
      case 2: return <Award className="w-6 h-6 text-orange-600" />
      default: return <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm font-bold">{index + 1}</div>
    }
  }

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0: return 'border-yellow-400 bg-yellow-50'
      case 1: return 'border-gray-400 bg-gray-50'
      case 2: return 'border-orange-400 bg-orange-50'
      default: return 'border-gray-200 bg-white'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Leaderboard</span>
        </h1>
        <p className="text-gray-600">Session-based player rankings and scores</p>
      </div>

      <Navigation />

      <div className="mt-8">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span>Session Leaderboard</span>
              </CardTitle>
              <p className="text-gray-600 mt-1">
                Persistent across page reloads
              </p>
            </div>
            {leaderboard.length > 0 && (
              <Button
                onClick={handleClearLeaderboard}
                variant="destructive"
                size="sm"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {leaderboard.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl font-semibold text-gray-500 mb-2">No Games Played Yet</p>
                <p className="text-gray-400">Start a game to see players on the leaderboard</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div 
                    key={`${entry.name}-${index}`}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 ${getRankStyle(index)}`}
                  >
                    <div className="flex items-center space-x-4">
                      {getRankIcon(index)}
                      <div>
                        <p className="font-semibold text-lg">{entry.name}</p>
                        {index === 0 && leaderboard.length > 1 && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            Top Player
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-2xl">{entry.totalScore}</p>
                      <p className="text-sm text-gray-600">points</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {leaderboard.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Scoring System:</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>• Win a round: <strong>+2 points</strong></p>
                  <p>• Lose a round: <strong>+1 point</strong></p>
                  <p>• Draw a round: <strong>+0 points</strong></p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}