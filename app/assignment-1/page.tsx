'use client'
import { useAppSelector } from '@/lib/hooks'
import PlayerSetup from '@/components/tic-tac-toe/PlayerSetup'
import GameBoard from '@/components/tic-tac-toe/GameBoard'
import VictoryScreen from '@/components/tic-tac-toe/VictoryScreen'
import Navigation from '@/components/tic-tac-toe/Navigation'

export default function TicTacToePage() {
  const { gameStatus } = useAppSelector((state) => state.ticTacToe)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Assignment-1: <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tic-Tac-Toe Game</span>
        </h1>
        <p className="text-gray-600">Multi-player game with Redux state management and session tracking</p>
      </div>

      <Navigation />

      <div className="mt-8">
        {gameStatus === 'setup' && <PlayerSetup />}
        {(gameStatus === 'playing' || gameStatus === 'round-over') && <GameBoard />}
        {gameStatus === 'game-over' && <VictoryScreen />}
      </div>
    </div>
  )
}