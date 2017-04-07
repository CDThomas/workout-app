import React, { PropTypes } from 'react'
import './styles.css'

const propTypes = {
  children: PropTypes.node.isRequired
}

function Header (props) {
  return (
    <div className='Header'>
      {props.children}
    </div>
  )
}
Header.propTypes = propTypes

export default Header
