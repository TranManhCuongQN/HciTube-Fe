import AsideBar from '../HomePage/components/AsideBar'
import VideoItem from './components/VideoItem/'
import { GiSettingsKnobs } from 'react-icons/gi'
import { useContext, useEffect, useRef, useState } from 'react'
import Filter from './components/Filter'
import useQueryConfig from 'src/hook/useQueryConfig'
import { useMutation, useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import { BsSearch } from 'react-icons/bs'
import Skeleton from 'src/components/Skeleton'
import { convertNumberToDisplayString } from 'src/utils/utils'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from 'src/context/app.context'
import parse from 'html-react-parser'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { subscriberApi } from 'src/api/subscriber.api'
import { toast } from 'react-toastify'
import { setProfileToLocalStorage } from 'src/utils/auth'
import { Helmet } from 'react-helmet-async'

const SearchPage = () => {
  const filterRef = useRef<HTMLDivElement>(null)
  const queryConfig = useQueryConfig()
  const { profile, setProfile, isVerify, keyword } = useContext(AppContext)
  const [isSubscribed, setIsSubscribed] = useState<number[]>([])
  const navigate = useNavigate()

  const {
    data: getVideo,
    isSuccess,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['getVideo', queryConfig],
    queryFn: () => videoApi.searchVideo(queryConfig)
  })

  const handleClickFilterBtn = () => {
    if (filterRef.current) {
      filterRef.current.classList.toggle('active-grid')
    }
  }

  useEffect(() => {
    if (getVideo?.data.data.users) {
      const isSubscribedArr = getVideo?.data.data.users.map((item) => item.subscribers)
      const isSubscribed = isSubscribedArr?.map((item) => item?.findIndex((item) => item === profile?.id))
      setIsSubscribed(isSubscribed as number[])
    }
  }, [getVideo?.data.data.users, profile?.id])

  const subscribeChannelMutation = useMutation({
    mutationFn: subscriberApi.subscribeChannel,
    onSuccess: (data) => {
      setProfile(data.data.data.user)
      setProfileToLocalStorage(data.data.data.user)
      refetch()
    }
  })

  const deleteSubscribeChannelMutation = useMutation({
    mutationFn: subscriberApi.deleteSubscribeChannel,
    onSuccess: (data) => {
      setProfile(data.data.data.user)
      setProfileToLocalStorage(data.data.data.user)
      refetch()
    }
  })

  const handleUnSubscribeChannel = (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.preventDefault()
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    setIsSubscribed((prev) => {
      prev[index] = -1
      return [...prev]
    })
    deleteSubscribeChannelMutation.mutate({ channel: id })
  }

  const handleSubscribeChannel = (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.preventDefault()
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    setIsSubscribed((prev) => {
      prev[index] = 1
      return [...prev]
    })
    subscribeChannelMutation.mutate({ channel: id })
  }

  return (
    <>
      <Helmet>
        <title>{keyword} - HciTube</title>
        <meta name='description' content={`${keyword} - HciTube`} />
      </Helmet>
      <div className='container flex gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
        <AsideBar />
        <div className='mb-16 flex min-h-screen w-full flex-col 2xl:pl-64'>
          <div className='flex h-full w-full flex-col items-center justify-center md:px-3 lg:px-6 lg:py-4'>
            <div className='relative h-full w-full max-w-[1280px] lg:grid lg:grid-cols-1'>
              <div className=' flex flex-col lg:col-span-1'>
                <div className='border-[rgba(0, 0, 0, 0.1)] border-b py-2 dark:border-gray-600 max-lg:ml-3'>
                  <button
                    onClick={handleClickFilterBtn}
                    className='flex items-center rounded-full px-4 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
                  >
                    <GiSettingsKnobs className='mr-2 h-5 w-5 rotate-90 text-black dark:text-white' />
                    <span className='font-semibold text-black line-clamp-2 dark:text-white sm:text-sm md:font-bold lg:text-base'>
                      Bộ lọc
                    </span>
                  </button>

                  <div ref={filterRef} className='hidden grid-cols-1 pl-4 md:grid-cols-4'>
                    <Filter />
                  </div>
                </div>

                {isSuccess &&
                  getVideo.data.data.users.length > 0 &&
                  getVideo.data.data.users.map((item, index) => (
                    <Link
                      to={`/${item._id}/channel`}
                      className='border-[rgba(0, 0, 0, 0.1)] relative z-0 flex w-full cursor-pointer items-center border-b py-4 dark:border-gray-600 max-lg:px-3'
                      key={item._id}
                    >
                      <div className='mr-3 flex w-[120px] md:w-[200px] lg:w-[360px] lg:justify-center '>
                        <img src={item.avatar} alt='' className='h-24 w-24 rounded-full md:h-[8.5rem] md:w-[8.5rem]' />
                      </div>
                      <div className='flex flex-1 flex-row items-center justify-between gap-y-3 md:flex-col md:items-start lg:flex-row lg:items-center'>
                        <div className='flex flex-col gap-y-2'>
                          <span className='text-lg font-medium dark:text-[#f1f1f1]'>{item.fullName}</span>
                          <span className='hidden text-xs font-normal dark:text-[#aaa] md:block'>
                            {convertNumberToDisplayString(item.subscribers?.length as number)} người đăng ký
                          </span>

                          <span className='text-xs font-normal dark:text-[#aaa] md:hidden'>
                            {' '}
                            {convertNumberToDisplayString(item.subscribers?.length as number)} người đăng ký
                          </span>
                          <span
                            className='hidden text-xs font-normal line-clamp-2 dark:text-[#aaa] md:block'
                            dangerouslySetInnerHTML={{ __html: String(parse((item.description as string) || '')) }}
                          ></span>
                        </div>

                        {item._id !== profile?._id &&
                          (isSubscribed[index] !== -1 ? (
                            <button
                              className=' relative z-10 flex flex-shrink-0 items-center gap-x-2 rounded-full bg-[#f2f2f2] px-4 py-2 text-sm  font-bold text-black hover:bg-[#E5E5E5] dark:bg-[#272727] dark:text-white dark:hover:bg-[#4d4d4d]'
                              onClick={(e) => handleUnSubscribeChannel(item._id as string, e, index)}
                            >
                              <IoMdNotificationsOutline className='h-6 w-6 text-black dark:text-white' />
                              Đã đăng ký
                            </button>
                          ) : (
                            <button
                              className=' relative z-10 h-fit flex-shrink-0 rounded-full bg-black px-4 py-2 text-sm font-bold  text-white hover:bg-[#4d4d4d] dark:bg-white dark:text-black dark:hover:bg-[#E5E5E5]'
                              onClick={(e) => handleSubscribeChannel(item._id as string, e, index)}
                            >
                              Đăng ký
                            </button>
                          ))}
                      </div>
                    </Link>
                  ))}

                {isLoading &&
                  Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        className='mt-4 flex w-full cursor-pointer flex-col gap-y-5 lg:flex-row lg:gap-x-5'
                        key={index}
                      >
                        <Skeleton className='h-56 w-full flex-shrink-0 md:rounded-xl lg:w-[360px]' />
                        <div className='flex w-full flex-col gap-y-5'>
                          <Skeleton className='h-4 w-full rounded-lg' />
                          <Skeleton className='h-4 w-1/2 rounded-lg' />
                          <Skeleton className='h-4 w-1/3 rounded-lg' />
                          <Skeleton className='h-4 w-1/4 rounded-lg' />
                        </div>
                      </div>
                    ))}

                {isSuccess &&
                  (getVideo?.data.data.videos.length as number) > 0 &&
                  getVideo?.data.data.videos.map((item) => <VideoItem key={item._id} data={item} />)}

                {isSuccess &&
                  (getVideo.data.data.videos.length as number) === 0 &&
                  getVideo.data.data.users.length === 0 && (
                    <div className='mt-40 flex w-full items-center justify-center gap-x-8'>
                      <BsSearch className='text-2xl text-gray-400 dark:text-gray-500 md:text-3xl' />
                      <span className='text-xl font-bold text-black dark:text-white md:text-2xl'>
                        Không tìm thấy kết quả
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SearchPage
