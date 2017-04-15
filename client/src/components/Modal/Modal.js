import React, { PropTypes } from 'react'
import ReactModal from 'react-modal'
import './styles.css'

const propTypes = {
  children: PropTypes.node.isRequired
}

function Modal (props) {
  return (
    <ReactModal
      className='Modal'
      overlayClassName='Modal__overlay'
      {...props}
    >
      {props.children}
    </ReactModal>
  )
}
Modal.propTypes = propTypes

export default Modal
