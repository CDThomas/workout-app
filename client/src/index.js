import React from 'react'
import ReactOnRails from 'react-on-rails'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { AppMain } from 'components'
import { Provider } from 'react-redux'
import { routines, sets, unsavedSets } from 'redux/modules'

function rootReducer (state = {}, action) {
  return {
    routines: routines(state.routines, action),
    sets: sets(state.sets, action),
    unsavedSets: unsavedSets(state.unsavedSets, action)
  }
}

const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

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
