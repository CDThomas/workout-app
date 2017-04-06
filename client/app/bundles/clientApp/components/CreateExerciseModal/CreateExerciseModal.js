import React, { Component, PropTypes } from 'react'
import CloseIcon from 'react-icons/lib/md/close'
import Modal from 'react-modal'
import {
  Button,
  Field,
  Heading,
  Input,
  Label,
  Message
} from 'clientApp/components'
import { getMuscles, createExercise } from 'clientApp/helpers/api'
import { capitalize } from 'lodash'
import './styles.css'

// TODO: handle exercise edits
// TODO: loading icon and better loading experience
//   - disable inputs and submit button while submitting

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

    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    getMuscles()
      .then((data) => {
        this.setState({
          muscleOptions: data.muscles,
          mainMuscleWorkedId: data.muscles[0].id
        })
      })
      .catch(error => console.warn(error))
  }

  handleRequestClose () {
    // Resest form state
    this.setState({
      errors: [],
      name: '',
      mainMuscleWorkedId: this.state.muscleOptions.length ? this.state.muscleOptions[0].id : null
    })

    // Call cb from parent
    this.props.onRequestClose()
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
        // reset form state
        this.setState({
          errors: [],
          name: '',
          mainMuscleWorkedId: this.state.muscleOptions[0].id
        })

        // Call cb from parent
        this.props.onExerciseCreated(response.exercise)
      })
      .catch(error => {
        const response = error.response
        if (response && response.status === 422) {
          response.json().then(body => {
            this.setState({errors: body.errors})
          })
        } else {
          console.error(error)
        }
      })
      .then(() => this.setState({isSubmitting: false}))
  }

  renderForm () {
    return (
      <form onSubmit={this.handleSubmit}>
        <Field>
          <Label htmlFor='name'>
            Exercise name
          </Label>
          <Input
            type='text'
            name='name'
            placeholder='Ex: Bench press'
            onChange={this.handleInputChange}
            value={this.state.name}
            autoFocus
          />
        </Field>
        <Field>
          <Label htmlFor='mainMuscleWorkedId'>
            Main muscle worked
          </Label>
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
        </Field>

        {this.state.errors.length > 0 && (
          <Message
            error
            header={this.state.errors.length > 1
              ? 'There were some errors with your submission:'
              : 'There was an error with your submission:'}
            list={this.state.errors.map(err => err.message)}
          />
        )}

        <Button type='submit' className='CreateExerciseModal__submitBtn'>
          Create
        </Button>

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
          onRequestClose={this.handleRequestClose}
        >
          <a
            className='CreateExerciseModal__closeBtn'
            onClick={this.handleRequestClose}
          >
            <CloseIcon className='CreateExerciseModal__closeIcon' />
          </a>
          <Heading>
            New Exercise
          </Heading>

          {this.state.muscleOptions.length === 0
            ? <p>Loading...</p>
            : this.renderForm()}
        </Modal>
      </div>
    )
  }
}
CreateExerciseModal.propTypes = propTypes

export default CreateExerciseModal
