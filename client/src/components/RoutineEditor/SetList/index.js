import React, { Component, PropTypes } from 'react'
import { Loader } from 'components'
import SetItem from '../SetItem'
import styled from 'styled-components'
import './styles.css'

const propTypes = {
  sets: PropTypes.array,
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

    return (
      <List>
        {sets.map((set, i) => {
          return (
            <SetItem
              {...set}
              setNumber={i + 1}
              key={i}
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
