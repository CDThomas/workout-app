import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as routinesActionCreators from 'redux/modules/routines'
import * as setsActionCreators from 'redux/modules/sets'
import * as unsaveSetsActionCreators from 'redux/modules/unsavedSets'
import { updateRoutine } from 'helpers/api'
import { RoutineEditor } from 'components'
import { v4 as uuid } from 'uuid'
import { values } from 'lodash'

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
  setsLoading: bool.isRequired,
  fetchRoutine: func.isRequired,
  deleteRoutine: func.isRequired,
  addUnsavedSet: func.isRequired,
  deleteSet: func.isRequired
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
    const newSet = {
      exerciseName: exercise.name,
      exerciseId: exercise.id,
      mainMuscleWorked: exercise.mainMuscleWorked,
      id: uuid(),
      routineId: this.props.routine.id
    }

    this.props.addUnsavedSet(newSet)
  }

  handleDeleteSetClick (id, routineId) {
    this.props.deleteSet(id, routineId)
  }

  handleDeleteRoutineClick () {
    // This can probably be internal state of a lower component, like the delete
    // button. Probably won't live in the store.
    this.setState({
      isDeleteRoutineConfirmOpen: true
    })
  }

  handleDeleteRoutineConfirm () {
    // TODO: Flash message for successful delete on next route.
    //       Something like a toast.
    //       Prob will wait until I've implemented redux for this. That should simplify adding
    //       and clearing toasts.

    this.props.deleteRoutine(this.props.routine.id).then(() => {
      console.log(`Routine with ID ${this.state.routineId} deleted.`)
      this.props.history.push('/routines')
    })

    // TODO: update error handling with Redux
    // .catch(() => {
    //   this.setState({
    //     errors: [{ message: 'Unable to delete this routine' }],
    //     isDeleteRoutineConfirmOpen: false
    //   })
    // })
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

    const { routine, sets, isLoading, setsLoading } = this.props

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
        setsLoading={setsLoading}
        isDeleteRoutineConfirmOpen={isDeleteRoutineConfirmOpen}
        info={info}
        errors={errors}
        sets={sets}
      />
    )
  }
}
RoutineEditorContainer.propTypes = propTypes

function mapStateToProps ({ routines, sets, unsavedSets }, ownProps) {
  const routineId = ownProps.match.params.id
  const routine = routines[routineId]
  const setIds = routine ? routine.setIds : []
  const savedSets = setIds.map(setId => sets[setId])
  const unsavedSetsArr = values(unsavedSets)

  return {
    routine,
    // Would make more sense to pass down the setIds or move this to a lower container,
    // but this will work for the moment
    sets: [...savedSets, ...unsavedSetsArr],
    isLoading: routines.isLoading,
    setsLoading: sets.isLoading
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      ...routinesActionCreators,
      ...setsActionCreators,
      ...unsaveSetsActionCreators
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(
  RoutineEditorContainer
)
