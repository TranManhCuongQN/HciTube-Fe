import React from 'react'

const About = () => {
  return (
    <div className='my-5 flex w-full items-start justify-between gap-y-5 px-5 md:px-20 lg:px-40 max-lg:flex-col lg:max-w-[1150px]'>
      <div className='flex w-full flex-shrink-0 flex-col gap-y-5 lg:w-1/2'>
        <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>Mô tả</span>
        <div className='break-words text-xs text-black dark:text-white md:text-sm'>
          1 9 6 7 Coffee là một thành viên thuộc 1 9 6 7. 1 9 6 7 là đơn vị phát hành nhạc / phối khí / sản xuất dành
          cho tất cả nghệ sĩ indie / underground. Nếu bạn là một người có nhiều bản nhạc hay chưa được biết đến, hãy
          liên hệ ngay với chúng tôi qua email sau: Contact@1967ent.com. Chúng tôi sẽ tư vấn cũng như hỗ trợ bài nhạc
          của bạn đến với nhiều khán giả hơn !
        </div>
      </div>
      <div className='flex w-full flex-col gap-y-5 lg:w-1/3'>
        <span className='border-b border-b-gray-500 py-2 text-xs font-semibold text-black dark:text-white md:text-sm'>
          Thống kê
        </span>
        <span className='border-b border-b-gray-500 py-2 text-xs text-black dark:text-white md:text-sm'>
          Đã tham gia 28 thg 5, 2021
        </span>
        <span className='border-b border-b-gray-500 py-2 text-xs  text-black dark:text-white md:text-sm'>
          13.614.734 lượt xem
        </span>
      </div>
    </div>
  )
}

export default About
