import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import auth from 'clientApp/helpers/authentication'
import './styles.css'

class Header extends Component {
  constructor (props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout (evt) {
    auth.logout()
  }

  render () {
    return (
      <header className='Header'>
        <Link to='/'>FAF</Link>
        {auth.isAuthenticated
          ? <Link onClick={this.handleLogout} to='/login'>Logout</Link>
          : <Link to='/login'>Login</Link>}
      </header>
    )
  }
}

export default Header
