import {
  FETCH_ROUTINE_REQUEST,
  FETCH_ROUTINE_SUCCESS,
  FETCH_ROUTINE_ERROR,
  UPDATE_ROUTINE_REQUEST,
  UPDATE_ROUTINE_SUCCESS,
  UPDATE_ROUTINE_ERROR,
  DELETE_ROUTINE_REQUEST,
  DELETE_ROUTINE_SUCCESS,
  DELETE_ROUTINE_ERROR,
  DELETE_SET,
  CHANGE_ROUTINE_NAME
} from './actionTypes'
import {
  getRoutine,
  deleteRoutine as deleteRoutineHelper,
  updateRoutine as updateRoutineHelper
} from 'helpers/api'
import { omit } from 'lodash'

export function fetchRoutineRequest () {
  return {
    type: FETCH_ROUTINE_REQUEST
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
      })
      .catch(error => dispatch(fetchRoutineError(error)))
  }
}

function deleteRoutineRequest () {
  return {
    type: DELETE_ROUTINE_REQUEST
  }
}

function deleteRoutineSuccess (routineId) {
  return {
    type: DELETE_ROUTINE_SUCCESS,
    info: 'Routine successfully deleted',
    routineId
  }
}

function deleteRoutineError (error) {
  return {
    type: DELETE_ROUTINE_ERROR,
    error
  }
}

export function deleteRoutine (routineId) {
  return function (dispatch) {
    dispatch(deleteRoutineRequest())

    return deleteRoutineHelper(routineId)
      .then(() => dispatch(deleteRoutineSuccess(routineId)))
      .catch(error => dispatch(deleteRoutineError(error)))
  }
}

export function changeRoutineName (routineId, routineName) {
  return {
    type: CHANGE_ROUTINE_NAME,
    routineId,
    routineName
  }
}

function updateRoutineRequest () {
  return {
    type: UPDATE_ROUTINE_REQUEST
  }
}

function updateRoutineSuccess (routine) {
  return {
    type: UPDATE_ROUTINE_SUCCESS,
    info: 'Workout updated successfully',
    routine
  }
}

function updateRoutineError (errors) {
  return {
    type: UPDATE_ROUTINE_ERROR,
    errors
  }
}

export function updateRoutine (routine) {
  return function (dispatch) {
    dispatch(updateRoutineRequest())

    return updateRoutineHelper(routine).then(
      ({ routine }) => {
        dispatch(updateRoutineSuccess(routine))
      },
      error => {
        const response = error.response
        if (response && response.status === 422) {
          response.json().then(body => {
            dispatch(updateRoutineError(body.errors))
          })
        } else {
          console.error(error)
        }
      }
    )
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

const initialRoutineState = {
  id: null,
  name: '',
  setIds: []
}

function routineReducer (state = initialRoutineState, action) {
  switch (action.type) {
    case DELETE_SET:
      return {
        ...state,
        setIds: state.setIds.filter(setId => setId !== action.id)
      }
    case CHANGE_ROUTINE_NAME:
      return {
        ...state,
        name: action.routineName
      }
    default:
      return {
        ...state
      }
  }
}

const initialState = {
  isLoading: true,
  info: '',
  errors: []
}

export default function routines (state = initialState, action) {
  switch (action.type) {
    case FETCH_ROUTINE_REQUEST:
    case UPDATE_ROUTINE_REQUEST:
    case DELETE_ROUTINE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_ROUTINE_SUCCESS:
    case UPDATE_ROUTINE_SUCCESS:
      // This is where normalizr would come in handy
      const setIds = action.routine && action.routine.sets
        ? action.routine.sets.map(set => set.id)
        : []
      const routine = { ...action.routine, setIds }

      return {
        ...state,
        isLoading: false,
        info: action.info,
        errors: [],
        [action.routine.id]: routine
      }
    case FETCH_ROUTINE_ERROR:
    case UPDATE_ROUTINE_ERROR:
    case DELETE_ROUTINE_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: [...action.errors]
      }
    case DELETE_ROUTINE_SUCCESS:
      return {
        ...omit(state, action.routineId),
        isLoading: false,
        info: action.info,
        errors: []
      }
    case DELETE_SET:
    case CHANGE_ROUTINE_NAME:
      return {
        ...state,
        [action.routineId]: routineReducer(state[action.routineId], action)
      }
    default:
      return state
  }
}
