import { useReducer } from 'react'
import { ReducerContext } from '../createContext'
import {
  stateLoad,
  initStateLoad
} from '../../reducers/loader.reducer/loader.reducer'
import {
  statePartner,
  initStatePartner
} from '../../reducers/partner.reducer/partner.reducer'
import { initStateAuth, stateAuth } from '../../reducers/auth.reducer/auth.reducer'
import { initStatePack, statePacks } from '../../reducers/packs.reducer/pack.reducer'

export const ReducerProvider = ({ children }) => {
  const [load, dispatchLoad] = useReducer(stateLoad, initStateLoad)
  const [partner, dispatchPartner] = useReducer(statePartner, initStatePartner)
  const [auth, dispatchAuth] = useReducer(stateAuth, initStateAuth)
  const [packs, dispatchPack] = useReducer(statePacks, initStatePack)

  return (
    <ReducerContext.Provider value={{ load, dispatchLoad, partner, dispatchPartner, auth, dispatchAuth, packs, dispatchPack }}>
      {children}
    </ReducerContext.Provider>
  )
}
