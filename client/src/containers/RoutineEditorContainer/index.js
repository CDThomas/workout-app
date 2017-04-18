import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as routinesActionCreators from 'redux/modules/routines'
import { updateRoutine, getRoutine, deleteRoutine } from 'helpers/api'
import { RoutineEditor } from 'components'

const { shape, string, object, number, arrayOf, func, bool } = PropTypes
const propTypes = {
  // React Router
  match: shape({
    params: shape({
      id: string.isRequired
    })
  }),
  history: object,

  // Redux
  routine: shape({
    name: string,
    id: number
  }),
  sets: arrayOf(object),
  isLoading: bool.isRequired,
  fetchRoutine: func.isRequired
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
    this.handleDeleteRoutineConfirm = this.handleDeleteRoutineConfirm.bind(
      this
    )
    this.handleDeleteRoutineCancel = this.handleDeleteRoutineCancel.bind(this)
  }

  componentDidMount () {
    const { id } = this.props.match.params
    this.props.fetchRoutine(id)
  }

  handleExerciseClick (exercise) {
    // addSet
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
    // removeSet or deleteSet
    const { sets } = this.state
    const setIndex = setNumber - 1
    const newSets = [...sets.slice(0, setIndex), ...sets.slice(setIndex + 1)]

    this.setState({
      sets: newSets
    })
  }

  handleDeleteRoutineClick () {
    // This can probably be internal state of a lower component, like the delete
    // button. Probably won't live in the store.
    this.setState({
      isDeleteRoutineConfirmOpen: true
    })
  }

  handleDeleteRoutineConfirm () {
    // deleteRoutine (thunk)
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
    // This can probably be internal state of a lower component, like the delete
    // button. Probably won't live in the store.
    this.setState({
      isDeleteRoutineConfirmOpen: false
    })
  }

  handleChangeRoutineName (evt) {
    // changeRoutineName(routineName, routineId)
    this.setState({
      routineName: evt.target.value
    })
  }

  // This is really saveRoutineClick now
  handleCreateRoutineClick () {
    // TODO: format this somewhere else (maybe in the api helper)
    const routine = {
      id: this.state.routineId,
      name: this.state.routineName,
      fafSetsAttributes: this.state.sets
    }

    this.setState({ isLoading: true })

    // updateRoutine(routine) (thunk)
    updateRoutine(routine)
      .then(({ routine }) => {
        const { name, sets } = routine
        this.setState({
          info: 'Workout was updated successfully!',
          errors: [],
          routineName: name,
          sets
        })

        // this.props.updateRoutine(routine)
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
      // routine,
      // isLoading,
      isDeleteRoutineConfirmOpen,
      info,
      errors
      // sets
    } = this.state

    const { routine, sets, isLoading } = this.props

    // const { routine, sets } = this.props
    // const routineName = (routine && routine.name) || ''

    return (
      <RoutineEditor
        onExerciseClick={this.handleExerciseClick}
        onChangeRoutineName={this.handleChangeRoutineName}
        onDeleteRoutineClick={this.handleDeleteRoutineClick}
        onDeleteRoutineConfirm={this.handleDeleteRoutineConfirm}
        onDeleteRoutineCancel={this.handleDeleteRoutineCancel}
        onCreateRoutineClick={this.handleCreateRoutineClick}
        onDeleteSetClick={this.handleDeleteSetClick}
        routine={routine}
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

function mapStateToProps ({ routines }, ownProps) {
  const routineId = ownProps.match.params.id
  const routine = routines[routineId]
  return {
    routine,
    sets: (routine && routine.sets) || [],
    isLoading: routines.isLoading
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(routinesActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  RoutineEditorContainer
)
