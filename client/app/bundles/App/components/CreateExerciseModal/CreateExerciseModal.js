import React, { Component, PropTypes } from 'react'
import CloseIcon from 'react-icons/lib/md/close'
import Modal from 'react-modal'
import { getMuscles, createExercise } from 'App/helpers/api'
import { capitalize } from 'lodash'
import './styles.css'

// TODO: handle submit success
// TODO: better error handling
// TODO: refactor. this is getting cray

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func
}

class CreateExerciseModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      muscleOptions: [],
      name: '',
      mainMuscleWorked: null,
      errors: []
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
    createExercise({ name, mainMuscleWorkedId })
      .then(response => {
        if (response.errors) {
          this.setState({errors: response.errors})
        } else {
          this.setState({errors: []})
          console.log(response)
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
          />
        </div>
        <div className='CreateExerciseModal__field'>
          <label htmlFor='mainMuscleWorked' className='CreateExerciseModal__label'>
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
