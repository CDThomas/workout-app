import React, { Component, PropTypes } from 'react'
import auth from 'clientApp/helpers/authentication'
import './styles.css'

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
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='email'
          value={this.state.email}
          onChange={this.handleInputChange}
          autoFocus
        />
        <input
          type='password'
          name='password'
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
Login.propTypes = propTypes

export default Login
