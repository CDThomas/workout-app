import React, { PropTypes } from 'react'
import './styles.css'
// Consider doing something like: https://react.semantic-ui.com/elements/header#header-example-page

const propTypes = {
  children: PropTypes.node.isRequired
}

function Heading (props) {
  return (
    <div className='Heading'>
      {props.children}
    </div>
  )
}
Heading.propTypes = propTypes

export default Heading
