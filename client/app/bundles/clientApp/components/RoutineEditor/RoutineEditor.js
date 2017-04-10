import React, { Component, PropTypes } from 'react'
import { ExercisePanel, SetList, Button, Message } from 'clientApp/components'
import './styles.css'
import { updateRoutine, getRoutine } from 'clientApp/helpers/api'

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
}

class RoutineEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      routineId: null,
      routineName: '',
      sets: [],
      errors: [],
      info: '',
      isLoading: false
    }

    this.handleChangeRoutineName = this.handleChangeRoutineName.bind(this)
    this.handleExerciseClick = this.handleExerciseClick.bind(this)
    this.handleDeleteSetClick = this.handleDeleteSetClick.bind(this)
    this.handleCreateRoutineClick = this.handleCreateRoutineClick.bind(this)
  }

  componentDidMount () {
    const { id } = this.props.match.params

    getRoutine(id)
      .then(({ routine }) => {
        const { id, name, sets } = routine
        this.setState({
          routineId: id,
          routineName: name || '',
          sets
        })
      })
      // TODO: handle 404 (routine not found)
      .catch(error => console.warn(error))
  }

  handleExerciseClick (exercise) {
    const newSet = {
      exerciseName: exercise.name,
      exerciseId: exercise.id,
      mainMuscleWorked: exercise.mainMuscleWorked
    }

    this.setState({
      sets: [...this.state.sets, newSet]
    })
  }

  handleDeleteSetClick (setNumber) {
    const { sets } = this.state
    const setIndex = setNumber - 1
    const newSets = [...sets.slice(0, setIndex), ...sets.slice(setIndex + 1)]

    this.setState({
      sets: newSets
    })
  }

  handleChangeRoutineName (evt) {
    this.setState({
      routineName: evt.target.value
    })
  }

  handleCreateRoutineClick () {
    const routine = {
      id: this.state.routineId,
      name: this.state.routineName,
      fafSetsAttributes: this.state.sets
    }

    this.setState({ isLoading: true })

    updateRoutine(routine)
      .then(({ routine }) => {
        const { name, sets } = routine
        this.setState({
          info: 'Workout was updated successfully!',
          errors: [],
          routineName: name,
          sets
        })
      })
      .catch(error => {
        const response = error.response
        if (response && response.status === 422) {
          response.json().then(body => {
            this.setState({
              errors: body.errors,
              info: ''
            })
          })
        } else {
          console.error(error)
        }
      })
      .then(() => this.setState({ isLoading: false }))
  }

  render () {
    return (
      <div className='RoutineEditor'>
        <ExercisePanel
          onExerciseClick={this.handleExerciseClick}
        />

        <div className='RoutineEditor__exercisePanelOffset'>
          <div className='RoutineEditor__container'>
            <div className='RoutineEditor__header'>
              <input
                className='RoutineEditor__routineNameInput'
                type='text'
                onChange={this.handleChangeRoutineName}
                value={this.state.routineName}
              />
              <Button onClick={this.handleCreateRoutineClick}>
                Save Routine
              </Button>
            </div>

            {this.state.info && (
              <Message success>
                {this.state.info}
              </Message>
            )}

            {this.state.errors && this.state.errors.length > 0 && (
              <Message error>
                {this.state.errors.map(e => e.message).join('. ')}
              </Message>
            )}
            <SetList
              sets={this.state.sets}
              onDeleteSetClick={this.handleDeleteSetClick}
            />
          </div>
        </div>
      </div>
    )
  }
}
RoutineEditor.propTypes = propTypes

export default RoutineEditor
