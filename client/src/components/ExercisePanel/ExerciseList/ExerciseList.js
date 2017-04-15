import React, { PropTypes } from 'react'
import ExerciseItem from '../ExerciseItem/ExerciseItem'
import './styles.css'

const propTypes = {
  exercises: PropTypes.array,
  // I'll probably remove this cb function and dispatch an action instead if I add Redux
  onCreateExerciseClick: PropTypes.func.isRequired,
  onExerciseClick: PropTypes.func.isRequired
}

function ExerciseList ({ exercises, onCreateExerciseClick, onExerciseClick }) {
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
        return (
          <ExerciseItem
            onClick={onExerciseClick}
            key={exercise.id}
            exercise={exercise}
          />
        )
      })}
    </ul>
  )
}
ExerciseList.propTypes = propTypes

export default ExerciseList
