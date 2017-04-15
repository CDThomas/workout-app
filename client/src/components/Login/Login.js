import React, { Component, PropTypes } from 'react'
import {
  Panel,
  Header,
  Heading,
  Field,
  Label,
  Input,
  Button,
  Message
} from 'components'
import auth from 'helpers/authentication'
import './styles.css'

// TODO: handle referrer
// - send back to where they came from if redirected from another page
// - give some feedback like "You must be logged in to see that"

const propTypes = {
  history: PropTypes.object
}

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      errors: []
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    const { email, password } = this.state
    if (email && password) {
      auth.login(this.state.email, this.state.password)
        .then(({ jwt }) => {
          auth.finishAuth(jwt)
          this.props.history.push('/')
        })
        .catch(error => {
          const { response } = error
          if (response && response.status === 404) {
            this.setState({
              errors: ['Invalid email or password']
            })
          } else {
            console.warn(error)
          }
        })
    }
  }

  render () {
    return (
      <div className='Login'>
        <Panel>
          <Panel.Header>
            <Heading>Log In</Heading>
          </Panel.Header>
          <Panel.Content>
            <form onSubmit={this.handleSubmit}>
              <Field>
                <Label htmlFor='email'>Email</Label>
                <Input
                  type='text'
                  name='email'
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  autoFocus
                />
              </Field>
              <Field>
                <Label htmlFor='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </Field>
              {this.state.errors.length > 0 && (
                <Message
                  error
                  header={this.state.errors.length > 1
                    ? 'There were some errors with your submission:'
                    : 'There was an error with your submission:'}
                  list={this.state.errors}
                />
              )}
              <Button type='submit' floated='right'>
                Submit
              </Button>
            </form>
          </Panel.Content>
        </Panel>
      </div>
    )
  }
}
Login.propTypes = propTypes

export default Login
