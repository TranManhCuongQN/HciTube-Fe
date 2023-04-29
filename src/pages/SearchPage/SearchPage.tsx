import AsideBar from '../HomePage/components/AsideBar'
import VideoItem from './components/VideoItem/'
import Lauv from 'src/assets/Lauv.mp4'
import {GiSettingsKnobs} from 'react-icons/gi'
import {BsCheck} from 'react-icons/bs'
import { RefObject, useEffect, useMemo, useRef } from 'react'
import { Ref } from 'react-hook-form'

const uploadDateItems = ['Một giờ qua','Hôm nay','Tuần này','Tháng này','Năm nay']
const typeItems = ['Video','Kênh','Danh sách phát','Phim']
const durationItems = ['Dưới 4 phút','4 - 20 phút','Trên 20 phút']
const orderItems = ['Mức độ liên quan','Ngày tải lên','Lượt xem','Xếp hạng']


const SearchPage = () => {
  const filterRef = useRef<HTMLDivElement>(null);
  const uploadDateFilterRef = useRef<HTMLDivElement>(null);
  const typeFilterRef = useRef<HTMLDivElement>(null);
  const durationFilterRef = useRef<HTMLDivElement>(null);
  const orderFilterRef = useRef<HTMLDivElement>(null);


  const handleClickFilterBtn = () => {
    if(filterRef.current) {
      filterRef.current.classList.toggle('active-grid');

    }
  }

  const handleClickFilterNode = (ref :RefObject<HTMLDivElement>, clickedFilterIndex : number) => {
    if(ref.current) {
      ref.current.querySelectorAll('button').forEach((element, index) => {
        if(index !== clickedFilterIndex ) {
          element.classList.remove('filter--active')
        }
        else {

          ref.current?.children[clickedFilterIndex + 1].classList.add('filter--active');
        }
      })

    }

  }


  useEffect(() => {
    if(uploadDateFilterRef.current) {
      uploadDateFilterRef.current.querySelectorAll('button').forEach((node, clickedFilterIndex) => {
        node.addEventListener('click', () => handleClickFilterNode(uploadDateFilterRef , clickedFilterIndex))
      })
    }
      return () => {
        if(uploadDateFilterRef.current) {
          uploadDateFilterRef.current.querySelectorAll('button').forEach((node, clickedFilterIndex) => {
            node.removeEventListener('click', () => handleClickFilterNode(uploadDateFilterRef , clickedFilterIndex))
          })
        }
      }
  }, [])

  useEffect(() => {
    if(typeFilterRef.current) {
      typeFilterRef.current.querySelectorAll('button').forEach((node, clickedFilterIndex) => {
        node.addEventListener('click', () => handleClickFilterNode(typeFilterRef , clickedFilterIndex))
      })
    }
      return () => {
        if(typeFilterRef.current) {
          typeFilterRef.current.querySelectorAll('button').forEach((node, clickedFilterIndex) => {
            node.removeEventListener('click', () => handleClickFilterNode(typeFilterRef , clickedFilterIndex))
          })
        }
      }
  }, [])

  useEffect(() => {
    if(durationFilterRef.current) {
      durationFilterRef.current.querySelectorAll('button').forEach((node, clickedFilterIndex) => {
        node.addEventListener('click', () => handleClickFilterNode(durationFilterRef , clickedFilterIndex))
      })
    }
      return () => {
        if(durationFilterRef.current) {
          durationFilterRef.current.querySelectorAll('button').forEach((node, clickedFilterIndex) => {
            node.removeEventListener('click', () => handleClickFilterNode(durationFilterRef , clickedFilterIndex))
          })
        }
      }
  }, [])

  useEffect(() => {
    if(orderFilterRef.current) {
      orderFilterRef.current.querySelectorAll('button').forEach((node, clickedFilterIndex) => {
        node.addEventListener('click', () => handleClickFilterNode(orderFilterRef , clickedFilterIndex))
      })
    }
      return () => {
        if(orderFilterRef.current) {
          orderFilterRef.current.querySelectorAll('button').forEach((node, clickedFilterIndex) => {
            node.removeEventListener('click', () => handleClickFilterNode(orderFilterRef , clickedFilterIndex))
          })
        }
      }
  }, [])

  return (
    <div className='container flex gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
      <AsideBar />
      <div className='mb-16 flex min-h-screen w-full flex-col 2xl:pl-64'>
        <div className="flex flex-col justify-center w-full h-full md:px-3 lg:px-6 lg:py-4">
          <div className="lg:grid lg:grid-cols-3 w-full max-w-[1280px] h-full">
            <div className="flex flex-col lg:col-span-2">
              <div className="max-lg:ml-3 border-b border-[rgba(0, 0, 0, 0.1)] dark:border-gray-600 py-2">
                <button onClick={handleClickFilterBtn} className="flex items-center hover:bg-[#f2f2f2] px-4 py-2 rounded-full dark:hover:bg-[#272727]">
                  <GiSettingsKnobs className="text-black dark:text-white rotate-90 mr-2 w-5 h-5"/>
                  <span className="font-semibold text-black line-clamp-2 dark:text-white sm:text-sm md:font-bold lg:text-base">Bộ lọc</span>
                </button>
            
                <div ref={filterRef} className="hidden grid-cols-1 md:grid-cols-4 pl-4">
                  <div ref={uploadDateFilterRef} className="flex flex-col col-span-1 mb-8 pr-8 text-[#606060] dark:text-[#aaa]">
                    <h1 className="text-xs font-bold uppercase text-[#0f0f0f] dark:text-[#f1f1f1] py-4 my-1 border-b border-b-[rgba(0,0,0,0.1)] dark:border-b-gray-600">Ngày tải lên</h1>
                    {
                      uploadDateItems.map(item => {
                        return (
                          <button className="flex max-md:justify-between pt-4 cursor-pointer text-sm font-semibold ">
                            <span>{item}</span>
                            <BsCheck className="filter__check text-xl md:ml-4 transition-all duration-200"/>
                          </button>
                        )
                      })
                    }
                  </div>

                  <div ref={typeFilterRef} className="flex flex-col col-span-1 mb-8 pr-8 text-[#606060] dark:text-[#aaa]">
                    <h1 className="text-xs font-bold uppercase text-[#0f0f0f] dark:text-[#f1f1f1] py-4 my-1 border-b border-b-[rgba(0,0,0,0.1)] dark:border-b-gray-600">Loại</h1>
                    {
                      typeItems.map(item => {
                        return (
                          <button className="flex max-md:justify-between pt-4 cursor-pointer text-sm font-semibold ">
                            <span>{item}</span>
                            <BsCheck className="filter__check text-xl md:ml-4 transition-all duration-200"/>
                          </button>
                        )
                      })
                    }


                  </div>

                    <div ref={durationFilterRef} className="flex flex-col col-span-1 mb-8 pr-8 text-[#606060] dark:text-[#aaa]">
                      <h1 className="text-xs font-bold uppercase text-[#0f0f0f] dark:text-[#f1f1f1] py-4 my-1 border-b border-b-[rgba(0,0,0,0.1)] dark:border-b-gray-600">Thời lượng</h1>
                      {
                      durationItems.map(item => {
                        return (
                          <button className="flex max-md:justify-between pt-4 cursor-pointer text-sm font-semibold ">
                            <span>{item}</span>
                            <BsCheck className="filter__check text-xl md:ml-4 transition-all duration-200"/>
                          </button>
                        )
                      })
                    }
                    </div>

                    <div ref={orderFilterRef} className="flex flex-col col-span-1 mb-8 pr-8 text-[#606060] dark:text-[#aaa]">
                      <h1 className="text-xs font-bold uppercase text-[#0f0f0f] dark:text-[#f1f1f1] py-4 my-1 border-b border-b-[rgba(0,0,0,0.1)] dark:border-b-gray-600">Sắp xếp theo</h1>
                      {
                      orderItems.map(item => {
                        return (
                          <button className="flex max-md:justify-between pt-4 cursor-pointer text-sm font-semibold ">
                            <span>{item}</span>
                            <BsCheck className="filter__check text-xl md:ml-4 transition-all duration-200"/>
                          </button>
                        )
                      })
                    }

                    </div>

                </div>

              </div>

              <div className="w-full flex items-center border-b border-[rgba(0, 0, 0, 0.1)] dark:border-gray-600 py-4 cursor-pointer max-lg:px-3">
                  <div className="w-[120px] md:w-[200px] lg:w-[360px] flex lg:justify-center mr-3 ">
                    <img 
                      src="https://yt3.googleusercontent.com/9DTziUXmosxUCZUqErlwiIBfPOCcDSm6sU1scc7rkCWUJW7kvu6rTjOx5SiR3Ze4E2V0oE4OCg=s176-c-k-c0x00ffffff-no-rj-mo" alt="" 
                      className="w-24 h-24 md:w-[8.5rem] md:h-[8.5rem] rounded-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-row items-center md:flex-col md:items-start gap-y-3 justify-between lg:flex-row lg:items-center">
                    <div className="flex flex-col">
                      <span className="text-lg dark:text-[#f1f1f1] font-medium mb-2">Charlie Puth</span>
                      <span className="hidden md:block text-xs dark:text-[#aaa] font-normal">@charlieputh - 21,9 Tr người đăng ký</span>
                      <span className="md:hidden text-xs dark:text-[#aaa] font-normal">@charlieputh</span>
                      <span className="md:hidden text-xs dark:text-[#aaa] font-normal">21,9 Tr người đăng ký</span>

                    </div>
                    <button className=" font-bold text-sm px-4 py-2 h-fit rounded-full bg-black text-white hover:bg-[#4d4d4d] dark:hover:bg-[#E5E5E5]  dark:bg-white dark:text-black">Đăng ký</button>
                  </div>

              </div>

              <div>
                <VideoItem /> 

                <VideoItem />                    

                <VideoItem />                    

                <VideoItem />                    

                <VideoItem />                    
              </div>

            </div>  
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage;