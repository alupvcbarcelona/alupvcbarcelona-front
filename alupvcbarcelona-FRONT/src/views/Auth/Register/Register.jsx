import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReducerContext, StateContext } from '../../../context/createContext'
import { fetchAuth } from '../../../reducers/auth.reducer/auth.action'
import { fieldsRegister } from '../utils/fieldsForms'
const Auth = React.lazy(() => import('../../../components/Auth/Auth'))

const Register = () => {
  const navigate = useNavigate()
  const { urlApi, showToast, updateAuthToken } = useContext(StateContext)
  const {
    load: { load },
    dispatchLoad,
    dispatchAuth
  } = useContext(ReducerContext)

  const handleSubmitForm = async (formFields) => {
    const { response, data } = await fetchAuth(
      urlApi.URL_REGISTER,
      formFields,
      'POST',
      dispatchLoad
    )
    if (response.status !== 201) {
      showToast('error', data.message)
      return
    }
    showToast('success', `Usuario registrado.`)
    const { response: res, data: value } = await fetchAuth(
      urlApi.URL_LOGIN,
      formFields,
      'POST',
      dispatchLoad
    )
    if (res.status !== 200) {
      showToast('error', value.message)
      return
    }
    dispatchAuth({ type: 'SET_USER', payload: value.user })
    showToast('success', `Bienvenido ${value.user.name}`)
    updateAuthToken(true, value.token)
    setTimeout(() => {
      navigate('../perfil')
    }, 1500)
  }

  return (
    <>
      <Auth array={fieldsRegister} action={handleSubmitForm} load={load} />
    </>
  )
}

export default Register
