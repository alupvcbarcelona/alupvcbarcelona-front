import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ReducerContext, StateContext } from '../../context/createContext'
import { getFetch } from '../../reducers/partner.reducer/partner.action'
import { pack_content } from './utils/content'
import './Pack.css'
const Loader = React.lazy(() => import('../../components/Loader/Loader'))
const Content = React.lazy(() => import('../../components/Content/Content'))
const CardPack = React.lazy(() => import('../../components/Card/Pack/CardPack'))
const NotFound = React.lazy(() => import('../404/NotFound'))

const Pack = () => {
  const [exisPartner, setExistPartner] = useState(true)
  const location = useLocation()
  const idPartner = location.pathname.split('/')[3]
  const { urlApi, content, setContent } = useContext(StateContext)
  const {
    load: { load },
    dispatchLoad,
    dispatchPartner,
    partner: { packs }
  } = useContext(ReducerContext)

  const getPartner = async () => {
    const url = `${urlApi.URL_PACK}/${idPartner}`
    const { response, data } = await getFetch(url, dispatchLoad)
    if (response.status !== 200) {
      setExistPartner(false)
      return
    }
    if (data.packs.length <= 0) {
      setExistPartner(false)
      return
    }
    dispatchPartner({ type: 'SET_PACKS', payload: data.packs })
    dispatchPartner({ type: 'SET_PARTNER', payload: data.partner })
    const generatedContent = pack_content(data.partner, data.packs)
    setContent((prev) => ({
      ...prev,
      pack: generatedContent
    }))
  }
  useEffect(() => {
    getPartner()
  }, [])

  return (
    <>
      {load ? (
        <div className='loader__position'>
          <Loader />
        </div>
      ) : exisPartner ? (
        <div className='pack__container fadeIn'>
          <div>
            <Content element={content.pack} />
          </div>
          <hr />
          <div className='pack__content-title'>
            <h2>Packs disponibles para la clientela:</h2>
          </div>
          <div className='pack__container-card'>
            {packs?.map((item, index) => (
              <CardPack key={index} pack={item} />
            ))}
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default Pack
