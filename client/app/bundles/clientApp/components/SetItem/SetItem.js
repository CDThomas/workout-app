import React, { Component, PropTypes } from 'react'
import './styles.css'

const propTypes = {
  exerciseName: PropTypes.string,
  mainMuscleWorked: PropTypes.string,
  setNumber: PropTypes.number
}

class SetItem extends Component {
  render () {
    const { exerciseName, mainMuscleWorked, setNumber } = this.props
    return (
      <ul className='SetItem'>
        <span>#{setNumber}</span>
        <span>{exerciseName}</span>
        <span>{mainMuscleWorked}</span>
      </ul>
    )
  }
}
SetItem.propTypes = propTypes

export default SetItem
