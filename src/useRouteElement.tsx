import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Header from './components/Header'
import path from './constants/path'
import { AppContext } from './context/app.context'
import MainLayout from './layout/MainLayout'
import RegisterLayout from './layout/RegisterLayout'
import DetailPage from './pages/DetailPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import HomePage from './pages/HomePage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import VerifyPage from './pages/VerifyPage'

// function ProtectedRoute() {
//   const { isAuthentication } = useContext(AppContext)
//   return isAuthentication ? <Outlet /> : <Navigate to='/login' />
// }

function CheckVerify() {
  const { isVerify } = useContext(AppContext)
  return isVerify === '1' ? <Outlet /> : <Navigate to='/' />
}
function AllAccess() {
  const { isVerify } = useContext(AppContext)
  return isVerify !== '1' ? <Outlet /> : <Navigate to='/verify' />
}

function RejectRoute() {
  const { isVerify } = useContext(AppContext)
  return isVerify === '2' ? <Navigate to='/' /> : isVerify === '1' ? <Navigate to='/verify' /> : <Outlet />
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
              path: path.forgotPassword,
              element: <ForgotPasswordPage />
            },
            {
              path: path.resetPassword,
              element: <ResetPasswordPage />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <AllAccess />,
      children: [
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
      ]
    },
    {
      path: '',
      element: <CheckVerify />,
      children: [
        {
          path: '',
          element: <RegisterLayout />,
          children: [
            {
              path: path.verify,
              element: <VerifyPage />
            }
          ]
        }
      ]
    }
  ])
  return routeElements
}

export default useRouteElement
