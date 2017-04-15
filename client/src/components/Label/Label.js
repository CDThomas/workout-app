import React, { PropTypes } from 'react'
import './styles.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string
}

function Label (props) {
  return (
    <label htmlFor={props.htmlFor} className='Label'>
      {props.children}
    </label>
  )
}
Label.propTypes = propTypes

export default Label
