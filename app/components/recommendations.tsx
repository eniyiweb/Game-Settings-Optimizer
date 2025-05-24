'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchRecommendations = async () => {
      const { data, error } = await supabase
        .from('recommendations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) {
        console.error('Error fetching recommendations:', error)
        return
      }

      if (data && data.length > 0) {
        setRecommendations(data[0].recommendation)
      }
    }

    fetchRecommendations()
  }, [supabase])

  return (
    <div className="bg-gray-800 p-6 rounded-lg h-full">
      <h2 className="text-xl font-semibold mb-4">Recommended Settings</h2>
      <div className="bg-gray-700 rounded-lg p-4">
        {recommendations ? (
          <pre className="whitespace-pre-wrap">{recommendations}</pre>
        ) : (
          <p className="text-gray-400 text-center">Select a game and enter your hardware to get recommendations</p>
        )}
      </div>
    </div>
  )
}
