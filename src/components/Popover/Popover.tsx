import { useState, useId, ElementType } from 'react'
import { FloatingPortal, useFloating, arrow, shift, offset, type Placement } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useRef } from 'react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
  handleClick?: () => void
}

const Popover = ({
  children,
  renderPopover,
  className,
  as: Element = 'button',
  initialOpen,
  placement,
  handleClick
}: Props) => {
  const [open, setOpen] = useState<boolean>(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)

  const { x, y, strategy, reference, floating, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })],
    placement: placement
  })

  const showPopover = () => {
    setOpen(true)
  }

  const hidePopover = () => {
    setOpen(false)
  }

  const id = useId()
  return (
    <div>
      <Element
        className={`${className}`}
        ref={reference}
        onMouseEnter={showPopover}
        onMouseLeave={hidePopover}
        onClick={handleClick}
      >
        {children}
        <FloatingPortal id={id}>
          <AnimatePresence>
            {open && (
              <motion.div
                ref={floating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: 'max-content',
                  transformOrigin: `${middlewareData.arrow?.x}px top`
                }}
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.2 }}
              >
                <span
                  ref={arrowRef}
                  className='absolute z-30 translate-y-[-95%] border-[11px]  border-x-transparent border-t-transparent border-b-white'
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y
                  }}
                ></span>
                {renderPopover}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </Element>
    </div>
  )
}

export default Popover
