import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { RoutineEditor, Header, Login } from 'clientApp/components'
import 'normalize.css'
import './styles.css'

const propTypes = {
  exercises: PropTypes.array // this is passed from the Rails view
}

class AppMain extends Component {
  render () {
    return (
      <Router>
        <div className='AppMain'>
          <Header />
          <div className='AppMain__content'>
            <Route
              exact
              path='/'
              component={() => <RoutineEditor exercises={this.props.exercises} />}
            />
            <Route path='/login' component={Login} />
            {/* TODO: not found route */}
          </div>
        </div>
      </Router>
    )
  }
}
AppMain.propTypes = propTypes

export default AppMain
