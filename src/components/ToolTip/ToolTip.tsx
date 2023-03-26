import classNames from 'classnames'
import React from 'react'

interface ToolTipProps {
  position: 'top' | 'bottom' | 'left' | 'right'
  content: string
  children: React.ReactNode
  classNameContent?: string
  classNameArrow?: string
}

const ToolTip = (props: ToolTipProps) => {
  const { position, content, children, classNameContent, classNameArrow } = props
  return (
    <div id='tooltip' className='group relative cursor-pointer'>
      <div className='mx-2 my-1'>{children}</div>
      <span
        className={classNames(
          `absolute hidden whitespace-nowrap rounded bg-neutral-900 p-2 text-xs text-white group-hover:inline-block ${classNameContent}`,
          position === 'top' ? 'left-1/2 bottom-[calc(100%+5px)] -translate-x-1/2' : '',
          position === 'bottom' ? 'left-1/2 top-[calc(100%+5px)] -translate-x-1/2' : '',
          position === 'left' ? 'top-1/2 right-[calc(100%+5px)] -translate-y-1/2' : '',
          position === 'right' ? 'top-1/2 left-[calc(100%+5px)] -translate-y-1/2' : ''
        )}
      >
        {content}
      </span>
      <span
        className={classNames(
          'absolute hidden border-[6px] group-hover:inline-block',
          position === 'top'
            ? `left-1/2 bottom-full -translate-x-1/2 border-b-0 border-l-transparent border-r-transparent border-t-neutral-900 ${classNameArrow}`
            : '',
          position === 'bottom'
            ? `left-1/2 top-full -translate-x-1/2 border-t-0 border-l-transparent border-r-transparent border-b-neutral-900 ${classNameArrow} `
            : '',
          position === 'left'
            ? `top-1/2 right-full -translate-y-1/2 border-r-0 border-t-transparent border-b-transparent border-l-neutral-900 ${classNameArrow}`
            : '',
          position === 'right'
            ? `top-1/2 left-full -translate-y-1/2 border-l-0 border-t-transparent border-b-transparent border-r-neutral-900 ${classNameArrow}`
            : ''
        )}
      ></span>
    </div>
  )
}

export default ToolTip
