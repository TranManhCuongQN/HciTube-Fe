import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Header from './components/Header'
import path from './constants/path'
import { AppContext } from './context/app.context'
import MainLayout from './layout/MainLayout'
import ManageVideoLayout from './layout/ManageVideoLayout/ManageVideoLayout'
import RegisterLayout from './layout/RegisterLayout'
import DetailPage from './pages/DetailPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import HomePage from './pages/HomePage'
import ManageContentPage from './pages/ManageContentPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import UploadVideoPage from './pages/UploadVideoPage'
import VerifyPage from './pages/VerifyPage'

function ProtectedRoute() {
  const { isVerify } = useContext(AppContext)
  return isVerify === '2' ? <Outlet /> : <Navigate to='/login' />
}

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
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <ManageVideoLayout />,
          children: [
            {
              path: path.upload,
              element: <UploadVideoPage />
            },
            {
              path: path.content,
              element: <ManageContentPage />
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
