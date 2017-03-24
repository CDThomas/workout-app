import React, { Component, PropTypes } from 'react'
import { ExerciseList, SearchBar, CreateExerciseModal } from 'App/components'
import { getExercises } from 'App/helpers/api'
import './styles.css'

const propTypes = {
  exercises: PropTypes.array
}

class ExercisePanel extends Component {
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
      exercises: this.props.exercises || [],
      isModalOpen: false
    }
  }

  handleSearchChange (evt) {
    const query = evt.target.value

    getExercises(query).then(data => {
      this.setState({
        exercises: data.exercises || []
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
    const newExercises = this.state.exercises && this.state.exercises.length > 0
      ? [exercise, ...this.state.exercises]
      : [exercise]

    this.setState({
      exercises: newExercises,
      isModalOpen: false
    })
  }

  render () {
    const { exercises, isModalOpen } = this.state
    return (
      <div className='ExercisePanel'>
        <header className='ExercisePanel__header'>
          <span className='ExercisePanel__title'>Exercises</span>
          <SearchBar
            className='ExercisePanel__search'
            onChange={this.handleSearchChange}
          />
          <span className='ExercisePanel__headerText'>or</span>
          <a className='ExercisePanel__createExerciseLink' onClick={this.handleCreateExerciseClick}>
            create one
          </a>
          <CreateExerciseModal
            isOpen={isModalOpen}
            onRequestClose={this.handleCloseModal}
            onExerciseCreated={this.handleExerciseCreated}
          />
        </header>

        <ExerciseList
          exercises={exercises}
          onCreateExerciseClick={this.handleCreateExerciseClick}
        />
      </div>
    )
  }
}
ExercisePanel.propTypes = propTypes

export default ExercisePanel
