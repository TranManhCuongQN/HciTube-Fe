import { useContext, useEffect } from 'react'
import { AppContext } from './context/app.context'
import useRouteElement from './useRouteElement'
import { LocalStorageEventTarget } from './utils/auth'

function App() {
  const routeElements = useRouteElement()

  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLocalStorage', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLocalStorage', reset)
    }
  }, [reset])

  return <div className='App min-h-screen bg-white dark:bg-[#0f0f0f]'>{routeElements}</div>
}

export default App
