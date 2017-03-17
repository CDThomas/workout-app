import React, { Component, PropTypes } from 'react'
import './styles.css'

const propTypes = {
  name: PropTypes.string
}

class ExerciseItem extends Component {
  render () {
    const { name } = this.props

    return (
      <li className='ExerciseItem'>
        <span className='ExerciseItem__name'>{name}</span>
      </li>
    )
  }
}
ExerciseItem.propTypes = propTypes

export default ExerciseItem
