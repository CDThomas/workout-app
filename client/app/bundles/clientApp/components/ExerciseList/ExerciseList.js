import React, { PropTypes } from 'react'
import { ExerciseItem } from 'clientApp/components'
import './styles.css'

const propTypes = {
  exercises: PropTypes.array,
  // I'll probably remove this cb function and dispatch an action instead if I add Redux
  onCreateExerciseClick: PropTypes.func.isRequired
}

function ExerciseList ({ exercises, onCreateExerciseClick }) {
  if (exercises === undefined || exercises.length === 0) {
    return (
      <div className='ExerciseList--empty'>
        {'Looks like that exercise isn\'t here.'}
        <a
          className='ExerciseList__createExerciseLink'
          onClick={onCreateExerciseClick}
        >
          Click here to add it
        </a>
      </div>
    )
  }

  return (
    <ul className='ExerciseList'>
      {exercises.map(exercise => {
        return <ExerciseItem key={exercise.id} {...exercise} />
      })}
    </ul>
  )
}
ExerciseList.propTypes = propTypes

export default ExerciseList
