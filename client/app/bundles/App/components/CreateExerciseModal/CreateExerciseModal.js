import React, { Component, PropTypes } from 'react'
import CloseIcon from 'react-icons/lib/md/close'
import Modal from 'react-modal'
import './styles.css'

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func
}

class CreateExerciseModal extends Component {
  render () {
    return (
      <div>
        <Modal
          className='CreateExerciseModal'
          overlayClassName='CreateExerciseModal__overlay'
          isOpen={this.props.isOpen}
          contentLabel='Modal'
          onRequestClose={this.props.onRequestClose}
        >
          <a
            className='CreateExerciseModal__closeBtn'
            onClick={this.props.onRequestClose}
          >
            <CloseIcon className='CreateExerciseModal__closeIcon' />
          </a>
          <h1>Hi!</h1>
          <p>The form will go here 😄</p>
        </Modal>
      </div>
    )
  }
}
CreateExerciseModal.propTypes = propTypes

export default CreateExerciseModal
