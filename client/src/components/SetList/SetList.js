import React, { Component, PropTypes } from 'react'
import { SetItem } from 'clientApp/components'
import './styles.css'

const propTypes = {
  sets: PropTypes.array,
  onDeleteSetClick: PropTypes.func
}

class SetList extends Component {
  render () {
    const { sets, onDeleteSetClick } = this.props

    return (
      <ul className='SetList'>
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
      </ul>
    )
  }
}
SetList.propTypes = propTypes

export default SetList
