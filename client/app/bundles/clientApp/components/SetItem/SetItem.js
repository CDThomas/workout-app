import React, { Component, PropTypes } from 'react'
import { Title, Button } from 'clientApp/components'
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
      <li className='SetItem'>
        <Title>
          <span>{setNumber}. </span>
          <span>{exerciseName}</span>
        </Title>
        <div className='SetItem__bottomRow'>
          <span className='SetItem__mainMuscleWorked'>
            {mainMuscleWorked}
          </span>
          <Button
            size='small'
            color='white'
          >
            Delete
          </Button>
        </div>
      </li>
    )
  }
}
SetItem.propTypes = propTypes

export default SetItem
