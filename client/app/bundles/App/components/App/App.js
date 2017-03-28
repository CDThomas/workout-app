import React, { Component, PropTypes } from 'react'
import { RoutineEditor, Header } from 'App/components'
import 'normalize.css'
import './styles.css'

const propTypes = {
  exercises: PropTypes.array // this is passed from the Rails view
}

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <div className='App__content'>
          <RoutineEditor exercises={this.props.exercises} />
        </div>
      </div>
    )
  }
}
App.propTypes = propTypes

export default App
