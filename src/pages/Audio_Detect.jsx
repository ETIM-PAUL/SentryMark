import { Music } from 'lucide-react'
import React from 'react'
import Header from '../components/header'

const Audio_Detect = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header/>

    <div className="text-center py-20">
    <Music className="mx-auto mb-4 text-purple-400" size={64} />
    <h2 className="text-2xl font-bold text-slate-200 mb-2">Music/Audio Recognition</h2>
    <p className="text-slate-400">Content implementation pending</p>
  </div>
  </div>
  )
}

export default Audio_Detect