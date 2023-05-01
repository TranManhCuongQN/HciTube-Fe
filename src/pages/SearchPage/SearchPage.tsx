import AsideBar from '../HomePage/components/AsideBar'
import VideoItem from './components/VideoItem/'
import Lauv from 'src/assets/Lauv.mp4'
import {GiSettingsKnobs} from 'react-icons/gi'
import {BsCheck} from 'react-icons/bs'
import { RefObject, useEffect, useState, useRef, useCallback } from 'react'
import { Ref } from 'react-hook-form'
import {GrClose} from 'react-icons/gr'
import Filter from './components/Filter'

const SearchPage = () => {
  const filterRef = useRef<HTMLDivElement>(null);


  const handleClickFilterBtn = () => {
    if(filterRef.current) {
      filterRef.current.classList.toggle('active-grid');

    }
  }

  return (
    <div className='container flex gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
      <AsideBar />
      <div className='mb-16 flex min-h-screen w-full flex-col 2xl:pl-64'>
        <div className="flex flex-col items-center justify-center w-full h-full md:px-3 lg:px-6 lg:py-4">
          <div className="lg:grid lg:grid-cols-1 w-full max-w-[1096px] h-full">
            <div className="flex flex-col lg:col-span-1">
              <div className="max-lg:ml-3 border-b border-[rgba(0, 0, 0, 0.1)] dark:border-gray-600 py-2">
                <button onClick={handleClickFilterBtn} className="flex items-center hover:bg-[#f2f2f2] px-4 py-2 rounded-full dark:hover:bg-[#272727]">
                  <GiSettingsKnobs className="text-black dark:text-white rotate-90 mr-2 w-5 h-5"/>
                  <span className="font-semibold text-black line-clamp-2 dark:text-white sm:text-sm md:font-bold lg:text-base">
                    Bộ lọc
                  </span>
                </button>
            
                <div ref={filterRef} className="hidden grid-cols-1 md:grid-cols-4 pl-4">
                  <Filter/>
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