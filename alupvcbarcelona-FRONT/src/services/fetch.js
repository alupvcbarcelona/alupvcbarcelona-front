export const makeFetch = async ({
  url,
  formFields = {},
  method = 'GET',
  token = null
}) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  const options = {
    method,
    headers
  }
  if (method !== 'GET') {
    options.body = JSON.stringify(formFields)
  }
  const response = await fetch(`${url}`, options)
  const data = await response.json()
  return { response, data }
}
