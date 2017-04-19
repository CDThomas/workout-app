import { ADD_MULTIPLE_SETS, DELETE_SET } from './actionTypes'

export function addMultipleSets (sets = []) {
  return {
    type: ADD_MULTIPLE_SETS,
    sets
  }
}

export function deleteSet (id) {}

const initialState = {
  isLoading: false
}

export default function sets (state = initialState, action) {
  switch (action.type) {
    case ADD_MULTIPLE_SETS:
      // TODO: This will need to be setNumber, but not yet in db table.
      //       This works for now because sets happen to always be in the order
      //       that they were created and id's are sequential. This will break
      //       once a user can change the order of sets.
      //       This also prevents adding sets without having an ID, which I can't
      //       make on the client.
      //       ...
      //       Actually no, I want these by ID. How to handle storing
      const setsById = action.sets.reduce((byId, set) => {
        byId[set.id] = set
        return byId
      }, {})

      return {
        ...state,
        ...setsById
      }
    default:
      return state
  }
}
