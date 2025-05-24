'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const gameSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  minRequirements: z.string().optional(),
  recommendedRequirements: z.string().optional()
})

type GameFormData = z.infer<typeof gameSchema>

export function GameForm() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema)
  })

  const onSubmit = async (data: GameFormData) => {
    try {
      const { error } = await supabase
        .from('games')
        .upsert([data], { onConflict: 'name' })

      if (error) throw error

      toast.success('Game saved successfully')
      router.refresh()
    } catch (error) {
      toast.error('Failed to save game')
      console.error('Error saving game:', error)
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Manage Games</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Game Name</label>
          <input
            {...register('name')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
            placeholder="e.g. Counter-Strike 2"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register('description')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 min-h-[100px]"
            placeholder="Game description..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Minimum Requirements</label>
          <textarea
            {...register('minRequirements')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 min-h-[100px]"
            placeholder="Minimum hardware requirements..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Recommended Requirements</label>
          <textarea
            {...register('recommendedRequirements')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 min-h-[100px]}
            placeholder="Recommended hardware..."
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Game'}
        </button>
      </form>
    </div>
  )
}
