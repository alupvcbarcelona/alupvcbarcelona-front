import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReducerContext, StateContext } from '../../../context/createContext'
import { fetchAuth } from '../../../reducers/auth.reducer/auth.action'
import { fieldsForgot } from '../utils/fieldsForms'
const Auth = React.lazy(() => import('../../../components/Auth/Auth'))

const Forgot = () => {
  const navigate = useNavigate()
  const { setContent, urlApi, showToast } = useContext(StateContext)
  const {
    load: { load },
    dispatchLoad
  } = useContext(ReducerContext)

  const handleSubmitForm = async (formFields) => {
    setContent((prev) => ({
      ...prev,
      forgot: {
        ...prev.forgot,
        email: formFields.email
      }
    }))
    const { response, data } = await fetchAuth(
      urlApi.URL_FORGOT,
      formFields,
      'POST',
      dispatchLoad
    )
    if (response.status !== 201) {
      showToast('error', data.message)
      return
    }
    showToast('success', data.message)
    setTimeout(() => {
      navigate('/verifica-codigo')
    }, 1500)
  }

  return (
    <>
      <Auth array={fieldsForgot} action={handleSubmitForm} load={load} />
    </>
  )
}

export default Forgot
