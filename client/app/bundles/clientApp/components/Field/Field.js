import React, { PropTypes } from 'react'
import './styles.css'
// This would be a good place to conditionally display error/success
// messages. For now, it's just a wrapper for inputs/labels

const propTypes = {
  children: PropTypes.node.isRequired
}

function Field (props) {
  return (
    <div className='Field'>
      {props.children}
    </div>
  )
}
Field.propTypes = propTypes

export default Field
