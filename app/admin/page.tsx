'use client'

import { useState } from 'react'
import { GameForm } from 'app/components/admin/game-form'
import { HardwareForm } from 'app/components/admin/hardware-form'
import { AISettingsForm } from 'app/components/admin/ai-settings-form'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('games')

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="flex border-b border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('games')}
          className={`px-4 py-2 font-medium ${activeTab === 'games' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
        >
          Games
        </button>
        <button
          onClick={() => setActiveTab('hardware')}
          className={`px-4 py-2 font-medium ${activeTab === 'hardware' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
        >
          Hardware
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2 font-medium ${activeTab === 'ai' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
        >
          AI Settings
        </button>
      </div>
      
      {activeTab === 'games' && <GameForm />}
      {activeTab === 'hardware' && <HardwareForm />}
      {activeTab === 'ai' && <AISettingsForm />}
    </main>
  )
}
