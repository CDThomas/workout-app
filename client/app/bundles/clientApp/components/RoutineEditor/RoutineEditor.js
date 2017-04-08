import React, { Component, PropTypes } from 'react'
import { ExercisePanel, SetList, Button, Message } from 'clientApp/components'
import './styles.css'
import { createRoutine, getRoutine } from 'clientApp/helpers/api'

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
}


class RoutineEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      routineName: '',
      sets: [],
      errors: [],
      info: '',
      isLoading: false
    }

    this.handleChangeRoutineName = this.handleChangeRoutineName.bind(this)
    this.handleExerciseClick = this.handleExerciseClick.bind(this)
    this.handleCreateRoutineClick = this.handleCreateRoutineClick.bind(this)
  }

  componentDidMount () {
    const { id } = this.props.match.params

    if (id) {
      getRoutine(id)
        .then(data => {
          if (data.routine) {
            const { name, sets } = data.routine
            this.setState({
              routineName: name,
              sets
            })
          }
        })
        // TODO: handle 404 (routine not found)
        .catch(error => console.warn(error))
    }
  }

  // Eh, I don't think I like passing this down so many levels
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

  handleChangeRoutineName (evt) {
    this.setState({
      routineName: evt.target.value
    })
  }

  handleCreateRoutineClick () {
    const routine = {
      routine: {
        name: this.state.routineName,
        fafSetsAttributes: this.state.sets
      }
    }

    this.setState({ isLoading: true })

    createRoutine(routine)
      .then(data => {
        this.setState({
          info: 'Workout was created successfully!',
          errors: []
        })
        console.log(data)
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
                placeholder='Unnamed Routine'
                onChange={this.handleChangeRoutineName}
                value={this.state.routineName}
              />
              <Button onClick={this.handleCreateRoutineClick}>
                Create Routine
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
            <SetList sets={this.state.sets} />
          </div>
        </div>
      </div>
    )
  }
}
RoutineEditor.propTypes = propTypes

export default RoutineEditor
