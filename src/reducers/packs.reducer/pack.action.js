import { makeFetch } from '../../services/fetch'

export const getFetch = async ({url, token, dispatchLoad}) => {
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await makeFetch({ url, token })
    return { response, data }
  } catch (error) {
    console.log(error.message)
  } finally {
    dispatchLoad({ type: 'LOAD_FALSE' })
  }
}
