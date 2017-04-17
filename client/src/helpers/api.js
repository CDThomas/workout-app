import { request } from './request'
import auth from './authentication'
import { API_URL, API_HEADERS } from 'config/constants'

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
  return authenticatedRequest(`/exercises`, {
    params: { query }
  })
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
  return authenticatedRequest(`/routines`, {
    params: { query }
  })
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

export function deleteRoutine (routineId) {
  return authenticatedRequest(`/routines/${routineId}`, { method: 'DELETE' })
}
