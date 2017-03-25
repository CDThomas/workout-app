import React, { Component, PropTypes } from 'react'
import { ExercisePanel } from 'App/components'
import './styles.css'

const propTypes = {
  exercises: PropTypes.array
}

class RoutineEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      routineName: 'Routine Name'
    }
  }

  render () {
    return (
      <div className='RoutineEditor'>
        <ExercisePanel exercises={this.props.exercises} />
        <div className='RoutineEditor__main'>
          <div className='RoutineEditor__content'>
            <input
              className='RoutineEditor__routineNameInput'
              type='text'
              name='routineName'
              value={this.state.routineName}
            />
          </div>
        </div>
      </div>
    )
  }
}
RoutineEditor.propTypes = propTypes

export default RoutineEditor
