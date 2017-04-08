import React, { Component, PropTypes } from 'react'
import { Title } from 'clientApp/components'
import './styles.css'
import { capitalize } from 'lodash'

const propTypes = {
  exercise: PropTypes.shape({
    name: PropTypes.string,
    mainMuscleWorked: PropTypes.string
  }),
  onClick: PropTypes.func.isRequired
}

class ExerciseItem extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onClick(this.props.exercise)
  }

  render () {
    const { name, mainMuscleWorked } = this.props.exercise

    return (
      <li className='ExerciseItem' onClick={this.handleClick}>
        <div className='ExerciseItem__thumbnail' />
        <div className='ExerciseItem__content'>
          <Title>{name}</Title>
          <span className='ExerciseItem__mainMuscleWorked'>
            {capitalize(mainMuscleWorked)}
          </span>
        </div>
      </li>
    )
  }
}
ExerciseItem.propTypes = propTypes

export default ExerciseItem
