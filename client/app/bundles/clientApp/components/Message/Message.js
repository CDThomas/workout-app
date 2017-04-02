import React, { PropTypes } from 'react'
import './styles.css'
import classNames from 'classnames'

const propTypes = {
  children: PropTypes.node.isRequired,
  success: PropTypes.bool,
  error: PropTypes.bool
}

function Message (props) {
  const messageClasses = classNames('Message', {
    'Message--success': props.success,
    'Message--error': props.error
  })
  return (
    <div className={messageClasses}>
      {props.children}
    </div>
  )
}
Message.propTypes = propTypes

export default Message
