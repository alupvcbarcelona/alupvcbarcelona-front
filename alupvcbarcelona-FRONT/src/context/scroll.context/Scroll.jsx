import { createContext, useRef } from 'react'
import { ScrollContext } from '../createContext'
import useScrollToRef from '../../hooks/useScrollToRef'

export const ScrollProvider = ({ children }) => {
  const useScroll = useScrollToRef()

  const refTop = useRef(null)
  const refForm = useRef(null)
  const refPack = useRef(null)
  const refPacks = useRef(null)

  return (
    <ScrollContext.Provider
      value={{ useScroll, refTop, refForm, refPack, refPacks }}
    >
      {children}
    </ScrollContext.Provider>
  )
}
