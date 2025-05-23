'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const aiSchema = z.object({
  apiKey: z.string().min(1, 'API key is required'),
  model: z.string().min(1, 'Model is required'),
  endpoint: z.string().url('Must be a valid URL'),
  temperature: z.number().min(0).max(1),
  maxTokens: z.number().min(100).max(4000),
  promptTemplate: z.string().min(100, 'Prompt should be at least 100 characters')
})

type AISettingsFormData = z.infer<typeof aiSchema>

export function AISettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AISettingsFormData>({
    resolver: zodResolver(aiSchema)
  })

  const onSubmit = (data: AISettingsFormData) => {
    console.log('Submitted AI settings:', data)
    // TODO: Connect to Supabase
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">AI Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">API Key</label>
          <input
            type="password"
            {...register('apiKey')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
            placeholder="sk-..."
          />
          {errors.apiKey && <p className="text-red-400 text-sm mt-1">{errors.apiKey.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Model</label>
          <input
            {...register('model')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
            placeholder="e.g. gpt-4-turbo"
          />
          {errors.model && <p className="text-red-400 text-sm mt-1">{errors.model.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Endpoint</label>
          <input
            {...register('endpoint')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
            placeholder="https://api.openai.com/v1/chat/completions"
          />
          {errors.endpoint && <p className="text-red-400 text-sm mt-1">{errors.endpoint.message}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Temperature</label>
            <input
              type="number"
              step="0.1"
              {...register('temperature', { valueAsNumber: true })}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
              min="0"
              max="1"
              defaultValue="0.7"
            />
            {errors.temperature && <p className="text-red-400 text-sm mt-1">{errors.temperature.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Max Tokens</label>
            <input
              type="number"
              {...register('maxTokens', { valueAsNumber: true })}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3"
              min="100"
              max="4000"
              defaultValue="1000"
            />
            {errors.maxTokens && <p className="text-red-400 text-sm mt-1">{errors.maxTokens.message}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Prompt Template</label>
          <textarea
            {...register('promptTemplate')}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 min-h-[200px]"
            placeholder="Enter the prompt template for generating recommendations..."
            defaultValue={`Given the following hardware specifications and game, provide optimal graphics settings:

Hardware:
- CPU: {cpu}
- GPU: {gpu}
- RAM: {ram}
- Resolution: {resolution}

Game: {game}

Consider the following when making recommendations:
1. Target 60+ FPS
2. Balance between visual quality and performance
3. Prioritize settings that have the most visual impact
4. Adjust based on the hardware's performance tier

Provide recommendations in this format:
- Preset: [Low/Medium/High/Ultra]
- Key Settings:
  - Texture Quality: [Value]
  - Shadow Quality: [Value]
  - Anti-Aliasing: [Value]
  - Effects Quality: [Value]
  - View Distance: [Value]
- Additional Notes: [Any specific optimizations or tradeoffs]`}
          />
          {errors.promptTemplate && <p className="text-red-400 text-sm mt-1">{errors.promptTemplate.message}</p>}
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          Save AI Settings
        </button>
      </form>
    </div>
  )
}
