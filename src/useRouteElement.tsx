import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Header from './components/Header'
import path from './constants/path'
import { AppContext } from './context/app.context'
import MainLayout from './layout/MainLayout'
import DetailPage from './pages/DetailPage'
import HomePage from './pages/HomePage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function ProtectedRoute() {
  const { isAuthentication } = useContext(AppContext)
  return isAuthentication ? <Outlet /> : <Navigate to='/login' />
}

function RejectRoute() {
  const { isAuthentication } = useContext(AppContext)
  return isAuthentication ? <Navigate to='/' /> : <Outlet />
}
const useRouteElement = () => {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectRoute />,
      children: [
        {
          path: path.login,
          element: (
            <>
              <Header />
              <SignIn />
            </>
          )
        },
        {
          path: path.register,
          element: <SignUp />
        }
      ]
    },
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: path.home,
          index: true,
          element: <HomePage />
        },
        {
          path: path.detail,
          element: <DetailPage />
        }
      ]
    }
  ])
  return routeElements
}

export default useRouteElement
