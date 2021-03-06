import React, { Component, PropTypes } from 'react'
import { SearchBar, Panel, Heading } from 'components'
import ExerciseList from './ExerciseList/ExerciseList'
import CreateExerciseModal from './CreateExerciseModal/CreateExerciseModal'
import { getExercises } from 'helpers/api'
import './styles.css'

const propTypes = {
  onExerciseClick: PropTypes.func.isRequired
}

class ExercisePanel extends Component {
  constructor (props) {
    super(props)

    // Setting state from props because these props are only passed on initial
    //   load. So right now there's not a scenario where this component will
    //   receive new props.
    this.state = {
      exercises: [],
      isModalOpen: false,
      isLoading: true
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleCreateExerciseClick = this.handleCreateExerciseClick.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleExerciseCreated = this.handleExerciseCreated.bind(this)
  }

  componentDidMount () {
    getExercises()
      .then(data => {
        this.setState({
          exercises: data.exercises || [],
          isLoading: false
        })
      })
      .catch(error => console.warn(error))
  }

  handleSearchChange (evt) {
    const query = evt.target.value
    this.setState({ isLoading: true })

    getExercises(query)
      .then(data => {
        this.setState({
          exercises: data.exercises || [],
          isLoading: false
        })
      })
      .catch(error => console.warn(error))
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
    const { exercises, isModalOpen, isLoading } = this.state
    return (
      <Panel className='ExercisePanel'>
        <Panel.Header className='ExercisePanel__header'>
          <Heading>Exercises</Heading>
          <SearchBar
            className='ExercisePanel__search'
            onChange={this.handleSearchChange}
            placeholder='Find an exercise...'
          />
          <span className='ExercisePanel__headerText'>or</span>
          <a
            className='ExercisePanel__createExerciseLink'
            onClick={this.handleCreateExerciseClick}
          >
            create one
          </a>
          <CreateExerciseModal
            isOpen={isModalOpen}
            onRequestClose={this.handleCloseModal}
            onExerciseCreated={this.handleExerciseCreated}
          />
        </Panel.Header>

        <ExerciseList
          exercises={exercises}
          onCreateExerciseClick={this.handleCreateExerciseClick}
          onExerciseClick={this.props.onExerciseClick}
          isLoading={isLoading}
        />
      </Panel>
    )
  }
}
ExercisePanel.propTypes = propTypes

export default ExercisePanel
