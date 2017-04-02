import React, { Component, PropTypes } from 'react'
import { SetItem } from 'clientApp/components'
import './styles.css'

const propTypes = {
  sets: PropTypes.array
}

class SetList extends Component {
  render () {
    return (
      <ul className='SetList'>
        {this.props.sets.map((set, i) => {
          return (
            <SetItem {...set} setNumber={i + 1} key={i} />
          )
        })}
      </ul>
    )
  }
}
SetList.propTypes = propTypes

export default SetList
