import React from 'react'
import { Loader } from "lucide-react"

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center bg-slate-900   h-screen">
      <Loader  className="animate-spin  h-12 w-12 text-white" />
    </div>
  )
}

export default PageLoader

