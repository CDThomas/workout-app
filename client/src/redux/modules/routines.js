// start with no client-side cache for simplicity

const ADD_ROUTINE = 'ADD_ROUTINE'
const ADD_MULTIPLE_ROUTINES = 'ADD_MULTIPLE_ROUTINES'
const DELETE_ROUTINE = 'DELETE_ROUTINE'

export function addRoutine (routine) {
  return {
    type: ADD_ROUTINE,
    routine
  }
}

export function addMultipleRoutines (routines) {
  return {
    type: ADD_MULTIPLE_ROUTINES,
    routines
  }
}

export function deleteRoutine (routineId) {
  return {
    type: DELETE_ROUTINE,
    routineId
  }
}

export default function routines (state = {}, action) {
  switch (action.type) {
    case ADD_ROUTINE:
      return {
        [action.routine.id]: action.routine
      }
    case ADD_MULTIPLE_ROUTINES:
      const routinesById = action.routines.reduce((routines, routine) => {
        routines[routine.id] = routine
        return routines
      }, {})

      return {
        ...routinesById
      }
    default:
      return state
  }
}
