
import { BiPlay } from "react-icons/bi";
import {RxShuffle} from "react-icons/rx"

const ControlSection = () => {
  return (
    <div className="relative flex w-full lg:w-fit flex-col bg-transparent overflow-hidden lg:rounded-lg ">
      <div className="flex w-full justify-center flex-col md:flex-row lg:flex-col md:items-center lg:items-start p-3 lg:p-6  z-20">
        <img 
          className="aspect-video w-full h-fit md:max-w-[336px] lg:w-[312px] rounded-lg mb-4"
          src="https://i.ytimg.com/vi/JVzb3elJteM/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDCgZ_F_WCmYGUVVJl_xLP14GoZxw" 
          alt="" 
        />
        <div className="flex flex-col  mb-4 md:flex-1 md:ml-6 lg:ml-0 ">
            <h1 className="text-white text-3xl font-extrabold mb-4">Video đã thích</h1>
            <p className="text-white text-sm font-bold mb-1">hồng vũ khánh nguyễn</p>
            <span className="text-[#ffffffb3] text-xs font-bold ">{`${45} video - Riêng tư - Cập nhật hôm nay`}</span>
        </div>
      </div>

      <div className="flex gap-3 p-2 lg:p-6 z-20">
        <button className="flex items-center justify-center w-full text-base font-bold rounded-full text-black bg-white py-1 hover:bg-[#E6E6E6]">
          <BiPlay className="w-8 h-8"/>
          <span>Phát tất cả</span> 
        </button>
        <button className="flex items-center justify-center w-full text-base font-bold rounded-full text-white bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] py-1">
          <RxShuffle className="w-6 h-6 mr-2"/>
          <span>Trộn bài</span> 
        </button>
      </div>

      <div className="absolute w-full h-full ">
        <img
          className="w-[200%] translate-x-[-25%] opacity-70 blur-[30px] " 
          src="https://i.ytimg.com/vi/JVzb3elJteM/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDCgZ_F_WCmYGUVVJl_xLP14GoZxw" 
          alt="" 
        />
      </div>
      <div className="absolute w-full h-full bg-gradient-to-b  from-[rgba(76,89,65,0.800)] 0% via-[rgba(76,89,65,0.298)] 33.000001% to-[rgba(15,15,15,1.000)] 100%)"></div>
    </div>
  )
}

export default ControlSection;