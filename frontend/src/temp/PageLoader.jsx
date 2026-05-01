import React from 'react'
import { Loader } from "lucide-react"

const Pageloader = () => {
  return (
    <div className="flex items-center justify-center bg-slate-900   h-screen">
      <Loader  className="animate-spin  h-12 w-12 text-white" />
      <h2 className="text-white text-xl ml-4">Connecting...</h2>
    </div>
  )
}

export default Pageloader

