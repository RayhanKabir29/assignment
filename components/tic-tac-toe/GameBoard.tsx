'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { makeMove, resetBoard, nextRound } from '@/lib/features/ticTacToe/ticTacToeSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, Play } from 'lucide-react'

export default function GameBoard() {
  const dispatch = useAppDispatch()
  const { 
    board, 
    players, 
    currentPlayerIndex, 
    gameStatus, 
    currentRound, 
    roundWinner 
  } = useAppSelector((state) => state.ticTacToe)

  const handleCellClick = (index: number) => {
    dispatch(makeMove(index))
  }

  const handleResetBoard = () => {
    dispatch(resetBoard())
  }

  const handleNextRound = () => {
    dispatch(nextRound())
  }

  return (
    <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
      {/* Game Status */}
      <div className="lg:order-1">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Game Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Badge variant="outline" className="text-lg px-4 py-2">
                Round {currentRound} of 5
              </Badge>
            </div>
            
            {gameStatus === 'playing' && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Current Turn:</p>
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  currentPlayerIndex === 0 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  <span className="font-bold text-2xl">
                    {players[currentPlayerIndex].symbol}
                  </span>
                  <span className="font-semibold">
                    {players[currentPlayerIndex].name}
                  </span>
                </div>
              </div>
            )}

            {gameStatus === 'round-over' && (
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    {roundWinner === 'Draw' ? 'Round Draw!' : `${roundWinner} Wins Round ${currentRound}!`}
                  </p>
                </div>
                <Button
                  onClick={handleNextRound}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {currentRound < 5 ? 'Next Round' : 'Finish Game'}
                </Button>
              </div>
            )}

            <Button
              onClick={handleResetBoard}
              variant="outline"
              className="w-full"
              disabled={gameStatus === 'round-over'}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Board
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Game Board */}
      <div className="lg:order-2">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleCellClick(index)}
                  disabled={cell !== null || gameStatus !== 'playing'}
                  className={`
                    aspect-square flex items-center justify-center text-4xl font-bold
                    border-2 border-gray-300 rounded-lg transition-all duration-300
                    ${cell === null && gameStatus === 'playing' 
                      ? 'hover:bg-blue-50 hover:border-blue-400 cursor-pointer' 
                      : 'cursor-not-allowed'
                    }
                    ${cell === 'X' ? 'text-blue-600 bg-blue-50' : ''}
                    ${cell === 'O' ? 'text-purple-600 bg-purple-50' : ''}
                    ${cell === null ? 'bg-white' : ''}
                  `}
                >
                  {cell}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scoreboard */}
      <div className="lg:order-3">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Scoreboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {players.map((player, index) => (
              <div key={player.name} className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                currentPlayerIndex === index && gameStatus === 'playing'
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold text-xl ${
                      player.symbol === 'X' ? 'text-blue-600' : 'text-purple-600'
                    }`}>
                      {player.symbol}
                    </span>
                    <span className="font-semibold">{player.name}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center">
                    <p className="text-gray-600">Rounds Won</p>
                    <p className="font-bold text-lg">{player.roundWins}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Total Points</p>
                    <p className="font-bold text-lg">{player.score}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}