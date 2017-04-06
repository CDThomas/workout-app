/*
  I'm exporting components from an index file as described here:
  http://stackoverflow.com/questions/34072598/es6-exporting-importing-in-index-file .

  This along with Resolve.alias in my webpack config, this lets me say things like:
  import { MyComponent } from 'clientApp/components'

  The docs for Resolve.alias are here:
  https://webpack.js.org/configuration/resolve/#resolve-alias

  Usually I wouldn't have the path for 'App' in front, but I'll try lining imports up with
  React on Rails's bundles and see how I like it. I'm thinking this should help with clarity,
  but really could just get annoying.
*/

export { default as AppMain } from './AppMain/AppMain'
export { default as Button } from './Button/Button'
export { default as CreateExerciseModal } from './CreateExerciseModal/CreateExerciseModal'
export { default as ExerciseItem } from './ExerciseItem/ExerciseItem'
export { default as ExerciseList } from './ExerciseList/ExerciseList'
export { default as ExercisePanel } from './ExercisePanel/ExercisePanel'
export { default as Header } from './Header/Header'
export { default as Login } from './Login/Login'
export { default as Message } from './Message/Message'
export { default as RoutineEditor } from './RoutineEditor/RoutineEditor'
export { default as SearchBar } from './SearchBar/SearchBar'
export { default as SetItem } from './SetItem/SetItem'
export { default as SetList } from './SetList/SetList'
