import React, { PropTypes } from 'react'
import './styles.css'

const propTypes = {
  children: PropTypes.node
}

function Title (props) {
  return (
    <span className='Title'>
      {props.children}
    </span>
  )
}
Title.propTypes = propTypes

export default Title
