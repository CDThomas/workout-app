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

    // Setting state from props because these props are only passed on initial load.
    // So right now there's not a scenario where this component will receive new props.
    // This might change.
    this.state = {
      exercises: this.props.exercises
    }
  }

  handleSearchChange (evt) {
    const query = evt.target.value

    fetchExercises(query).then(data => {
      this.setState({
        exercises: data.exercises
      })
    })
  }

  render () {
    const { exercises } = this.state
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
