import React, { Component, PropTypes } from 'react'
import { ExercisePanel, SetList, Button } from 'clientApp/components'
import './styles.css'

const propTypes = {
  exercises: PropTypes.array
}


class RoutineEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      routineName: 'Routine Name',
      sets: []
    }

    this.handleChangeRoutineName = this.handleChangeRoutineName.bind(this)
    this.handleExerciseClick = this.handleExerciseClick.bind(this)
    this.handleCreateRoutineClick = this.handleCreateRoutineClick.bind(this)
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
    console.log({
      routine: {
        routineName: this.state.routineName,
        sets: this.state.sets
      }
    })
  }

  render () {
    return (
      <div className='RoutineEditor'>
        <ExercisePanel
          exercises={this.props.exercises}
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
                Create Routine
              </Button>
            </div>
            <SetList sets={this.state.sets} />
          </div>
        </div>
      </div>
    )
  }
}
RoutineEditor.propTypes = propTypes

export default RoutineEditor
