import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReducerContext, StateContext } from '../../context/createContext'
import { makeFetch } from '../../services/fetch'
import { sold_pack_content } from './utils/content'
import './SoldPack.css'
const Content = React.lazy(() => import('../../components/Content/Content'))
const Card = React.lazy(() => import('../../components/Card/Partner/Card'))

const SoldPack = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    load: { load },
    dispatchLoad,
    dispatchPack,
    packs: { my_sold_packs }
  } = useContext(ReducerContext)

  const {
    isAuth: { existToken },
    urlApi: { URL_GET_MY_SOLD_PACKS },
    showToast
  } = useContext(StateContext)

  const content = sold_pack_content

  useEffect(() => {
    const getMySoldPack = async () => {
      try {
        dispatchLoad({ type: 'LOAD_TRUE' })
        const { response, data } = await makeFetch({
          url: `${URL_GET_MY_SOLD_PACKS}`,
          token: existToken
        })
        if (response.status !== 200) {
          showToast('error', data.message)
          return
        }
        dispatchPack({ type: 'SET_SOLD_PACKS', payload: data.packs })
      } catch (error) {
      } finally {
        dispatchLoad({ type: 'LOAD_FALSE' })
      }
    }

    getMySoldPack()
  }, [])

  const handleNavigateToPacks = async (user) => {
    const formatUrl = user.name.replace(/\s+/g, '-').toLowerCase()
    navigate(`${location.pathname}/${formatUrl}/${user._id}`)
  }

  return (
    <div className='sold__content fadeIn'>
      <div>
        <Content element={content} />
      </div>
      <div>
        {my_sold_packs?.length > 0 ? (
          <div className='sold__container-cards fadeIn'>
            {my_sold_packs?.map((item, index) => (
              <Card
                key={index}
                array={item}
                option={true}
                action={() => handleNavigateToPacks(item)}
              />
            ))}
          </div>
        ) : (
          'No dispones de packs vendidos.'
        )}
      </div>
    </div>
  )
}

export default SoldPack
