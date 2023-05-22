import React, { lazy, Suspense, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import { AppContext } from './context/app.context'
import MainLayout from './layout/MainLayout'
import ManageVideoLayout from './layout/ManageVideoLayout/ManageVideoLayout'
import RegisterLayout from './layout/RegisterLayout'
// import AnalyticsPage from './pages/AnalyticsPage'
// import ChangePasswordPage from './pages/ChangePasswordPage'
// import ChannelPage from './pages/ChannelPage'
// import About from './pages/ChannelPage/components/About'
// import Home from './pages/ChannelPage/components/Home'
// import PlayList from './pages/ChannelPage/components/PlayList'
// import Video from './pages/ChannelPage/components/Video'
// import DetailPage from './pages/DetailPage'
// import ForgotPasswordPage from './pages/ForgotPasswordPage'
// import HomePage from './pages/HomePage'
// import ManageContentPage from './pages/ManageContentPage'
// import ProfilePage from './pages/ProfilePage'
// import ResetPasswordPage from './pages/ResetPasswordPage'
// import SignInPage from './pages/SignInPage'
// import SignUpPage from './pages/SignUpPage'
// import UploadVideoPage from './pages/UploadVideoPage'
// import VerifyPage from './pages/VerifyPage'
// import SearchPage from './pages/SearchPage'
// import VerifyResetPassPage from './pages/VerifyResetPassPage'
// import LibraryPage from './pages/LibraryPage/LibraryPage'
// import HistoryPage from './pages/HistoryPage'
// import LikedPlaylistPage from './pages/LikedPlaylistPage'
// import SubscriptionsPage from './pages/SubscriptionsPage'
// import NotFoundPage from './pages/NotFoundPage'

const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'))
const ChangePasswordPage = lazy(() => import('./pages/ChangePasswordPage'))
const ChannelPage = lazy(() => import('./pages/ChannelPage'))
const About = lazy(() => import('./pages/ChannelPage/components/About'))
const Home = lazy(() => import('./pages/ChannelPage/components/Home'))
const PlayList = lazy(() => import('./pages/ChannelPage/components/PlayList'))
const Video = lazy(() => import('./pages/ChannelPage/components/Video'))
const DetailPage = lazy(() => import('./pages/DetailPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const ManageContentPage = lazy(() => import('./pages/ManageContentPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'))
const SignInPage = lazy(() => import('./pages/SignInPage'))
const SignUpPage = lazy(() => import('./pages/SignUpPage'))
const UploadVideoPage = lazy(() => import('./pages/UploadVideoPage'))
const VerifyPage = lazy(() => import('./pages/VerifyPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const VerifyResetPassPage = lazy(() => import('./pages/VerifyResetPassPage'))
const LibraryPage = lazy(() => import('./pages/LibraryPage/LibraryPage'))
const HistoryPage = lazy(() => import('./pages/HistoryPage'))
const LikedPlaylistPage = lazy(() => import('./pages/LikedPlaylistPage'))
const SubscriptionsPage = lazy(() => import('./pages/SubscriptionsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function ProtectedRoute() {
  const { isVerify } = useContext(AppContext)
  return isVerify === '2' ? <Outlet /> : <Navigate to='/' />
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
              element: (
                <Suspense>
                  <SignInPage />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense>
                  <SignUpPage />
                </Suspense>
              )
            },

            {
              path: path.forgotPassword,
              element: (
                <Suspense>
                  <ForgotPasswordPage />
                </Suspense>
              )
            },

            {
              path: path.verifyResetPass,
              element: (
                <Suspense>
                  <VerifyResetPassPage />
                </Suspense>
              )
            },
            {
              path: path.resetPassword,
              element: (
                <Suspense>
                  <ResetPasswordPage />
                </Suspense>
              )
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
          element: <MainLayout />,
          children: [
            {
              path: path.library,
              element: (
                <Suspense>
                  <LibraryPage />
                </Suspense>
              )
            },
            {
              path: path.history,
              element: (
                <Suspense>
                  <HistoryPage />
                </Suspense>
              )
            },
            {
              path: path.likedPlaylist,
              element: (
                <Suspense>
                  <LikedPlaylistPage />
                </Suspense>
              )
            },
            {
              path: path.subscriptions,
              element: (
                <Suspense>
                  <SubscriptionsPage />
                </Suspense>
              )
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
              element: (
                <Suspense>
                  <UploadVideoPage />
                </Suspense>
              )
            },
            {
              path: path.content,
              element: (
                <Suspense>
                  <ManageContentPage />
                </Suspense>
              )
            },
            {
              path: path.analytics,
              element: (
                <Suspense>
                  <AnalyticsPage />
                </Suspense>
              )
            },
            {
              path: path.profile,
              element: (
                <Suspense>
                  <ProfilePage />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePasswordPage />
                </Suspense>
              )
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
              element: (
                <Suspense>
                  <HomePage />
                </Suspense>
              )
            },
            {
              path: path.search,
              element: (
                <Suspense>
                  <SearchPage />
                </Suspense>
              )
            },
            {
              path: path.detail,
              element: (
                <Suspense>
                  <DetailPage />
                </Suspense>
              )
            },

            {
              element: (
                <Suspense>
                  <ChannelPage />
                </Suspense>
              ),
              children: [
                {
                  path: path.channel,
                  index: true,
                  element: (
                    <Suspense>
                      <Home />
                    </Suspense>
                  )
                },
                {
                  path: path.video,
                  element: (
                    <Suspense>
                      <Video />
                    </Suspense>
                  )
                },
                {
                  path: path.playList,
                  element: (
                    <Suspense>
                      <PlayList />
                    </Suspense>
                  )
                },
                {
                  path: path.about,
                  element: (
                    <Suspense>
                      <About />
                    </Suspense>
                  )
                }
              ]
            },
            {
              path: path.notfound,
              element: (
                <Suspense>
                  <NotFoundPage />
                </Suspense>
              )
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
              element: (
                <Suspense>
                  <VerifyPage />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])
  return routeElements
}

export default useRouteElement
