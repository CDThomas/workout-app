import React, { Component, PropTypes } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from 'clientApp/helpers/authentication'

const propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func
  ]),
  location: PropTypes.object
}

function PrivateRoute ({ component, ...rest }) {
  return (
    <Route {...rest} render={props => {
      if (auth.isAuthenticated()) {
        return React.createElement(component, props)
      }

      return (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
    }} />
  )
}
PrivateRoute.propTypes = propTypes

export default PrivateRoute
