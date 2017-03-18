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
        <div className='ExerciseItem__thumbnail' />
        <div className='ExerciseItem__content'>
          <span className='ExerciseItem__name'>{name}</span>
          <span className='ExerciseItem__musclesTargeted'>Placeholder text</span>
        </div>
      </li>
    )
  }
}
ExerciseItem.propTypes = propTypes

export default ExerciseItem
