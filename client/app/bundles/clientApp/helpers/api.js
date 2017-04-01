import { request } from './request'
import { API_URL } from 'clientApp/config/constants'
// TODO: make a utility (prob just called request) that handles errors and res.json()
//       see: https://developers.google.com/web/updates/2015/03/introduction-to-fetch

const API_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export function getExercises (query) {
  const queryParams = query !== undefined
    ? `?query=${query}`
    : ''

  return request(`${API_URL}/exercises${queryParams}`)
}

export function createExercise ({ name, mainMuscleWorkedId }) {
  const options = {
    method: 'POST',
    headers: API_HEADERS,
    body: JSON.stringify({ exercise: { name, mainMuscleWorkedId } })
  }

  return request(`${API_URL}/exercises`, options)
}

// GET 💪🏼
export function getMuscles () {
  return request(`${API_URL}/muscles`)
}

export function createRoutine (routine) {
  const options = {
    method: 'POST',
    headers: API_HEADERS,
    body: JSON.stringify(routine)
  }

  return request(`${API_URL}/routines`, options)
}
