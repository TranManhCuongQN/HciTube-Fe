import useRouteElement from './useRouteElement'

function App() {
  const routeElements = useRouteElement()
  return <div className='App h-full bg-white dark:bg-[#0f0f0f]'>{routeElements}</div>
}

export default App
