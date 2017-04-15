import React, { PropTypes } from 'react'
import classNames from 'classnames'
import './styles.css'

const { node, func, string, oneOf, bool } = PropTypes
const propTypes = {
  children: node.isRequired,
  onClick: func,
  // type: string,
  disabled: bool,
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
    { 'Button--disabled': props.disabled },
    props.className
  )

  return (
    <button
      {...props}
      onClick={props.onClick}
      className={btnClass}
    >
      {props.children}
    </button>
  )
}
Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Button
