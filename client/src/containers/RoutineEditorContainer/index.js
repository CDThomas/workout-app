import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as routinesActionCreators from 'redux/modules/routines'
import * as setsActionCreators from 'redux/modules/sets'
import * as unsaveSetsActionCreators from 'redux/modules/unsavedSets'
import { RoutineEditor } from 'components'
import { v4 as uuid } from 'uuid'
import { values } from 'lodash'

const { shape, string, object, number, arrayOf, func, bool, array } = PropTypes
const propTypes = {
  // React Router
  match: shape({
    params: shape({
      id: string.isRequired
    }).isRequired
  }).isRequired,
  history: object,

  // Redux
  routine: shape({
    name: string.isRequired,
    id: number.isRequired
  }),
  sets: arrayOf(object),
  isLoading: bool.isRequired,
  setsLoading: bool.isRequired,
  info: string,
  errors: array.isRequired,
  fetchRoutine: func.isRequired,
  deleteRoutine: func.isRequired,
  addUnsavedSet: func.isRequired,
  changeRoutineName: func.isRequired,
  updateRoutine: func.isRequired
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
    this.handleSaveRoutineClick = this.handleSaveRoutineClick.bind(this)
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
      id: uuid(), // temp ID used for unsaved sets. Not used after save.
      routineId: this.props.routine.id,
      setNumber: this.props.sets.length + 1
    }

    this.props.addUnsavedSet(newSet)
  }

  handleDeleteRoutineClick () {
    // This can probably be internal state of a lower component, like the delete
    // button. Probably won't live in the store.
    this.setState({
      isDeleteRoutineConfirmOpen: true
    })
  }

  handleDeleteRoutineConfirm () {
    const { id } = this.props.routine
    this.props.deleteRoutine(id).then(() => {
      console.log(`Routine with ID ${id} deleted.`)
      this.props.history.push('/routines')
    })

    // TODO: Flash message for successful delete on next route.
    //       Something like a toast.
    //       Prob will wait until I've implemented redux for this. That should simplify adding
    //       and clearing toasts.

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
    const routineName = evt.target.value
    const routineId = this.props.routine.id
    this.props.changeRoutineName(routineId, routineName)
  }

  handleSaveRoutineClick () {
    // TODO: format this somewhere else (maybe in the api helper)
    const sets = this.props.sets.map(set => {
      return {
        exerciseId: set.exerciseId,
        setNumber: set.setNumber
      }
    })
    const routine = {
      id: this.props.routine.id,
      name: this.props.routine.name,
      faSetsAttributes: sets
    }

    this.props.updateRoutine(routine)
  }

  render () {
    const { isDeleteRoutineConfirmOpen } = this.state
    const { routine, sets, isLoading, setsLoading, info, errors } = this.props

    return (
      <RoutineEditor
        onExerciseClick={this.handleExerciseClick}
        onChangeRoutineName={this.handleChangeRoutineName}
        onDeleteRoutineClick={this.handleDeleteRoutineClick}
        onDeleteRoutineConfirm={this.handleDeleteRoutineConfirm}
        onDeleteRoutineCancel={this.handleDeleteRoutineCancel}
        onSaveRoutineClick={this.handleSaveRoutineClick}
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

function mapStateToProps ({ routines, sets, unsavedSets, ui }, ownProps) {
  const routineId = ownProps.match.params.id
  const routine = routines[routineId]
  // TODO: move to SetListContainer
  // right now this is duplicated because RoutineEditorHeader needs sets as well
  // ... Well kindof. Some event callbacks use it. Still prob want to move to
  // RoutineEditorHeaderContainer
  const setIds = routine ? routine.setIds : []
  const savedSets = setIds.map(setId => sets[setId])
  const unsavedSetsArr = values(unsavedSets)

  return {
    routine,
    // Would make more sense to pass down the setIds or move this to a lower container,
    // but this will work for the moment.
    // A routineSets selector would prob work.
    sets: [...savedSets, ...unsavedSetsArr],
    isLoading: ui.routines.isLoading,
    setsLoading: ui.sets.isLoading,
    info: routines.info,
    errors: routines.errors
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
