// start with no client-side cache for simplicity

// const ADD_ROUTINE = 'ADD_ROUTINE'
// const UPDATE_ROUTINE = 'UPDATE_ROUTINE'

const FETCH_ROUTINE_REQUEST = 'FETCH_ROUTINE_REQUEST'
const FETCH_ROUTINE_SUCCESS = 'FETCH_ROUTINE_SUCCESS'
const FETCH_ROUTINE_ERROR = 'FETCH_ROUTINE_ERROR'

const UPDATE_ROUTINE_REQUEST = 'UPDATE_ROUTINE_REQUEST'
const UPDATE_ROUTINE_SUCCESS = 'UPDATE_ROUTINE_SUCCESS'
const UPDATE_ROUTINE_ERROR = 'UPDATE_ROUTINE_ERROR'

const DELETE_ROUTINE_REQUEST = 'DELETE_ROUTINE_REQUEST'
const DELETE_ROUTINE_SUCCESS = 'DELETE_ROUTINE_SUCCESS'
const DELETE_ROUTINE_ERROR = 'DELETE_ROUTINE_ERROR'

// export function addRoutine (routine) {
//   return {
//     type: ADD_ROUTINE,
//     routine
//   }
// }

// export function updateRoutine (routine) {
//   return {
//     type: UPDATE_ROUTINE,
//     routine
//   }
// }

export function fetchRoutineRequest (routineId) {
  return {
    type: FETCH_ROUTINE_REQUEST,
    routineId: routineId
  }
}

export function fetchRoutineSuccess (routine) {
  return {
    type: FETCH_ROUTINE_SUCCESS,
    routine
  }
}

export function fetchRoutineError (error) {
  console.warn(error)
  return {
    type: FETCH_ROUTINE_ERROR,
    error: `Error fetching routine: ${error}`
  }
}

export function fetchRoutine (routineId) {
  // Make request
  // Success
  // Error
}

/*
  Individual routine state:
  {
    isLoading: true, // loading the individual routine
    error: '',
    isPersisted: false, // false if the user changes the routine and hasn't persisted,
    id: 1,
    name: '',
    setIds: []
  }
*/

const initialState = {
  isLoading: false, // Loading the list
  error: ''
}

export default function routines (state = initialState, action) {
  switch (action.type) {
    // case ADD_ROUTINE:
    // case UPDATE_ROUTINE:
    case FETCH_ROUTINE_SUCCESS:
      return {
        [action.routine.id]: action.routine
      }
    default:
      return state
  }
}
