import React from 'react'
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai'
import useOnClickOutside from 'src/hook/useOnClickOutSide'

interface DropDownProps {
  children: React.ReactNode
  renderData: JSX.Element
  childRef: React.RefObject<HTMLDivElement>
}
const Dropdown = ({ children, renderData, childRef }: DropDownProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  useOnClickOutside(childRef, () => setIsOpen(false))

  return (
    <>
      <div className='relative flex w-[280px] flex-col items-center rounded-lg max-sm:w-2/3'>
        <div
          className='flex w-full items-center justify-between rounded-lg border border-[#d2d2d2] bg-[#ffffff] p-3 text-xs font-bold tracking-wider text-[#b8b8b8] duration-300 active:border-black dark:border-[#575757] dark:bg-[#282828] dark:text-[#878787] dark:active:border-white md:text-sm '
          onClick={() => setIsOpen(true)}
          role='presentation'
        >
          {children}
          {isOpen ? (
            <AiOutlineCaretUp className='h-4 w-4 text-black dark:text-[#aaaaaa]' />
          ) : (
            <AiOutlineCaretDown className='h-4 w-4 text-black dark:text-[#aaaaaa]' />
          )}
          {isOpen && renderData}
        </div>
      </div>
    </>
  )
}

export default Dropdown
