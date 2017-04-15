import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import {
  PageHeader,
  PrivateRoute
} from 'components'
import {
  Login,
  RoutineEditor,
  RoutinesPage
} from 'pages'
import 'normalize.css'
import './styles.css'

class AppMain extends Component {
  render () {
    return (
      <Router>
        <div className='AppMain'>
          <PageHeader />
          <div className='AppMain__content'>
            <Switch>
              <Redirect exact from='/' to='/routines' />
              <PrivateRoute exact path='/routines' component={RoutinesPage} />
            </Switch>
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
