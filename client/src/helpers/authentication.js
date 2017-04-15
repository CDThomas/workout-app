import { request } from './request'
import { isTokenExpired } from './jwt'
import { API_URL, API_HEADERS } from 'config/constants'

function login (email, password) {
  const options = {
    method: 'POST',
    headers: API_HEADERS,
    body: JSON.stringify({ auth: { email, password } })
  }

  return request(`${API_URL}/user_token`, options)
}

function logout () {
  localStorage.removeItem('token')
}

function finishAuth (token) {
  localStorage.setItem('token', token)
}

function getToken () {
  return localStorage.getItem('token')
}

function isAuthenticated () {
  const token = getToken()

  if (token) {
    return !isTokenExpired(token)
  }
  return false
}

export default {
  login,
  logout,
  finishAuth,
  getToken,
  isAuthenticated
}
