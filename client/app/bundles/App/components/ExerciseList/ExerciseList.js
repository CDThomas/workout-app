import React, { Component, PropTypes } from 'react'
import { ExerciseItem, SearchBar } from 'App/components'
import './styles.css'

const propTypes = {
  exercises: PropTypes.array
}

class ExerciseList extends Component {
  render () {
    const { exercises } = this.props
    return (
      <div className='ExerciseList'>
        <header className='ExerciseList__header'>
          <span className='ExerciseList__title'>Exercises</span>
          <SearchBar className='ExerciseList__search' />
        </header>
        <ul>
          {exercises.map(exercise => {
            return <ExerciseItem key={exercise.id} {...exercise} />
          })}
        </ul>
      </div>
    )
  }
}
ExerciseList.propTypes = propTypes

export default ExerciseList
