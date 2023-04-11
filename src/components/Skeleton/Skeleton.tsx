import React, { useContext } from 'react'
import { AppContext } from 'src/context/app.context'

const Skeleton = ({ className }: { className: string }) => {
  const { theme } = useContext(AppContext)
  return <div className={`${theme === 'Dark' ? 'skeleton-dark' : 'skeleton-light'} ${className}`}></div>
}

export default Skeleton
