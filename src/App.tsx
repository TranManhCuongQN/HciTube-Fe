import useRouteElement from './useRouteElement'
import WatchingLayout from './layout/WatchingLayout'


function App() {
  const routeElements = useRouteElement()
  // return <div className='App h-full bg-white dark:bg-[#0f0f0f]'>{routeElements}</div>
  return (
    <div className='App bg-white dark:bg-[#0f0f0f]'>
      <WatchingLayout/>
    </div>
  )
}

export default App
