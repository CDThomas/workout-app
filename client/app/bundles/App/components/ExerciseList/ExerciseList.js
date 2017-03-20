import React, { Component, PropTypes } from 'react'
import { ExerciseItem, SearchBar } from 'App/components'
import { fetchExercises } from 'App/helpers/api'
import './styles.css'

const propTypes = {
  exercises: PropTypes.array
}

class ExerciseList extends Component {
  constructor (props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleSearchChange (evt) {
    fetchExercises().then(exercises => {
      console.log(exercises)
    })
  }

  render () {
    const { exercises } = this.props
    return (
      <div className='ExerciseList'>
        <header className='ExerciseList__header'>
          <span className='ExerciseList__title'>Exercises</span>
          <SearchBar
            className='ExerciseList__search'
            onChange={this.handleSearchChange}
           />
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
