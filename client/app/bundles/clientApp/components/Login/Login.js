import React, { Component, PropTypes } from 'react'
import { Panel, Heading, Field, Label, Input, Button } from 'clientApp/components'
import auth from 'clientApp/helpers/authentication'
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
      password: ''
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
        .catch(error => console.warn(error))
    }
    // TODO: handle client-side validation errors (no email or password)
  }

  render () {
    return (
      <Panel>
        <Heading>Log In</Heading>
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
          <Button type='submit' floated='right'>
            Submit
          </Button>
        </form>
      </Panel>
    )
  }
}
Login.propTypes = propTypes

export default Login
