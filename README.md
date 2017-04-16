# 💪🏼

## Structure

Still deciding how to handle this for the React app (in `/client`).

Right now it's organized mostly by file type:
```
src/
  components/
  config/
  helpers/
  pages/
  startup/
```

The exception to this is style files, which are co-located with the component that they apply to.
I like co-location, so I might organize files by feature after the app grows.

Relevant links:
* https://github.com/markerikson/react-redux-links/blob/master/project-structure.md
* https://tech.okcupid.com/how-okcupid-organizes-its-multi-page-react-app/
* http://engineering.kapost.com/2016/01/organizing-large-react-applications/
* https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346
* Leaning toward: https://jaysoo.ca/2016/02/28/organizing-redux-application/

For reference when I revisit this, it could look like:

```
src/
  Main/
    components/
      NavBar/
    index.js
    rootReducer.js
    styles.css
  RoutineFinder/
    index.js
    actions.js
    reducers.js
    styles.css
  RoutineEditor/
    ExercisePanel/
    SetList/
    index.js
    styles.css
  Login/
  shared/
    Title/
    Modal/
    Button/
    ...
```

## Dependencies

### React App

Dependencies for the React app are in `/client/package.json`

Dependencies required for a production build are under `"dependencies"`.This includes Webpack and loader-related dependencies used in the production build.

Dependencies only required for development are under `"devDependencies"`. This includes Dotenv (for handling environment variables in development) and linter-related dependencies.

Why:
* Including Webpack and loader-related dependencies in `"dependencies"` prevents dependencies from being skipped during `NODE_ENV=production yarn install`
* Including dependencies not needed for a production build in `"devDependencies"` speeds up build times for deployments and CI
