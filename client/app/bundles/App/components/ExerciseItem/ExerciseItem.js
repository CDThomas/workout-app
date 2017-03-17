import React, { Component, PropTypes } from 'react'

const propTypes = {
  name: PropTypes.string
}

class ExerciseItem extends Component {
  render () {
    const { name } = this.props

    return (
      <li>
        <h2>{name}</h2>
      </li>
    )
  }
}
ExerciseItem.propTypes = propTypes

export default ExerciseItem
