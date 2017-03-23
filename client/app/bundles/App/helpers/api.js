import { API_URL } from 'App/config/constants'
// TODO: ugh, fetch might not be what I want rn. Unless I build a utility on top of it to
//       handle errors (non 200 status codes), headers, and stringifying data automatically

export function getExercises (query) {
  const queryParams = query !== undefined
    ? `?query=${query}`
    : ''

  return fetch(`${API_URL}/exercises${queryParams}`)
    .then(res => res.json())
    .then(exercises => exercises)
}

export function createExercise ({ name, mainMuscleWorkedId }) {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ exercise: { name, mainMuscleWorkedId } })
  }

  return fetch(`${API_URL}/exercises`, options)
    .then(res => res.json())
    .then(exercise => exercise)
}

// GET 💪🏼
export function getMuscles () {
  return fetch(`${API_URL}/muscles`)
    .then(res => res.json())
    .then(muscles => muscles)
}
