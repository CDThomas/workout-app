import ReactOnRails from 'react-on-rails'
import { AppMain } from 'components'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { routines } from 'redux/modules'

function rootReducer (state = {}, action) {
  return {
    routines: routines(state.routines, action)
  }
}

const store = createStore(rootReducer)

// Register the app with React on Rails which will handle rendering it
ReactOnRails.register({
  AppMain
})
