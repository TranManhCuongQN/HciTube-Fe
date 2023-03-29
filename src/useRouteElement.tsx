import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Header from './components/Header'
import path from './constants/path'
import { AppContext } from './context/app.context'
import MainLayout from './layout/MainLayout'
import RegisterLayout from './layout/RegisterLayout'
import DetailPage from './pages/DetailPage'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import VerifyPage from './pages/VerifyPage'

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
          path: '',
          element: <RegisterLayout />,
          children: [
            {
              path: path.login,
              element: <SignInPage />
            },
            {
              path: path.register,
              element: <SignUpPage />
            },
            {
              path: path.verify,
              element: <VerifyPage />
            }
          ]
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
