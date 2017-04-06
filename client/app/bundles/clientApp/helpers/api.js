import { request } from './request'
import auth from './authentication'
import { API_URL, API_HEADERS } from 'clientApp/config/constants'

function headersWithAuth () {
  const token = auth.getToken()
  return {
    ...API_HEADERS,
    'Authorization': `Bearer ${token}`
  }
}

export function getExercises (query) {
  const queryParams = query !== undefined
    ? `?query=${query}`
    : ''

  return request(`${API_URL}/exercises${queryParams}`, { headers: headersWithAuth() })
}

export function createExercise ({ name, mainMuscleWorkedId }) {
  const options = {
    method: 'POST',
    headers: headersWithAuth(),
    body: JSON.stringify({ exercise: { name, mainMuscleWorkedId } })
  }

  return request(`${API_URL}/exercises`, options)
}

// GET 💪🏼
export function getMuscles () {
  return request(`${API_URL}/muscles`, { headers: headersWithAuth() })
}

export function createRoutine (routine) {
  const options = {
    method: 'POST',
    headers: headersWithAuth(),
    body: JSON.stringify(routine)
  }

  return request(`${API_URL}/routines`, options)
}
