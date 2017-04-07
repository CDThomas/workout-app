import React, { Component } from 'react'
import {
  Header,
  Heading,
  Panel
} from 'clientApp/components'
import './styles.css'

const routines = [
  {
    id: 1,
    name: 'Upper A'
  },
  {
    id: 2,
    name: 'Upper B'
  },
  {
    id: 3,
    name: 'Lower A'
  },
  {
    id: 4,
    name: 'Lower B'
  }
]

class RoutinesPage extends Component {
  render () {
    return (
      <div className='RoutinesPage'>
        <Panel>
          <Panel.Header>
            <Heading>Routines</Heading>
          </Panel.Header>
          <Panel.List>
            {routines.map(routine => {
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
