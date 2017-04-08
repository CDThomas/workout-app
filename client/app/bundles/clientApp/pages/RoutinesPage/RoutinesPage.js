import React, { Component } from 'react'
import {
  Heading,
  Panel,
  SearchBar
} from 'clientApp/components'
import { Link } from 'react-router-dom'
import { getRoutines } from 'clientApp/helpers/api'
import './styles.css'

class RoutinesPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      routines: []
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
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
            />
            <span className='RoutinesPage__text'>or</span>
            <Link to='/' className='RoutinesPage__link'>create one</Link>
          </Panel.Header>
          <Panel.List>
            {this.state.routines.map(routine => {
              return (
                <Panel.ListItem key={routine.id}>
                  {routine.name}
                </Panel.ListItem>
              )
            })}
          </Panel.List>
        </Panel>
      </div>
    )
  }
}

export default RoutinesPage
