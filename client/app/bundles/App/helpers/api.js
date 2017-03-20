import { API_URL } from 'App/config/constants'

export function fetchExercises () {
  return fetch(`${API_URL}/exercises`)
    .then(res => res.json())
    .then(json => json)
}
