import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  ReducerContext,
  ScrollContext,
  StateContext
} from '../../context/createContext'
import { getFetch } from '../../reducers/packs.reducer/pack.action'
import { packs_content } from './utils/content'
import './Packs.css'
import Card from '../../components/Card/Partner/Card'
import Img from '../../components/Img/Img'
import prev from '/prev.svg'
import useWidth from '../../hooks/useWidth'
const CardPack = React.lazy(() => import('../../components/Card/Pack/CardPack'))
const Content = React.lazy(() => import('../../components/Content/Content'))

const Packs = () => {
  const [packs, setPacks] = useState({
    packsView: false,
    packs: []
  })
  const {
    auth: { user },
    dispatchLoad,
    packs: { my_partner_pack },
    dispatchPack
  } = useContext(ReducerContext)
  const {
    urlApi: { URL_GET_MY_PACKS },
    isAuth: { existToken },
    showToast
  } = useContext(StateContext)
  const { useScroll, refPack, refPacks } = useContext(ScrollContext)

  const width = useWidth()
  let height = 0
  useEffect(() => {
    if (width > 200 && width < 290) height = 450
    else if (width > 291 && width < 419) height = 450
    else if (width > 420 && width < 508) height = 400
    else if (width > 509) height = 400
    setTimeout(() => {
      if (refPack?.current) {
        useScroll(refPack, height)
      }
    }, 500)
  }, [packs.packsView])

  const getMyPacks = async () => {
    const { response, data } = await getFetch({
      url: URL_GET_MY_PACKS,
      token: existToken,
      dispatchLoad: dispatchLoad
    })
    if (response.status !== 200) {
      showToast('error', 'Hubo un problema en la consulta.')
      return
    }
    dispatchPack({ type: 'SET_PARTNER_PACKS', payload: data.packs })
  }

  useEffect(() => {
    if (my_partner_pack.length <= 0) {
      getMyPacks()
    }
  }, [user, my_partner_pack])

  const handleNavigateMyPacks = (packs) => {
    setPacks((prev) => ({
      ...prev,
      packsView: !prev.packsView,
      packs: packs
    }))
  }

  const handlePrev = () => {
    setPacks((prev) => ({
      ...prev,
      packsView: !prev.packsView,
      packs: []
    }))
    setTimeout(() => {
      useScroll(refPacks)
    }, 500)
  }

  return (
    <div ref={refPacks} className='packs__container fadeIn'>
      <React.Suspense fallback={<p>Loading...</p>}>
        <Content element={packs_content} />
      </React.Suspense>
      <div className='packs__container-partner-packs'>
        <div className='packs__container-packs'>
          {!packs?.packsView ? (
            <div>
              <h3>Establecimientos</h3>
              {my_partner_pack?.length > 0 ? (
                <div className='packs__content-cards'>
                  {my_partner_pack?.map((item) => (
                    <Card
                      key={item.partner._id}
                      array={item.partner}
                      option={true}
                      action={() => handleNavigateMyPacks(item.packs)}
                    />
                  ))}
                </div>
              ) : (
                <p>No tienes packs disponibles.</p>
              )}
            </div>
          ) : (
            <div ref={refPack}>
              <h3>Establecimiento:</h3>
              <Card
                key={packs.packs[0].idPartner._id}
                array={packs.packs[0].idPartner}
                option={false}
              />
              {packs?.packsView && (
                <div className='packs__container-card'>
                  <h3>Mis Packs disponibles</h3>
                  <div className='packs__container-cards fadeIn'>
                    <React.Suspense fallback={<p>Loading packs...</p>}>
                      {packs?.packs?.map((item) => (
                        <CardPack
                          key={item._id}
                          pack={item.idPack}
                          usePack={item}
                        />
                      ))}
                    </React.Suspense>
                  </div>
                </div>
              )}
            </div>
          )}
          <div
            className={`float-btn ${!packs?.packsView ? 'float-btn--off' : ''}`}
          >
            <Img
              icon={prev}
              w='60px'
              alt='Volver atras'
              title='Volver atras'
              action={handlePrev}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Packs
