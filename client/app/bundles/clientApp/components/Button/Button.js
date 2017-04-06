import React, { PropTypes } from 'react'
import classNames from 'classnames'
import './styles.css'

const { node, func, string, oneOf } = PropTypes
const propTypes = {
  children: node.isRequired,
  onClick: func,
  type: string,
  className: string,
  floated: oneOf(['left', 'right'])
}

function Button (props) {
  const btnClass = classNames(
    'Button',
    { 'Button--floatedLeft': props.floated === 'left' },
    { 'Button--floatedRight': props.floated === 'right' },
    props.className
  )

  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={btnClass}
    >
      {props.children}
    </button>
  )
}
Button.propTypes = propTypes

export default Button
