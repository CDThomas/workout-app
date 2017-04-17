import React, { Component, PropTypes } from 'react'
import { updateRoutine, getRoutine, deleteRoutine } from 'helpers/api'
import { RoutineEditor } from 'components'

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  history: PropTypes.object
}

class RoutineEditorContainer extends Component {
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
    const {
      routineName,
      isLoading,
      isDeleteRoutineConfirmOpen,
      info,
      errors,
      sets
    } = this.state

    return (
      <RoutineEditor
        onExerciseClick={this.handleExerciseClick}
        onChangeRoutineName={this.handleChangeRoutineName}
        onDeleteRoutineClick={this.handleDeleteRoutineClick}
        onDeleteRoutineConfirm={this.handleDeleteRoutineConfirm}
        onDeleteRoutineCancel={this.handleDeleteRoutineCancel}
        onCreateRoutineClick={this.handleCreateRoutineClick}
        onDeleteSetClick={this.handleDeleteSetClick}
        routineName={routineName}
        isLoading={isLoading}
        isDeleteRoutineConfirmOpen={isDeleteRoutineConfirmOpen}
        info={info}
        errors={errors}
        sets={sets}
      />
    )
  }
}
RoutineEditorContainer.propTypes = propTypes

export default RoutineEditorContainer
