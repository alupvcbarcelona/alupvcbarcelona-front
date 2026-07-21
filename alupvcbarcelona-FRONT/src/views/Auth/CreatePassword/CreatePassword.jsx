import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReducerContext, StateContext } from '../../../context/createContext'
import { fetchAuth } from '../../../reducers/auth.reducer/auth.action'
import { fieldsPassword } from '../utils/fieldsForms'
import NotFound from '../../404/NotFound'
const Auth = React.lazy(() => import('../../../components/Auth/Auth'))

const CreatePassword = () => {
  const navigate = useNavigate()
  const { content, urlApi, showToast, updateAuthToken } = useContext(StateContext)
  const {
    load: { load },
    dispatchLoad,
    dispatchAuth
  } = useContext(ReducerContext)

  const handleSubmitForm = async (form) => {
    let formFields = {
      token: content.forgot.verifyToken,
      password: form.password
    }

    const { response, data } = await fetchAuth(
      urlApi.URL_CREATE_PASSWORD,
      formFields,
      'PUT',
      dispatchLoad
    )

    if (response.status !== 201) {
      showToast('error', data.message)
      setTimeout(() => {
        navigate('../')
      }, 1500)
      return
    }

    showToast('success', `Password modificada.`)

    formFields = {
      email: content.forgot.email,
      password: form.password
    }
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
    updateAuthToken(true, value.token)
    dispatchAuth({ type: 'SET_USER', payload: value.user })
    showToast('success', `Bienvenido ${value.user.name}`)
    setTimeout(() => {
      navigate('../perfil')
    }, 1500)
  }

  if (!content.forgot.email || !content.forgot.verifyToken) {
    return <NotFound />
  }

  return (
    <>
      <Auth array={fieldsPassword} action={handleSubmitForm} load={load} />
    </>
  )
}

export default CreatePassword
