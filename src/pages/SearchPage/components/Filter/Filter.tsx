import {BsCheck} from 'react-icons/bs'
import { RefObject, useEffect, useState, useRef, useCallback } from 'react'

const uploadDateItems = ['Một giờ qua','Hôm nay','Tuần này','Tháng này','Năm nay']
const typeItems = ['Video','Kênh','Danh sách phát','Phim']
const durationItems = ['Dưới 4 phút','4 - 20 phút','Trên 20 phút']
const orderItems = ['Mức độ liên quan','Ngày tải lên','Lượt xem','Xếp hạng']


const Filter = () => {
  const uploadDateFilterRef = useRef<HTMLDivElement>(null);
  const typeFilterRef = useRef<HTMLDivElement>(null);
  const durationFilterRef = useRef<HTMLDivElement>(null);
  const orderFilterRef = useRef<HTMLDivElement>(null);

  const [updateFilterIndex, setUpdateFilterIndex] = useState<number>(() => {
    localStorage.setItem("update", "-1");
    return -1;
  })

  const [typeFilterIndex, setTypeFilterIndex] = useState<number>(() => {
    localStorage.setItem("type", "-1");
    return -1;
  })
  const [durationFilterIndex, setDurationFilterIndex] = useState<number>(() => {
    localStorage.setItem("duration", "-1");
    return -1;
  })
  const [orderFilterIndex, setOrderFilterIndex] = useState<number>(() => {
    localStorage.setItem("order", "-1");
    return -1;
  })



  const handleClickFilterNode = useCallback((filterType:string, clickedFilterIndex:number) => {
    switch(filterType) {
      case "update": 
        const previousUpdateIndex = localStorage.getItem("update");
        if(Number(previousUpdateIndex) != clickedFilterIndex) {
          localStorage.setItem("update", String(clickedFilterIndex));
          setUpdateFilterIndex(clickedFilterIndex)
        } 
        else {
          localStorage.setItem("update", String(-1));
          setUpdateFilterIndex(-1)
        }
       break;
      case "type": 
        const previousTypeIndex = localStorage.getItem("type");
        if(Number(previousTypeIndex) != clickedFilterIndex) {
          localStorage.setItem("type", String(clickedFilterIndex));
          setTypeFilterIndex(clickedFilterIndex)
        } 
        else {
          localStorage.setItem("type", String(-1));
          setTypeFilterIndex(-1)
        }
        break;
      case "duration": 
        const previousDurationIndex = localStorage.getItem("duration");
        if(Number(previousDurationIndex) != clickedFilterIndex) {
          localStorage.setItem("duration", String(clickedFilterIndex));
          setDurationFilterIndex(clickedFilterIndex)
        } 
        else {
          localStorage.setItem("duration", String(-1));
          setDurationFilterIndex(-1)
        }
        break;        
      case "order": 
        const previousOrderIndex = localStorage.getItem("order");
        if(Number(previousOrderIndex) != clickedFilterIndex) {
          localStorage.setItem("order", String(clickedFilterIndex));
          setOrderFilterIndex(clickedFilterIndex)
        } 
        else {
          localStorage.setItem("order", String(-1));
          setOrderFilterIndex(-1)
        }
        break;
      default:
        break;
      }
  }, []) 

  return (
    <>
      <div ref={uploadDateFilterRef} className="flex flex-col col-span-1 mb-8 pr-8 text-[#606060] dark:text-[#aaa]" id="UploadDate">
        <h1 className="text-xs font-bold uppercase text-[#0f0f0f] dark:text-[#f1f1f1] py-4 my-1 border-b border-b-[rgba(0,0,0,0.1)] dark:border-b-gray-600">Ngày tải lên</h1>
        {
          uploadDateItems.map((item, index) => {
            return (
              <button 
                key={index} 
                className={`${(updateFilterIndex == index) ? "filter--active " : "" } ${updateFilterIndex} flex max-md:justify-between pt-4 cursor-pointer text-sm font-semibold`}
                onClick={() => handleClickFilterNode("update", index)}
              >
              
                <span>{item}</span>
                <BsCheck className="filter__check text-xl md:ml-4 transition-all duration-200"/>
              </button>
            )
          })
        }
      </div>

      <div ref={typeFilterRef} className="flex flex-col col-span-1 mb-8 pr-8 text-[#606060] dark:text-[#aaa]" id="Type">
        <h1 className="text-xs font-bold uppercase text-[#0f0f0f] dark:text-[#f1f1f1] py-4 my-1 border-b border-b-[rgba(0,0,0,0.1)] dark:border-b-gray-600">Loại</h1>
        {
          typeItems.map((item, index) => {
            return (
              <button 
                key={index} 
                className={`${typeFilterIndex == index && "filter--active" } flex max-md:justify-between pt-4 cursor-pointer text-sm font-semibold `}
                onClick={() => handleClickFilterNode("type", index)}
              >
                <span>{item}</span>
                <BsCheck className="filter__check text-xl md:ml-4 transition-all duration-200"/>
              </button>
            )
          })
        }


      </div>

      <div ref={durationFilterRef} className="flex flex-col col-span-1 mb-8 pr-8 text-[#606060] dark:text-[#aaa]" id="Duration">
        <h1 className="text-xs font-bold uppercase text-[#0f0f0f] dark:text-[#f1f1f1] py-4 my-1 border-b border-b-[rgba(0,0,0,0.1)] dark:border-b-gray-600">Thời lượng</h1>
        {
        durationItems.map((item, index) => {
          return (
            <button 
              key={index} 
              className={`${durationFilterIndex == index && "filter--active" } flex max-md:justify-between pt-4 cursor-pointer text-sm font-semibold `}
              onClick={() => handleClickFilterNode("duration", index)}
            >
              <span>{item}</span>
              <BsCheck className="filter__check text-xl md:ml-4 transition-all duration-200"/>
            </button>
          )
        })
      }
      </div>

      <div ref={orderFilterRef} className="flex flex-col col-span-1 mb-8 pr-8 text-[#606060] dark:text-[#aaa]" id="Order">
        <h1 className="text-xs font-bold uppercase text-[#0f0f0f] dark:text-[#f1f1f1] py-4 my-1 border-b border-b-[rgba(0,0,0,0.1)] dark:border-b-gray-600">Sắp xếp theo</h1>
        {
        orderItems.map((item, index) => {
          return (
            <button 
              key={index} 
              className={`${orderFilterIndex == index && "filter--active" } flex max-md:justify-between pt-4 cursor-pointer text-sm font-semibold `}
              onClick={() => handleClickFilterNode("order", index)}
            >
              <span>{item}</span>
              <BsCheck className="filter__check text-xl md:ml-4 transition-all duration-200"/>
            </button>
          )
        })
      }

      </div>
    </>
  )
}

export default Filter;