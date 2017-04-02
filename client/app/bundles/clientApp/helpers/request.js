function status (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    const error = new Error(response.statusText)
    error.response = response
    return Promise.reject(error)
  }
}

function json (response) {
  return response.json()
}

export function request (url = '', options = {}) {
  return fetch(url, options)
    .then(status)
    .then(json)
}
