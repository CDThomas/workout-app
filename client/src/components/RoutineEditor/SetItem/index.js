import React, { Component, PropTypes } from 'react'
import { Title, Button } from 'components'
import styled from 'styled-components'

const { string, number, func, oneOfType } = PropTypes

const propTypes = {
  exerciseName: string.isRequired,
  mainMuscleWorked: string.isRequired,
  // TODO: make this always a string (UUID)
  // right now only ID's for unsaved routines are strings
  id: oneOfType([number, string]).isRequired,
  routineId: number.isRequired,
  setNumber: number.isRequired,
  onDeleteClick: func.isRequired
}

const ListItem = styled.li`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 10px;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
  display: flex;
  flex-direction: column;
`

const BottomRow = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MainMuscleWorked = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.3px;
  color: #999;
`

class SetItem extends Component {
  constructor (props) {
    super(props)

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleDeleteClick () {
    this.props.onDeleteClick(this.props.id, this.props.routineId)
  }

  render () {
    const { exerciseName, mainMuscleWorked, setNumber } = this.props
    return (
      <ListItem>
        <Title>
          <span>{setNumber}. </span>
          <span>{exerciseName}</span>
        </Title>
        <BottomRow>
          <MainMuscleWorked>
            {mainMuscleWorked}
          </MainMuscleWorked>
          <Button size='small' color='white' onClick={this.handleDeleteClick}>
            Delete
          </Button>
        </BottomRow>
      </ListItem>
    )
  }
}
SetItem.propTypes = propTypes

export default SetItem
