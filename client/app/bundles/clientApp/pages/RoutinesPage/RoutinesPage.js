import React, { Component, PropTypes } from 'react'
import {
  Heading,
  Panel,
  SearchBar,
  Title
} from 'clientApp/components'
import { Link } from 'react-router-dom'
import { getRoutines, createRoutine } from 'clientApp/helpers/api'
import './styles.css'

const propTypes = {
  history: PropTypes.object.isRequired
}

class RoutinesPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      routines: []
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleCreateRoutineClick = this.handleCreateRoutineClick.bind(this)
  }

  componentDidMount () {
    getRoutines()
      .then(({ routines }) => {
        this.setState({ routines })
      })
      .catch(error => console.warn(error))
  }

  handleSearchChange (evt) {
    const query = evt.target.value
    getRoutines(query)
      .then(({routines}) => {
        this.setState({ routines })
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
            <a onClick={this.handleCreateRoutineClick} className='RoutinesPage__createRoutineLink'>
              create one
            </a>
          </Panel.Header>
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
        </Panel>
      </div>
    )
  }
}
RoutinesPage.propTypes = propTypes

export default RoutinesPage
