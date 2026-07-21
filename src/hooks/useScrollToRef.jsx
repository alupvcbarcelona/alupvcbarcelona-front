import { useCallback } from 'react'

const useScrollToRef = () => {
  const scrollToRef = useCallback((ref, h=0) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop
        window.scrollTo({
          top: h,
          behavior: 'smooth',
        })
      }, 0)
     
    }
  }, [])

  return scrollToRef
}

export default useScrollToRef
