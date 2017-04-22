import React, { Component, PropTypes } from 'react'
import { Loader } from 'components'
import SetItem from '../SetItem'
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

    // Why is map being called here with undefined values??
    return (
      <List>
        {sets.map((set, i) => {
          // Manually setting until implemented on backend
          const setNumber = i + 1
          return (
            <SetItem
              {...set}
              key={set.id}
              setNumber={setNumber}
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
