'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function GameSelector() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [games, setGames] = useState<{ id: string; name: string }[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from('games')
        .select('id, name')
        .order('name', { ascending: true })

      if (error) {
        console.error('Error fetching games:', error)
        return
      }

      setGames(data || [])
    }

    fetchGames()
  }, [supabase])

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Select Game</h2>
      <div className="relative">
        <select
          value={selectedGame || ''}
          onChange={(e) => setSelectedGame(e.target.value || null)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 appearance-none"
        >
          <option value="">Select a game</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  )
}
