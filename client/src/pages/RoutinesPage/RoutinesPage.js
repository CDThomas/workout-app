import React, { Component, PropTypes } from 'react'
import { Heading, Loader, Panel, SearchBar, Title } from 'components'
import { Link } from 'react-router-dom'
import { getRoutines, createRoutine } from 'helpers/api'
import './styles.css'

const propTypes = {
  history: PropTypes.object.isRequired
}

class RoutinesPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      routines: [],
      isLoading: true
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleCreateRoutineClick = this.handleCreateRoutineClick.bind(this)
  }

  componentDidMount () {
    getRoutines()
      .then(({ routines }) => {
        this.setState({
          routines,
          isLoading: false
        })
      })
      .catch(error => console.warn(error))
  }

  handleSearchChange (evt) {
    const query = evt.target.value
    this.setState({ isLoading: true })

    getRoutines(query)
      .then(({ routines }) => {
        this.setState({
          routines,
          isLoading: false
        })
      })
      .catch(error => console.warn(error))
  }

  handleCreateRoutineClick (evt) {
    evt.preventDefault()
    createRoutine()
      .then(({ routine }) => {
        this.props.history.push(`/routines/${routine.id}`)
      })
      .catch(error => console.warn(error))
  }

  renderRoutineList () {
    if (this.state.isLoading) {
      return (
        <div className='RoutinesPage__routineList--empty'>
          <Loader />
        </div>
      )
    }

    return (
      <Panel.List>
        {this.state.routines.map(routine => {
          const { id, name } = routine
          return (
            <Panel.ListItem key={id}>
              <Link to={`/routines/${id}`} className='RoutinesPage__link'>
                <Title>{name}</Title>
              </Link>
            </Panel.ListItem>
          )
        })}
      </Panel.List>
    )
  }

  render () {
    return (
      <div className='RoutinesPage'>
        <Panel>
          <Panel.Header>
            <Heading>Routines</Heading>
            <SearchBar
              className='RoutinesPage__searchBar'
              onChange={this.handleSearchChange}
              placeholder='Find a routine...'
              autoFocus
            />
            <span className='RoutinesPage__text'>or</span>
            <a
              onClick={this.handleCreateRoutineClick}
              className='RoutinesPage__createRoutineLink'
            >
              create one
            </a>
          </Panel.Header>
          {this.renderRoutineList()}
        </Panel>
      </div>
    )
  }
}
RoutinesPage.propTypes = propTypes

export default RoutinesPage
