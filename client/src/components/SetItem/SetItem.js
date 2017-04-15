import React, { Component, PropTypes } from 'react'
import { Title, Button } from 'components'
import './styles.css'

const { string, number, func } = PropTypes

const propTypes = {
  exerciseName: string,
  mainMuscleWorked: string,
  setNumber: number,
  onDeleteClick: func
}

class SetItem extends Component {
  constructor (props) {
    super(props)

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleDeleteClick () {
    this.props.onDeleteClick(this.props.setNumber)
  }

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
            onClick={this.handleDeleteClick}
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
