import React, { Component, PropTypes } from 'react'
import { ExerciseItem } from 'App/components'

const propTypes = {
  exercises: PropTypes.array
}

class ExerciseList extends Component {
  render () {
    const { exercises } = this.props
    return (
      <ul>
        {exercises.map(exercise => {
          return <ExerciseItem key={exercise.id} {...exercise} />
        })}
      </ul>
    )
  }
}
ExerciseList.propTypes = propTypes

export default ExerciseList
