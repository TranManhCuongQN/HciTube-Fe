import { omit } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import favoriteApi from 'src/api/favorite.api'
import playListAPI from 'src/api/playlist.api'
import videoApi from 'src/api/video.api'
import Skeleton from 'src/components/Skeleton'
import Video from 'src/components/Video'
import { AppContext } from 'src/context/app.context'
import useQueryConfig from 'src/hook/useQueryConfig'
import { playList } from 'src/types/playList.type'
import { Video as VideoType, VideoItem } from 'src/types/video.type'
import CompactVideoItem from './components/CompactVideoItem'
import VideoInformationAndComment from './components/VideoInformationAndComment'

const DetailPage = () => {
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false)
  const { profile, setKeyword } = useContext(AppContext)
  const { id } = useParams()
  const queryConfig = useQueryConfig()
  const [video, setVideo] = useState<VideoType[]>([])
  const { playList, category, favorite } = queryConfig
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['video', id],
    queryFn: () => videoApi.getVideoById(id as string)
  })

  useEffect(() => {
    setKeyword('')
  }, [])

  const {
    data: dataGetAll,
    isLoading: isLoadingGetAll,
    isSuccess: isSuccessGetAll
  } = useQuery({
    queryKey: 'videoList',
    queryFn: () => videoApi.getVideoAll(),
    enabled: category === '1'
  })

  const {
    data: dataGetVideo,
    isSuccess: isSuccessGetVideo,
    isLoading: isLoadingGetVideo
  } = useQuery({
    queryKey: [
      'getVideo',
      omit(
        {
          ...queryConfig
        },
        ['keyword']
      )
    ],
    queryFn: () =>
      videoApi.searchVideo(
        omit(
          {
            ...queryConfig
          },
          ['keyword']
        )
      ),
    enabled: category !== '1'
  })

  const {
    data: dataGetPlayList,
    isSuccess: isSuccessGetPlayList,
    isLoading: isLoadingGetPlayList
  } = useQuery({
    queryKey: ['playList', playList],
    queryFn: () => playListAPI.getPlayListVideoById(playList as string),
    enabled: Boolean(playList) === true
  })

  const {
    data: dataGetVideoFavorite,
    isSuccess: isSuccessGetVideoFavorite,
    isLoading: isLoadingGetVideoFavorite
  } = useQuery({
    queryKey: ['videoListFavorite', profile?._id],
    queryFn: () => favoriteApi.getVideoFavoriteByChannel(profile?._id as string),
    enabled: Boolean(favorite) === true
  })

  console.log('favorite:', Boolean(favorite))
  console.log('playList:', Boolean(playList))

  // console.log('dataGetVideoFavorite:', dataGetVideoFavorite)
  // console.log('dataGetVideo:', dataGetVideo)
  // console.log('dataGetPlayList:', dataGetPlayList)
  // console.log('dataGetAll:', dataGetAll)
  // console.log('data:', data)

  const handleTheaterMode = (theaterMode: any) => {
    setIsTheaterMode(theaterMode)
  }

  useEffect(() => {
    if (playList) {
      setVideo(dataGetPlayList?.data.data.videos as VideoType[])
      return
    }
    if (favorite) {
      setVideo(dataGetVideoFavorite?.data.data.map((item) => item.video) as VideoType[])
      return
    }
    if (category === '1') {
      setVideo(dataGetAll?.data.data as VideoType[])
      return
    }
    if (category !== '1') {
      setVideo(dataGetVideo?.data.data.videos as VideoType[])
    }
  }, [playList, category, dataGetPlayList, dataGetAll, dataGetVideo, dataGetVideoFavorite, favorite])

  return (
    <>
      {isLoading && (
        <div className='container min-h-screen px-3 pb-5 lg:mt-2 lg:flex lg:items-start lg:gap-x-5 lg:px-24 '>
          <div className='flex flex-col bg-white px-0 dark:bg-[#0f0f0f] lg:mx-0  lg:w-full'>
            <Skeleton className='mt-2 max-w-full rounded lg:h-[75vh]' />
            <Skeleton className='mt-5 h-5 w-1/2 rounded' />
            <div className='mt-5 flex items-center justify-between'>
              <div className='flex items-center gap-x-5'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='flex flex-col gap-y-2'>
                  <Skeleton className='h-3 w-20 rounded' />
                  <Skeleton className='h-3 w-20 rounded' />
                </div>
                <Skeleton className='h-7 w-28 rounded-xl' />
              </div>
              <div className='flex items-center gap-x-5'>
                <Skeleton className='h-7 w-28 rounded-xl' />
                <Skeleton className='h-7 w-28 rounded-xl' />
                <Skeleton className='h-7 w-28 rounded-xl' />
              </div>
            </div>
            <div className='mt-5 flex items-center'>
              <Skeleton className='h-36 w-full rounded' />
            </div>
          </div>
          <div className='mt-2 flex flex-shrink-0 flex-col gap-y-4 bg-white dark:bg-[#0f0f0f] lg:w-[370px] xl:w-[410px]'>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div className='flex items-center gap-x-2' key={index}>
                  <Skeleton className='h-16 w-28 flex-shrink-0 rounded-lg object-cover md:h-20 md:w-32' />
                  <div className='flex h-16 w-full flex-col flex-wrap  justify-evenly text-black dark:text-white md:h-20'>
                    <Skeleton className='h-3 w-full rounded' />
                    <Skeleton className='h-3 w-1/2 rounded' />
                    <Skeleton className='h-3 w-1/2 rounded' />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {isSuccess && (
        <div
          className={`${
            isTheaterMode
              ? ' min-h-screen lg:mt-0 lg:flex-col lg:px-0'
              : ' container min-h-screen pb-5 lg:mt-2 lg:flex lg:items-start lg:gap-x-5 lg:px-24'
          } `}
        >
          <div
            className={`${
              !isTheaterMode && 'flex flex-col bg-white dark:bg-[#0f0f0f] lg:mx-0'
            } video-animation  px-0 lg:w-full`}
          >
            <Video handleTheaterMode={handleTheaterMode} urlVideo={data?.data.data.video.video} playList={video} />
            {!isTheaterMode && <VideoInformationAndComment data={data?.data.data as VideoItem} />}
          </div>

          <div className={`${isTheaterMode && 'flex justify-between bg-white dark:bg-[#0f0f0f] lg:gap-x-5 lg:px-24'}`}>
            {isTheaterMode && <VideoInformationAndComment data={data?.data.data as VideoItem} />}
            <CompactVideoItem
              isSuccessLoadVideo={isSuccess}
              dataGetAll={dataGetAll?.data.data as VideoType[]}
              dataGetPlayList={dataGetPlayList?.data.data as playList}
              dataGetVideo={dataGetVideo?.data.data.videos as VideoType[]}
              isSuccessGetVideo={isSuccessGetVideo}
              isSuccessGetPlayList={isSuccessGetPlayList}
              isLoadingGetVideo={isLoadingGetVideo}
              isLoadingGetPlayList={isLoadingGetPlayList}
              isLoadingGetAllVideo={isLoadingGetAll}
              isSuccessGetAllVideo={isSuccessGetAll}
              isLoadingGetFavorite={isLoadingGetVideoFavorite}
              isSuccessGetFavorite={isSuccessGetVideoFavorite}
              dataGetFavorite={dataGetVideoFavorite?.data.data.map((item) => item.video) as VideoType[]}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DetailPage
