import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ReducerContext, StateContext } from '../../context/createContext'
import { makeFetch } from '../../services/fetch'
import { sold_user_content } from './utils/content'
import './userPack.css'
const Loader = React.lazy(() => import('../../components/Loader/Loader'))
const Content = React.lazy(() => import('../../components/Content/Content'))
const CardPack = React.lazy(() => import('../../components/Card/Pack/CardPack'))

const UserPacks = () => {
  const [content, setContent] = useState(null)
  const location = useLocation()
  const {
    load: { load },
    dispatchLoad,
    dispatchPack,
    packs: { user_sold_packs }
  } = useContext(ReducerContext)

  const {
    isAuth: { existToken },
    urlApi: { URL_GET_MY_SOLD_PACKS },
    idUser,
    showToast
  } = useContext(StateContext)

  useEffect(() => {
    const getPacks = async () => {
      const idUser = location.pathname.split('/')[3]
      try {
        dispatchLoad({ type: 'LOAD_TRUE' })
        const { response, data } = await makeFetch({
          url: `${URL_GET_MY_SOLD_PACKS}/${idUser}`,
          token: existToken
        })
        if (response.status !== 200) {
          showToast('error', data.message)
          return
        }
        setContent(sold_user_content({ user: data.user, packs: data.packs }))
        dispatchPack({ type: 'SET_USER_SOLD_PACKS', payload: data })
      } catch (error) {
        showToast('error', 'Hubo un problema en la solicitud')
        return
      } finally {
        dispatchLoad({ type: 'LOAD_FALSE' })
      }
    }
    getPacks()
  }, [location.pathname])

  return (
    <section className='user__content'>
      {load ? (
        <div className='user__content-loader'>
          <Loader />
        </div>
      ) : (
        <div className='fadeIn'>
          <Content element={content} />
          <hr />
          <div className='user__content-title'>
            <h2>Packs adquiridos</h2>
          </div>
          <div className='user__container-card'>
            {user_sold_packs?.packs?.map((item) => (
              <CardPack
                key={item.idPack._id}
                pack={item.idPack}
                usePack={item}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default UserPacks
