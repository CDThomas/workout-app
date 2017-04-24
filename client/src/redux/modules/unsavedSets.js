import {
  ADD_UNSAVED_SET,
  DELETE_SET,
  UPDATE_ROUTINE_SUCCESS
} from './actionTypes'
import { omit } from 'lodash'

export function addUnsavedSet (set) {
  return {
    type: ADD_UNSAVED_SET,
    set
  }
}

export default function unsavedSets (state = {}, action) {
  switch (action.type) {
    case ADD_UNSAVED_SET:
      return {
        ...state,
        [action.set.id]: action.set
      }
    case DELETE_SET:
      return omit(state, action.id)
    case UPDATE_ROUTINE_SUCCESS:
      return {}
    default:
      return state
  }
}
