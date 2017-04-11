import { request } from './request'
import auth from './authentication'
import { API_URL, API_HEADERS } from 'clientApp/config/constants'

function authenticatedRequest (endpoint, options = {}) {
  const url = API_URL + endpoint
  const headers = { ...API_HEADERS }

  if (auth.isAuthenticated()) {
    headers['Authorization'] = `Bearer ${auth.getToken()}`
  }

  return request(url, {
    headers,
    ...options
  })
}

export function getExercises (query) {
  const queryParams = query !== undefined
    ? `?query=${query}`
    : ''

  return authenticatedRequest(`/exercises${queryParams}`)
}

export function createExercise ({ name, mainMuscleWorkedId }) {
  const options = {
    method: 'POST',
    body: JSON.stringify({ exercise: { name, mainMuscleWorkedId } })
  }

  return authenticatedRequest('/exercises', options)
}

// GET 💪🏼
export function getMuscles () {
  return authenticatedRequest('/muscles')
}

export function getRoutines (query) {
  const queryParams = query !== undefined
    ? `?query=${query}`
    : ''

  return authenticatedRequest(`/routines${queryParams}`)
}

export function getRoutine (routineId) {
  return authenticatedRequest(`/routines/${routineId}`)
}

export function createRoutine () {
  return authenticatedRequest('/routines', { method: 'POST' })
}

export function updateRoutine (routine) {
  const options = {
    method: 'PUT',
    body: JSON.stringify({ routine })
  }

  return authenticatedRequest(`/routines/${routine.id}`, options)
}
