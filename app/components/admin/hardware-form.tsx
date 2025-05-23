'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const hardwareSchema = z.object({
  type: z.enum(['cpu', 'gpu', 'ram']),
  manufacturer: z.string().min(1, 'Manufacturer is required'),
  model: z.string().min(1, 'Model is required'),
  releaseYear: z.number().min(2019, 'Must be from 2019 or later'),
  performanceTier: z.enum(['low', 'medium', 'high', 'enthusiast'])
})

type HardwareFormData = z.infer<typeof hardwareSchema>

export function HardwareForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<HardwareFormData>({
    resolver: zodResolver(hardwareSchema)
  })

  const onSubmit = (data: HardwareFormData) => {
    console.log('Submitted hardware:', data)
    // TODO: Connect to Supabase
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Manage Hardware</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Hardware Type</label>
          <select
            {...register('type')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
          >
            <option value="cpu">CPU</option>
            <option value="gpu">GPU</option>
            <option value="ram">RAM</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Manufacturer</label>
          <input
            {...register('manufacturer')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
            placeholder="e.g. Intel, AMD, NVIDIA"
          />
          {errors.manufacturer && <p className="text-red-400 text-sm mt-1">{errors.manufacturer.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Model</label>
          <input
            {...register('model')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
            placeholder="e.g. Core i7-13700K, RTX 4070"
          />
          {errors.model && <p className="text-red-400 text-sm mt-1">{errors.model.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Release Year</label>
          <input
            type="number"
            {...register('releaseYear', { valueAsNumber: true })}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
            placeholder="e.g. 2023"
            min="2019"
            max={new Date().getFullYear()}
          />
          {errors.releaseYear && <p className="text-red-400 text-sm mt-1">{errors.releaseYear.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Performance Tier</label>
          <select
            {...register('performanceTier')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="enthusiast">Enthusiast</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          Save Hardware
        </button>
      </form>
    </div>
  )
}
