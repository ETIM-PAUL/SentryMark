import { Globe } from 'lucide-react'
import React from 'react'
import Header from '../components/header'

const IP_Monitoring = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header/>
    <div className="text-center py-20">
      <Globe className="mx-auto mb-4 text-purple-400" size={64} />
      <h2 className="text-2xl font-bold text-slate-200 mb-2">Web & Social Media Monitoring</h2>
      <p className="text-slate-400">Content implementation pending</p>
    </div>
    </div>
  )
}

export default IP_Monitoring