import Img404 from 'src/assets/404.svg'

const NotFoundPage = () => {
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0">
      <div className="w-full h-full flex flex-col gap-y-4 justify-center items-center">
        <img src={Img404} alt='404' className='w-auto h-[40%] ' />
          <span className='text-lg font-semibold text-black dark:text-white md:text-xl'>Kết nối Internet</span>
          <span className='text-sm text-black dark:text-white md:text-base'>
            Không thể kết nối internet. Vui lòng kiểm tra mạng
          </span>
      </div>
    </div>
  )
}

export default NotFoundPage;