import React, { Component, PropTypes } from 'react'
import { ExercisePanel, SetList } from 'clientApp/components'
import './styles.css'

const propTypes = {
  exercises: PropTypes.array
}

const sets = [
  {
    exerciseName: 'Bench press',
    mainMuscleWorked: 'Chest'
  },
  {
    exerciseName: 'Bench press',
    mainMuscleWorked: 'Chest'
  },
  {
    exerciseName: 'Bench press',
    mainMuscleWorked: 'Chest'
  },
  {
    exerciseName: 'Pull-ups',
    mainMuscleWorked: 'Lats'
  },
  {
    exerciseName: 'Pull-ups',
    mainMuscleWorked: 'Lats'
  },
  {
    exerciseName: 'Pull-ups',
    mainMuscleWorked: 'Lats'
  },
  {
    exerciseName: 'Incline bench press',
    mainMuscleWorked: 'Chest'
  },
  {
    exerciseName: 'Incline bench press',
    mainMuscleWorked: 'Chest'
  },
  {
    exerciseName: 'Incline bench press',
    mainMuscleWorked: 'Chest'
  }
]

class RoutineEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      routineName: 'Routine Name'
    }

    this.handleChangeRoutineName = this.handleChangeRoutineName.bind(this)
  }

  handleChangeRoutineName (evt) {
    this.setState({
      routineName: evt.target.value
    })
  }

  render () {
    return (
      <div className='RoutineEditor'>
        <ExercisePanel exercises={this.props.exercises} />
        <div className='RoutineEditor__main'>
          <div className='RoutineEditor__content'>
            {/* Maybe RoutineEditor__controls or RoutineEditor__header */}
            <input
              className='RoutineEditor__routineNameInput'
              type='text'
              onChange={this.handleChangeRoutineName}
              value={this.state.routineName}
            />

            <SetList sets={sets} />
          </div>
        </div>
      </div>
    )
  }
}
RoutineEditor.propTypes = propTypes

export default RoutineEditor
