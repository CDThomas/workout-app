import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {
  RoutineEditor,
  PageHeader,
  Login,
  PrivateRoute
} from 'clientApp/components'
import {
  RoutinesPage
} from 'clientApp/pages'
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
          <PageHeader />
          <div className='AppMain__content'>
            <PrivateRoute
              exact
              path='/'
              component={() => <RoutineEditor exercises={this.props.exercises} />}
            />
            <PrivateRoute path='/routines' component={RoutinesPage} />
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
