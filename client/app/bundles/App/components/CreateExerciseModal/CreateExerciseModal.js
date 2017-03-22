import React, { Component, PropTypes } from 'react'
import CloseIcon from 'react-icons/lib/md/close'
import Modal from 'react-modal'
import './styles.css'

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func
}

class CreateExerciseModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      muscleOptions: [
        'Chest',
        'Back',
        'Biceps',
        'Triceps',
        'Shoulders'
      ]
    }
  }
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
          <div className='CreateExerciseModal__heading'>
            New Exercise
          </div>
          <form>
            <div className='CreateExerciseModal__field'>
              <label htmlFor='name' className='CreateExerciseModal__label'>
                Exercise name
              </label>
              <input
                type='text'
                className='CreateExerciseModal__textInput'
                placeholder='Ex: Bench press'
              />
            </div>
            <div className='CreateExerciseModal__field'>
              <label htmlFor='mainMuscleWorked' className='CreateExerciseModal__label'>
                Main muscle worked
              </label>
              <select name='mainMuscleWorked' className='CreateExerciseModal__select'>
                {this.state.muscleOptions.map((option, i) => {
                  return (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  )
                })}
              </select>
            </div>
          </form>
        </Modal>
      </div>
    )
  }
}
CreateExerciseModal.propTypes = propTypes

export default CreateExerciseModal
