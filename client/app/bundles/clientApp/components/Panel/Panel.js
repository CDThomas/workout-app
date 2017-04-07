import React, { PropTypes } from 'react'
import './styles.css'

const propTypes = {
  children: PropTypes.node
}

function Panel (props) {
  return (
    <div className='Panel'>
      {props.children}
    </div>
  )
}
Panel.propTypes = propTypes

export default Panel
