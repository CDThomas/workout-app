import { API_URL } from 'App/config/constants'

export function fetchExercises (query) {
  const queryParams = query !== undefined
    ? `?query=${query}`
    : ''

  return fetch(`${API_URL}/exercises${queryParams}`)
    .then(res => res.json())
    .then(json => json)
}
