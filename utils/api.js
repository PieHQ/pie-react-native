import config from '../config/config'
const baseUrl = `${config.apiUrl}/api/v1/`

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${url}`)
    .then(response => response.json())
    .then(responseJson => { return responseJson })
    .catch(error => { console.log(error) })
  })
}

export const post = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${url}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
    .then(response => response.json())
    .then(responseJson => { return responseJson })
    .catch(error => { console.error(error) })
  })
}
