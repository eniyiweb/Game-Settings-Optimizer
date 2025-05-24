'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const hardwareSchema = z.object({
  cpu: z.string().min(1, 'CPU is required'),
  gpu: z.string().min(1, 'GPU is required'),
  ram: z.string().min(1, 'RAM is required'),
  resolution: z.string().min(1, 'Resolution is required')
})

type HardwareFormData = z.infer<typeof hardwareSchema>

export function HardwareForm() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<HardwareFormData>({
    resolver: zodResolver(hardwareSchema)
  })

  const onSubmit = async (data: HardwareFormData) => {
    try {
      const { error } = await supabase
        .from('user_hardware')
        .upsert([data], { onConflict: 'user_id' })

      if (error) throw error

      toast.success('Hardware saved successfully')
      router.refresh()
    } catch (error) {
      toast.error('Failed to save hardware')
      console.error('Error saving hardware:', error)
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Your Hardware</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">CPU</label>
          <input
            {...register('cpu')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
            placeholder="e.g. Intel Core i7-13700K"
          />
          {errors.cpu && <p className="text-red-400 text-sm mt-1">{errors.cpu.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">GPU</label>
          <input
            {...register('gpu')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
            placeholder="e.g. NVIDIA RTX 4070"
          />
          {errors.gpu && <p className="text-red-400 text-sm mt-1">{errors.gpu.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">RAM</label>
          <input
            {...register('ram')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
            placeholder="e.g. 32GB DDR5"
          />
          {errors.ram && <p className="text-red-400 text-sm mt-1">{errors.ram.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Resolution</label>
          <select
            {...register('resolution')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
          >
            <option value="">Select resolution</option>
            <option value="1080p">1920×1080 (1080p)</option>
            <option value="1440p">2560×1440 (1440p)</option>
            <option value="4k">3840×2160 (4K)</option>
          </select>
          {errors.resolution && <p className="text-red-400 text-sm mt-1">{errors.resolution.message}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Get Recommendations'}
        </button>
      </form>
    </div>
  )
}
