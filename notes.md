# Notes

## Todo
- [x] simple seed exercises
- [x] simple exercise list UI
- [x] add eslint
- [x] basic style improvements for UI (think Product Hunt)
  - Might use CSS modules (can reference ducker webpack config)
- [x] placeholder for exercise thumbnail in UI
- [x] add main muscle worked to exercises
  - this is simpler than going with muscles targeted (many to many)
  - starting here and can change later if I really need to support multiple (start simple and
    move to complex)
  - changed from enum to a one-to-many association
- [x] serialize data for the FE
  - Because snake case in JS annoys me and leads to inconsitency/bugs. And the linter yells at me.
  - And because exercise names have underscores in them (like lower_back)
- [x] add search to exercises
  - [x] API get endpoint that supports query param
  - [x] search UI
- [x] user can create new exercises
  - I'm thinking there should be an "add new" button that pulls up a modal
  - This lets the user stay in the context of creating the routine (don't have to leave the routine
    creation page to add new exercises for that routine)
  - [x] form in UI
    - will need to load muscle group options from BE
  - [x] API endpoints
    - [x] POST /exercises
    - [x] GET /muscles
- [x] search on `main_mucle_worked` as well as `name`
- [ ] something to make it more obvious that the newly created exercise is at the top of the list
      would be helpful. Maybe animate it or highlight it?
  - sliding the new exercise in after the modal has closed sounds like a good option
  - or I could just apply a generally animation to the list for things being added/removed, and this
    could handle itself. The only other time this animation would fire is during search though.
- [ ] Better error handling
- [ ] Handle empty list state in ExerciseList
- [ ] Add tests for more than just models
- [ ] paginate exercises
  - [ ] pagination BE
  - [ ] pagination FE (infinate scroll or "load more")
- [ ] animate search on the exercise list? eh?
- [ ] add authentication
  - [Knock](https://github.com/nsarno/knock) looks like a good start. Can roll my own later if I want.
- [ ] add routines and sets to db/models
- [ ] click exercise on left to add to sets on right
- [ ] drag and drop sets
- [ ] add images to exercises
  - I'm thinking google cloud storage because it'd be free
  - can use carrierwave/fog
  - or paperclip/fog
  - or cloudinary
- [ ] webpack optimization stuff
  - lodash
- [ ] add autoprefixer
- readme
  - [ ] .env
  - [ ] startup
