import { useEffect } from 'react'
export const useOuterClick = (el: HTMLElement | (HTMLElement | null)[] | null | undefined, callback: () => void) => {
  const handleWindowCLick = (event: MouseEvent) => {
    if (Array.isArray(el)) {
      const isInner = el.some((item) => item?.contains(event.target as Node))
      if (!isInner) {
        callback()
      }
    } else if (el instanceof HTMLElement) {
      if (!el.contains(event.target as HTMLElement)) {
        callback()
      }
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleWindowCLick)
    return () => {
      window.removeEventListener('click', handleWindowCLick)
    }
  }, [el, callback])
}
