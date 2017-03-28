import React, { Component, PropTypes } from 'react'
import CloseIcon from 'react-icons/lib/md/close'
import Modal from 'react-modal'
import { getMuscles, createExercise } from 'clientApp/helpers/api'
import { capitalize } from 'lodash'
import './styles.css'

// TODO: better error handling
// TODO: loading icon and better loading experience
//   - disable inputs and submit button while submitting
// TODO: refactor. this is getting cray
//   - container and display
//   - pull buttons, labels, title, etc into re-usable components
// TODO: clear state on close
// TODO: handle exercise edits

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onExerciseCreated: PropTypes.func.isRequired
}

class CreateExerciseModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      muscleOptions: [],
      name: '',
      mainMuscleWorkedId: null,
      errors: [],
      isSubmitting: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    getMuscles().then((data) => {
      this.setState({
        muscleOptions: data.muscles,
        mainMuscleWorkedId: data.muscles[0].id
      })
    })
  }

  handleInputChange (evt) {
    const newState = {}
    newState[evt.target.name] = evt.target.value
    this.setState(newState)
  }

  handleSubmit (evt) {
    evt.preventDefault()
    const { name, mainMuscleWorkedId } = this.state
    this.setState({ isSubmitting: true })

    createExercise({ name, mainMuscleWorkedId })
      .then(response => {
        this.setState({ isSubmitting: false })

        if (response.errors) {
          this.setState({errors: response.errors})
        } else {
          // reset form state
          this.setState({
            errors: [],
            name: '',
            mainMuscleWorkedId: this.state.muscleOptions[0].id
          })

          // Call cb from parent
          this.props.onExerciseCreated(response.exercise)
        }
      })
  }

  renderForm () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='CreateExerciseModal__field'>
          <label htmlFor='name' className='CreateExerciseModal__label'>
            Exercise name
          </label>
          <input
            type='text'
            name='name'
            className='CreateExerciseModal__textInput'
            placeholder='Ex: Bench press'
            onChange={this.handleInputChange}
            value={this.state.name}
            autoFocus
          />
        </div>
        <div className='CreateExerciseModal__field'>
          <label htmlFor='mainMuscleWorkedId' className='CreateExerciseModal__label'>
            Main muscle worked
          </label>
          <select
            name='mainMuscleWorkedId'
            className='CreateExerciseModal__select'
            onChange={this.handleInputChange}
            value={this.state.mainMuscleWorkedId}
          >
            {this.state.muscleOptions.map((muscle) => {
              const { id, name } = muscle
              return (
                <option key={id} value={id}>
                  {capitalize(name)}
                </option>
              )
            })}
          </select>
        </div>
        <button className='CreateExerciseModal__submitBtn' type='submit'>
          Create
        </button>
      </form>
    )
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
          {this.state.muscleOptions.length === 0
            ? <p>Loading...</p>
            : this.renderForm()}
          {this.state.errors.length === 0
            ? null
            : <pre><code>
              {JSON.stringify(this.state.errors, null, 4)}
            </code></pre>}
        </Modal>
      </div>
    )
  }
}
CreateExerciseModal.propTypes = propTypes

export default CreateExerciseModal
