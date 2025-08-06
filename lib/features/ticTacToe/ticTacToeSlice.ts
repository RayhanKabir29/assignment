import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Player {
  name: string
  symbol: 'X' | 'O'
  score: number
  roundWins: number
}

export interface GameState {
  players: Player[]
  currentPlayerIndex: number
  board: (string | null)[]
  gameStatus: 'setup' | 'playing' | 'round-over' | 'game-over'
  currentRound: number
  winner: string | null
  roundWinner: string | null
  leaderboard: { name: string; totalScore: number }[]
}

const initialState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  board: Array(9).fill(null),
  gameStatus: 'setup',
  currentRound: 1,
  winner: null,
  roundWinner: null,
  leaderboard: JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('ticTacToeLeaderboard') || '[]' : '[]'),
}

const ticTacToeSlice = createSlice({
  name: 'ticTacToe',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<{ player1: string; player2: string }>) => {
      state.players = [
        { name: action.payload.player1, symbol: 'X', score: 0, roundWins: 0 },
        { name: action.payload.player2, symbol: 'O', score: 0, roundWins: 0 },
      ]
      state.gameStatus = 'playing'
    },
    makeMove: (state, action: PayloadAction<number>) => {
      if (state.board[action.payload] === null && state.gameStatus === 'playing') {
        state.board[action.payload] = state.players[state.currentPlayerIndex].symbol
        
        // Check for winner
        const winner = checkWinner(state.board)
        if (winner) {
          state.roundWinner = state.players[state.currentPlayerIndex].name
          state.players[state.currentPlayerIndex].score += 2
          state.players[state.currentPlayerIndex].roundWins += 1
          state.players[1 - state.currentPlayerIndex].score += 1
          state.gameStatus = 'round-over'
        } else if (state.board.every(cell => cell !== null)) {
          // Draw
          state.roundWinner = 'Draw'
          state.gameStatus = 'round-over'
        } else {
          state.currentPlayerIndex = 1 - state.currentPlayerIndex
        }
      }
    },
    nextRound: (state) => {
      if (state.currentRound < 5) {
        state.currentRound += 1
        state.board = Array(9).fill(null)
        state.currentPlayerIndex = 0
        state.gameStatus = 'playing'
        state.roundWinner = null
        
        // Check if someone has already won (3 out of 5)
        if (state.players[0].roundWins >= 3 || state.players[1].roundWins >= 3) {
          state.gameStatus = 'game-over'
          state.winner = state.players[0].roundWins > state.players[1].roundWins 
            ? state.players[0].name 
            : state.players[1].name
          updateLeaderboard(state)
        }
      } else {
        state.gameStatus = 'game-over'
        state.winner = state.players[0].roundWins > state.players[1].roundWins 
          ? state.players[0].name 
          : state.players[1].roundWins > state.players[0].roundWins
          ? state.players[1].name
          : 'Draw'
        updateLeaderboard(state)
      }
    },
    resetBoard: (state) => {
      state.board = Array(9).fill(null)
      state.currentPlayerIndex = 0
      state.roundWinner = null
      if (state.gameStatus === 'round-over') {
        state.gameStatus = 'playing'
      }
    },
    resetGame: (state) => {
      state.players = []
      state.currentPlayerIndex = 0
      state.board = Array(9).fill(null)
      state.gameStatus = 'setup'
      state.currentRound = 1
      state.winner = null
      state.roundWinner = null
    },
    clearLeaderboard: (state) => {
      state.leaderboard = []
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ticTacToeLeaderboard')
      }
    },
  },
})

function checkWinner(board: (string | null)[]): boolean {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]
  
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern
    return board[a] && board[a] === board[b] && board[a] === board[c]
  })
}

function updateLeaderboard(state: GameState) {
  state.players.forEach(player => {
    const existingEntry = state.leaderboard.find(entry => entry.name === player.name)
    if (existingEntry) {
      existingEntry.totalScore += player.score
    } else {
      state.leaderboard.push({ name: player.name, totalScore: player.score })
    }
  })
  
  state.leaderboard.sort((a, b) => b.totalScore - a.totalScore)
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('ticTacToeLeaderboard', JSON.stringify(state.leaderboard))
  }
}

export const { setPlayers, makeMove, nextRound, resetBoard, resetGame, clearLeaderboard } = ticTacToeSlice.actions
export default ticTacToeSlice.reducer