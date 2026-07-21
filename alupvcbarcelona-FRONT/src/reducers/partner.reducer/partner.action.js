import { makeFetch } from '../../services/fetch'

export const getFetch = async (url, dispatchLoad) => {
  try {
    dispatchLoad({ type: 'LOAD_TRUE' })
    const { response, data } = await makeFetch({ url })
    return { response, data }
  } catch (error) {
    console.log(error.message)
  } finally {
      dispatchLoad({ type: 'LOAD_FALSE' })
  }
}
