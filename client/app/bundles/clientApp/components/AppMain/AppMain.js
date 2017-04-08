import React, { Component } from 'react'
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
              component={RoutineEditor}
            />
            <PrivateRoute exact path='/routines' component={RoutinesPage} />
            <PrivateRoute
              path='/routines/:id'
              component={RoutineEditor}
            />
            <Route path='/login' component={Login} />
            {/* TODO: not found route */}
          </div>
        </div>
      </Router>
    )
  }
}

export default AppMain
