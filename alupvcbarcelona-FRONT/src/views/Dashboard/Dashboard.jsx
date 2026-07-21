import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReducerContext, StateContext } from '../../context/createContext'
import { getFetch } from '../../reducers/packs.reducer/pack.action'
import './Dashboard.css'
import email from '/mail.svg'
import whatsapp from '/whatsapp.svg'
import Loader from '../../components/Loader/Loader'
import { makeFetch } from '../../services/fetch'
const Button = React.lazy(() => import('../../components/Button/Button'))
const CardPack = React.lazy(() => import('../../components/Card/Pack/CardPack'))
const Img = React.lazy(() => import('../../components/Img/Img'))

const Dashboard = () => {
  const navigate = useNavigate()
  const {
    auth: { user },
    packs: { my_packs },
    dispatchPack,
    load: { load },
    dispatchLoad,
    dispatchAuth
  } = useContext(ReducerContext)
  const {
    urlApi: { URL_PACKS_BUSSINESS, URL_CHANGE_MY_ROLE },
    isAuth: { existToken },
    showToast,
    updateAuthToken
  } = useContext(StateContext)

  useEffect(() => {
    const getMyPacks = async () => {
      try {
        const { response, data } = await getFetch({
          url: URL_PACKS_BUSSINESS,
          token: existToken,
          dispatchLoad
        })
        dispatchPack({ type: 'SET_PACKS', payload: data.packs })
      } catch (error) {
        showToast('error', 'Algo ha salido mal.')
        updateAuthToken(false)
        return
      }
    }
    if (my_packs?.length <= 0 && user.roles === 'partner') {
      getMyPacks()
    } else return
  }, [user])

  const handleNavigateToBussiness = () => {
    navigate('/negocio')
  }

  const handleChangeRole = async () => {
    try {
      dispatchLoad({ type: 'LOAD_TRUE' })
      const { response, data } = await makeFetch({
        url: `${URL_CHANGE_MY_ROLE}`,
        method: 'POST',
        token: existToken
      })
      if (response.status !== 200) {
        showToast('error', data.message)
        return
      }
      dispatchAuth({ type: 'SET_USER', payload: data.user })
    } catch (error) {
    } finally {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }
  }

  return (
    <>
      {load ? (
        <div className='loader__position'>
          <Loader />
        </div>
      ) : (
        <div className='dashboard__container fadeIn'>
          <div className='dashboard__content'>
            <div className='dashboard__content-user'>
              <div className='dashboard__content-info'>
                <Img
                  icon={user.avatar}
                  w='40px'
                  alt={`usuario ${user.name}`}
                  title={`usuario ${user.name}`}
                />
                <h1>{user.name}</h1>
              </div>
              <div className='dashboard__content-roles'>
                <div>
                  {user.roles === 'partner' && <span>{user.city}</span>}
                  <span>{user.roles}</span>
                </div>
                <Button
                  text={`Cambiar a ${
                    user.roles === 'user' ? 'negocio' : 'cliente'
                  }`}
                  p='5px 10px'
                  br='5px'
                  action={handleChangeRole}
                />
                <div className='dashboard-content-info-contact'>
                  <div>
                    <Img
                      icon={email}
                      w='25px'
                      p='3px'
                      alt='emal'
                      title='email'
                    />
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <Img
                      icon={whatsapp}
                      w='25px'
                      alt='whatsapp'
                      title='whatsaap'
                    />
                    <p>{user.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {user.roles === 'partner' && (
              <div className='dashboard__container-packs fadeIn'>
                <h2>Mis packs de negocio</h2>
                {my_packs?.length > 0 ? (
                  <div className='dashboard__container-cards'>
                    {my_packs?.map((item) => (
                      <CardPack key={item._id} pack={item} />
                    ))}
                  </div>
                ) : (
                  <div className='dashboard__content-not-found'>
                    <p>Aún no has creado tu primer pack.</p>
                    <Button
                      text='Crear mi primer pack'
                      p='5px 10px'
                      br='5px'
                      action={handleNavigateToBussiness}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
