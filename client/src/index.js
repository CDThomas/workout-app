import React from 'react'
import ReactOnRails from 'react-on-rails'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { AppMain } from 'components'
import { Provider } from 'react-redux'
import { routines, sets } from 'redux/modules'

function rootReducer (state = {}, action) {
  return {
    routines: routines(state.routines, action),
    sets: sets(state.sets, action)
  }
}

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

function FitnessApp () {
  return (
    <Provider store={store}>
      <AppMain />
    </Provider>
  )
}

// Register the app with React on Rails which will handle rendering it
ReactOnRails.register({
  FitnessApp
})
