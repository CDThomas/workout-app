import React, { PropTypes } from 'react'
import classNames from 'classnames'
import './styles.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string
}

function Button (props) {
  const btnClass = classNames(
    'Button',
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
