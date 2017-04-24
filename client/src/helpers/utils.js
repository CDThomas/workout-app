import { omitBy } from 'lodash'

export function removeSetBySetNumber (sets, setNumber) {
  if (!Object.keys(sets).length) return sets

  const newSets = omitBy(sets, set => set.setNumber === setNumber)
  for (let id in newSets) {
    if (newSets.hasOwnProperty(id)) {
      const set = newSets[id]
      if (set.setNumber > setNumber) {
        set.setNumber--
      }
    }
  }

  return newSets
}
