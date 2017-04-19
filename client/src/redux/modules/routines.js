import {
  FETCH_ROUTINE_REQUEST,
  FETCH_ROUTINE_SUCCESS,
  FETCH_ROUTINE_ERROR,
  UPDATE_ROUTINE_REQUEST,
  UPDATE_ROUTINE_SUCCESS,
  UPDATE_ROUTINE_ERROR,
  DELETE_ROUTINE_REQUEST,
  DELETE_ROUTINE_SUCCESS,
  DELETE_ROUTINE_ERROR
} from './actionTypes'
import { getRoutine } from 'helpers/api'
import { addMultipleSets } from './sets'

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
  return function (dispatch) {
    dispatch(fetchRoutineRequest())

    return getRoutine(routineId)
      .then(({ routine }) => {
        dispatch(fetchRoutineSuccess(routine))
        dispatch(addMultipleSets(routine.sets))
      })
      .catch(error => dispatch(fetchRoutineError(error)))
  }
}

/*
  Individual routine state:
  {
    isFetching: true, // loading the individual routine
    isUpdating: false,
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
    case FETCH_ROUTINE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_ROUTINE_SUCCESS:
      // This is where normalizr would come in handy
      const sets = action.routine && action.routine.sets
        ? action.routine.sets.map(set => set.id)
        : []
      const routine = { ...action.routine, sets }

      return {
        ...state,
        isLoading: false,
        [action.routine.id]: routine
      }
    case FETCH_ROUTINE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}
