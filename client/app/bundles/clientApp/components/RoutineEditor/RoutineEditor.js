import React, { Component, PropTypes } from 'react'
import { ExercisePanel, SetList } from 'clientApp/components'
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
  }

  // Eh, I don't think I like passing this down so many levels
  handleExerciseClick (exercise) {
    const newSet = {
      exerciseName: exercise.name,
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

  render () {
    return (
      <div className='RoutineEditor'>
        <ExercisePanel
          exercises={this.props.exercises}
          onExerciseClick={this.handleExerciseClick}
        />

        <div className='RoutineEditor__main'>
          <div className='RoutineEditor__content'>
            {/* Maybe RoutineEditor__controls or RoutineEditor__header */}
            <input
              className='RoutineEditor__routineNameInput'
              type='text'
              onChange={this.handleChangeRoutineName}
              value={this.state.routineName}
            />

            <SetList sets={this.state.sets} />
          </div>
        </div>
      </div>
    )
  }
}
RoutineEditor.propTypes = propTypes

export default RoutineEditor
