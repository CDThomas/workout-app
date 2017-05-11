import { combineReducers } from 'redux'
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

// TODO: asdfasd verbose AF
// TODO: would it make sense to add currentRoutineId here?

function sets (state = { isLoading: true }, action) {
  switch (action.type) {
    case FETCH_ROUTINE_REQUEST:
    case UPDATE_ROUTINE_REQUEST:
      return {
        isLoading: true
      }
    case FETCH_ROUTINE_SUCCESS:
    case FETCH_ROUTINE_ERROR:
    case UPDATE_ROUTINE_SUCCESS:
    case UPDATE_ROUTINE_ERROR:
      return {
        isLoading: false
      }
    default:
      return state
  }
}

function routines (state = { isLoading: true }, action) {
  switch (action.type) {
    case FETCH_ROUTINE_REQUEST:
    case UPDATE_ROUTINE_REQUEST:
    case DELETE_ROUTINE_REQUEST:
      return {
        isLoading: true
      }
    case FETCH_ROUTINE_SUCCESS:
    case FETCH_ROUTINE_ERROR:
    case UPDATE_ROUTINE_SUCCESS:
    case UPDATE_ROUTINE_ERROR:
    case DELETE_ROUTINE_SUCCESS:
    case DELETE_ROUTINE_ERROR:
      return {
        isLoading: false
      }
    default:
      return state
  }
}

export default combineReducers({ routines, sets })
