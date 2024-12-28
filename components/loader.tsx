import React from 'react'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

export function Loader({ size = 'medium', color = 'currentColor' }: LoaderProps) {
  const sizeClass = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className="flex justify-center items-center fixed top-50 left-auto right-auto">
<span className="loader"></span>    </div>
  )
}
