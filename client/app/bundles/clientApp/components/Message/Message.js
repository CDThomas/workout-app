import React, { PropTypes } from 'react'
import './styles.css'
import classNames from 'classnames'

const messageListPropTypes = {
  list: PropTypes.arrayOf(PropTypes.string)
}

function MessageList (props) {
  return (
    <ul className='Message__list'>
      {props.list.map((item, i) => {
        return (
          <li key={i}>{item}</li>
        )
      })}
    </ul>
  )
}
MessageList.propTypes = messageListPropTypes

const messagePropTypes = {
  // Children and list props are mutually exclusive.
  // Current implemenation doesn't throw an error, but will only render the list if provided
  // TODO: snapshots
  children: PropTypes.node,
  list: PropTypes.arrayOf(PropTypes.string),
  header: PropTypes.string,
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
      {props.header && (
        <div className='Message__header'>{props.header}</div>
      )}

      {props.list
        ? <MessageList list={props.list} />
        : props.children}
    </div>
  )
}
Message.propTypes = messagePropTypes

export default Message
