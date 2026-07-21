import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReducerContext, StateContext } from '../../../context/createContext'
import { fetchAuth } from '../../../reducers/auth.reducer/auth.action'
import { fieldsVerifyCode } from '../utils/fieldsForms'
const Auth = React.lazy(() => import('../../../components/Auth/Auth'))

const VerifyToken = () => {
  const navigate = useNavigate()
  const { setContent, urlApi, showToast } = useContext(StateContext)
  const {
    load: { load },
    dispatchLoad
  } = useContext(ReducerContext)

  const handleSubmitForm = async (formFields) => {
    const { response, data } = await fetchAuth(
      urlApi.URL_VERIFY_TOKEN,
      formFields,
      'POST',
      dispatchLoad
    )
    if (response.status !== 200) {
      showToast('error', data.message)
      return
    }
    if (!data.status) {
      showToast(
        'error',
        'El codigo no es correcto, por favor compruebe nuevamente.'
      )
      return
    } else {
      setContent((prev) => ({
        ...prev,
        forgot: {
          ...prev.forgot,
          verifyToken: formFields.verificationCode
        }
      }))
      showToast('success', 'Muy bien, ya falta poco.')
      setTimeout(() => {
        navigate('/nueva-contraseña')
      }, 1500)
    }
  }

  return (
    <>
      <Auth array={fieldsVerifyCode} action={handleSubmitForm} load={load} />
    </>
  )
}

export default VerifyToken
