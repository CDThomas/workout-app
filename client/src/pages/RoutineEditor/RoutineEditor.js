import React, { Component, PropTypes } from 'react'
import {
  ExercisePanel,
  SetList,
  Button,
  Message,
  ConfirmDialog
} from 'components'
import './styles.css'
import { updateRoutine, getRoutine, deleteRoutine } from 'helpers/api'
import classNames from 'classnames'

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  history: PropTypes.object
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
      isLoading: true,
      isDeleteRoutineConfirmOpen: false
    }

    this.handleChangeRoutineName = this.handleChangeRoutineName.bind(this)
    this.handleExerciseClick = this.handleExerciseClick.bind(this)
    this.handleDeleteSetClick = this.handleDeleteSetClick.bind(this)
    this.handleCreateRoutineClick = this.handleCreateRoutineClick.bind(this)
    this.handleDeleteRoutineClick = this.handleDeleteRoutineClick.bind(this)
    this.handleDeleteRoutineConfirm = this.handleDeleteRoutineConfirm.bind(this)
    this.handleDeleteRoutineCancel = this.handleDeleteRoutineCancel.bind(this)
  }

  componentDidMount () {
    const { id } = this.props.match.params

    getRoutine(id)
      .then(({ routine }) => {
        const { id, name, sets } = routine
        this.setState({
          routineId: id,
          routineName: name || '',
          sets,
          isLoading: false
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

  handleDeleteRoutineClick () {
    this.setState({
      isDeleteRoutineConfirmOpen: true
    })
  }

  handleDeleteRoutineConfirm () {
    deleteRoutine(this.state.routineId)
      .then(() => {
        // TODO: Flash message for successful delete on next route.
        //       Something like a toast.
        //       Prob will wait until I've implemented redux for this. That should simplify adding
        //       and clearing toasts.
        console.log(`Routine with ID ${this.state.routineId} deleted.`)

        this.props.history.push('/routines')
      })
      .catch(() => {
        console.log('catch cb called')
        this.setState({
          errors: [{ message: 'Unable to delete this routine' }],
          isDeleteRoutineConfirmOpen: false
        })
      })
  }

  handleDeleteRoutineCancel () {
    this.setState({
      isDeleteRoutineConfirmOpen: false
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
    const nameInputClass = classNames(
      'RoutineEditor__routineNameInput',
      { 'RoutineEditor__routineNameInput--disabled': this.state.isLoading }
    )

    return (
      <div className='RoutineEditor'>
        <ExercisePanel
          onExerciseClick={this.handleExerciseClick}
        />

        <div className='RoutineEditor__exercisePanelOffset'>
          <div className='RoutineEditor__container'>
            <div className='RoutineEditor__header'>
              <input
                className={nameInputClass}
                type='text'
                onChange={this.handleChangeRoutineName}
                value={this.state.routineName}
                disabled={this.state.isLoading}
              />
              <div className='RoutineEditor__controls'>
                <Button
                  onClick={this.handleDeleteRoutineClick}
                  color='red'
                  disabled={this.state.isLoading}
                >
                  Delete Routine
                </Button>
                <ConfirmDialog
                  text='Are you sure you want to delete this routine?'
                  confirmButtonText='Delete'
                  confirmButtonColor='red'
                  isOpen={this.state.isDeleteRoutineConfirmOpen}
                  onConfirm={this.handleDeleteRoutineConfirm}
                  onCancel={this.handleDeleteRoutineCancel}
                  onRequestClose={this.handleDeleteRoutineCancel}
                />
                <Button
                  className='RoutineEditor__saveButton'
                  onClick={this.handleCreateRoutineClick}
                  disabled={this.state.isLoading}
                >
                  Save Routine
                </Button>
              </div>
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
              isLoading={this.state.isLoading}
            />
          </div>
        </div>
      </div>
    )
  }
}
RoutineEditor.propTypes = propTypes

export default RoutineEditor
