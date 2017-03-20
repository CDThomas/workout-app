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
- [x] serialize data for the FE
  - Because snake case in JS annoys me and leads to inconsitency/bugs. And the linter yells at me.
  - And because exercise names have underscores in them (like lower_back)
- [ ] add search to exercises
  - [ ] API get endpoint that supports query param
  - [ ] search UI
  - [ ] pagination BE
  - [ ] pagination FE (infinate scroll or "load more")
- [ ] add authentication
  - [Knock](https://github.com/nsarno/knock) looks like a good start. Can roll my own later if I want.
- [ ] add routines and sets to db/models
- [ ] click exercise on left to add to sets on right
- [ ] drag and drop sets
- [ ] webpack optimization stuff
  - lodash
- [ ] add autoprefixer
