import React, { PropTypes } from 'react'
import classNames from 'classnames'
import './styles.css'

const { node, func, string, oneOf } = PropTypes
const propTypes = {
  children: node.isRequired,
  onClick: func,
  type: string,
  className: string,
  floated: oneOf(['left', 'right']),
  size: oneOf(['small', 'medium']),
  color: oneOf(['blue', 'white', 'red'])
}

const defaultProps = {
  size: 'medium',
  color: 'blue'
}

function Button (props) {
  const btnClass = classNames(
    'Button',
    `Button--${props.size}`,
    `Button--${props.color}`,
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
Button.defaultProps = defaultProps

export default Button
