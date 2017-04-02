import React, { Component, PropTypes } from 'react'
import { RoutineEditor, Header } from 'clientApp/components'
import 'normalize.css'
import './styles.css'

const propTypes = {
  exercises: PropTypes.array // this is passed from the Rails view
}

class AppMain extends Component {
  render () {
    return (
      <div className='AppMain'>
        <Header />
        <div className='AppMain__content'>
          <RoutineEditor exercises={this.props.exercises} />
        </div>
      </div>
    )
  }
}
AppMain.propTypes = propTypes

export default AppMain
