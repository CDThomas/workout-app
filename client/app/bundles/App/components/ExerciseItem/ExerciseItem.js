import React, { Component, PropTypes } from 'react'
import './styles.css'
import { capitalize } from 'lodash'

const propTypes = {
  name: PropTypes.string,
  main_muscle_worked: PropTypes.string
}

class ExerciseItem extends Component {
  render () {
    const { name, main_muscle_worked } = this.props

    return (
      <li className='ExerciseItem'>
        <div className='ExerciseItem__thumbnail' />
        <div className='ExerciseItem__content'>
          <span className='ExerciseItem__name'>{name}</span>
          <span className='ExerciseItem__mainMuscleWorked'>
            {capitalize(main_muscle_worked).replace('_', ' ')}
          </span>
        </div>
      </li>
    )
  }
}
ExerciseItem.propTypes = propTypes

export default ExerciseItem
