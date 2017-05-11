import React, { Component, PropTypes } from 'react'
import { Loader } from 'components'
import SetItem from './SetItem'
import styled from 'styled-components'

const propTypes = {
  sets: PropTypes.array.isRequired,
  onDeleteSetClick: PropTypes.func,
  isLoading: PropTypes.bool
}

const List = styled.ul`
  width: 100%;
`

const Wrapper = styled.div`
  position: relative;
  padding-top: 150px;
`

class SetList extends Component {
  render () {
    const { sets, onDeleteSetClick, isLoading } = this.props

    if (isLoading) {
      return (
        <Wrapper>
          <Loader />
        </Wrapper>
      )
    }

    const sortedBySetNumber = sets.sort((a, b) => a.setNumber - b.setNumber)
    return (
      <List>
        {sortedBySetNumber.map((set, i) => {
          return (
            <SetItem
              {...set}
              key={set.id}
              setNumber={set.setNumber}
              onDeleteClick={onDeleteSetClick}
            />
          )
        })}
      </List>
    )
  }
}
SetList.propTypes = propTypes

export default SetList
