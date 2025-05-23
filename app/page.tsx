import { GameSelector } from 'app/components/game-selector'
import { HardwareForm } from 'app/components/hardware-form'
import { Recommendations } from 'app/components/recommendations'

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Game Settings Optimizer</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <GameSelector />
          <HardwareForm />
        </div>
        <div className="lg:col-span-2">
          <Recommendations />
        </div>
      </div>
    </main>
  )
}
