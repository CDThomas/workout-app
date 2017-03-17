import React, { Component, PropTypes } from 'react'
import ExerciseList from './ExerciseList'

const propTypes = {
  exercises: PropTypes.array // this is passed from the Rails view
}

class App extends Component {
  render () {
    return (
      <div>
        <ExerciseList exercises={this.props.exercises} />
      </div>
    )
  }
}
App.propTypes = propTypes

export default App
