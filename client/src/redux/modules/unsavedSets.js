import { ADD_UNSAVED_SET, DELETE_SET } from './actionTypes'

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
    default:
      return state
  }
}
