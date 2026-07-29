import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReducerContext, StateContext } from '../../../context/createContext'
import { fetchAuth } from '../../../reducers/auth.reducer/auth.action'
import { fieldsLogin } from '../utils/fieldsForms'
const Auth = React.lazy(() => import('../../../components/Auth/Auth'))


const Login = () => {
  const navigate = useNavigate()
  const { urlApi, showToast, updateAuthToken } = useContext(StateContext)
  const {
    load: { load },
    dispatchLoad,
    auth,
    dispatchAuth
  } = useContext(ReducerContext)

  const handleSubmitForm = async (formFields) => {
    const { response, data } = await fetchAuth(
      urlApi.URL_LOGIN,
      formFields,
      'POST',
      dispatchLoad
    )
    if (response.status !== 200) {
      showToast('error', data.message)
      return
    }
    dispatchAuth({ type: 'SET_USER', payload: data.user })
    showToast('success', `Bienvenido ${data.user.name}`)
    updateAuthToken(true, data.user.token)
  }

  return (
    <>
      <Auth array={fieldsLogin} action={handleSubmitForm} load={load} />
    </>
  )
}

export default Login
