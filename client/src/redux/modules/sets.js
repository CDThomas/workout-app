import {
  DELETE_SET,
  FETCH_ROUTINE_SUCCESS,
  UPDATE_ROUTINE_SUCCESS
} from './actionTypes'
import { removeSetBySetNumber } from 'helpers/utils'
import { omit, pick } from 'lodash'

export function deleteSet (set, routineId) {
  return {
    type: DELETE_SET,
    set
  }
}

export default function sets (state = {}, action) {
  switch (action.type) {
    case FETCH_ROUTINE_SUCCESS:
    case UPDATE_ROUTINE_SUCCESS:
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
        ...setsById
      }
    case DELETE_SET:
      // TODO: remove because simplified now!

      // This is tricky. Could use to find a cleaner, way to do this.
      // Doing this because I don't want to lose properties that aren't actually
      // sets (like 'isLoading').

      // The solution is probably separating UI state (like loading) from
      // entities. That way I now only set objects are in my sets state
      // TODO: separate UI state form entitiy state
      const stateWithoutSets = pick(state, Object.keys({}))

      // Sets will be anything on the state with a key (id) that doesn't exist in
      // the reducer's initial state
      const oldSets = omit(state, Object.keys({}))
      const updatedSets = removeSetBySetNumber(oldSets, action.set.setNumber)

      return {
        ...stateWithoutSets,
        ...updatedSets
      }
    default:
      return state
  }
}
