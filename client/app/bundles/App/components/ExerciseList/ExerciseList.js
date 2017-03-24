import React, { Component, PropTypes } from 'react'
import { ExerciseItem, SearchBar, CreateExerciseModal } from 'App/components'
import { getExercises } from 'App/helpers/api'
import './styles.css'

const propTypes = {
  exercises: PropTypes.array
}

class ExerciseList extends Component {
  constructor (props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleCreateExerciseClick = this.handleCreateExerciseClick.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleExerciseCreated = this.handleExerciseCreated.bind(this)

    // Setting state from props because these props are only passed on initial load.
    // So right now there's not a scenario where this component will receive new props.
    // This might change.
    this.state = {
      exercises: this.props.exercises,
      isModalOpen: false
    }
  }

  handleSearchChange (evt) {
    const query = evt.target.value

    // TODO: Handle the case that the search is successful, but returns no results.
    //       Right now this throws an error (because you can't call map on undefined).
    //       So just need to handle an empty list
    getExercises(query).then(data => {
      this.setState({
        exercises: data.exercises
      })
    })
  }

  handleCreateExerciseClick (evt) {
    evt.preventDefault()
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleCloseModal () {
    this.setState({
      isModalOpen: false
    })
  }

  handleExerciseCreated (exercise) {
    const newExercises = [exercise, ...this.state.exercises]
    this.setState({
      exercises: newExercises,
      isModalOpen: false
    })
  }

  render () {
    const { exercises, isModalOpen } = this.state
    return (
      <div className='ExerciseList'>
        <header className='ExerciseList__header'>
          <span className='ExerciseList__title'>Exercises</span>
          <SearchBar
            className='ExerciseList__search'
            onChange={this.handleSearchChange}
          />
          <span className='ExerciseList__headerText'>or</span>
          <a className='ExerciseList__createExerciseLink' onClick={this.handleCreateExerciseClick}>
            create one
          </a>
          <CreateExerciseModal
            isOpen={isModalOpen}
            onRequestClose={this.handleCloseModal}
            onExerciseCreated={this.handleExerciseCreated}
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
