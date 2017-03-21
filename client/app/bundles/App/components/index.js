/*
  I'm exporting components from an index file as described here:
  http://stackoverflow.com/questions/34072598/es6-exporting-importing-in-index-file .

  This along with Resolve.alias in my webpack config, this lets me say things like:
  import { MyComponent } from 'App/components'

  The docs for Resolve.alias are here:
  https://webpack.js.org/configuration/resolve/#resolve-alias

  Usually I wouldn't have the path for 'App' in front, but I'll try lining imports up with
  React on Rails's bundles and see how I like it. I'm thinking this should help with clarity,
  but really could just get annoying.
*/

export { default as App } from './App/App'
export { default as ExerciseList } from './ExerciseList/ExerciseList'
export { default as ExerciseItem } from './ExerciseItem/ExerciseItem'
export { default as SearchBar } from './SearchBar/SearchBar'
