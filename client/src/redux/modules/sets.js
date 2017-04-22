import { DELETE_SET, FETCH_ROUTINE_SUCCESS } from './actionTypes'
import { omit } from 'lodash'

export function deleteSet (id, routineId) {
  return {
    type: DELETE_SET,
    id,
    routineId
  }
}

const initialState = {
  isLoading: true
}

export default function sets (state = initialState, action) {
  switch (action.type) {
    case FETCH_ROUTINE_SUCCESS:
      // TODO: This will need to be setNumber, but not yet in db table.
      //       This works for now because sets happen to always be in the order
      //       that they were created and id's are sequential. This will break
      //       once a user can change the order of sets.
      //       This also prevents adding sets without having an ID, which I can't
      //       make on the client.
      //       ...
      //       Actually no, I want these by ID. How to handle storing
      //       ...
      //       Also, normalizing the data from this response might be good
      const setsById = action.routine.sets.reduce((byId, set) => {
        byId[set.id] = set
        return byId
      }, {})

      return {
        ...state,
        ...setsById,
        isLoading: false
      }
    case DELETE_SET:
      return omit(state, action.id)
    default:
      return state
  }
}
