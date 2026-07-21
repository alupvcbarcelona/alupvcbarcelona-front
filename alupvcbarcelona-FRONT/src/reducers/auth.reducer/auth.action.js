import { makeFetch } from '../../services/fetch'

export const fetchAuth = async (url, formFields, method, dispatchLoad) => {
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await makeFetch({ url, formFields, method })
    return { response, data }
  } catch (error) {
    console.log(error)
  } finally {
    dispatchLoad({ type: 'LOAD_FALSE' })
  }
}
