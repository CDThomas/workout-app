import { request } from './request'
import { API_URL, API_HEADERS } from 'clientApp/config/constants'

function login (email, password) {
  const options = {
    method: 'POST',
    headers: API_HEADERS,
    body: JSON.stringify({ auth: { email, password } })
  }

  return request(`${API_URL}/user_token`, options)
}

function finishAuth (token) {
  localStorage.setItem('token', token)
}

function getToken () {
  return localStorage.getItem('token')
}

export default {
  login,
  finishAuth,
  getToken
}
