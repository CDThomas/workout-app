import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'clientApp/components'
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
        <nav className='Header__nav'>
          <div className='Header__navLeft'>
            <Link to='/' className='Header__logo'>FA</Link>
          </div>
          <div className='Header__navRight'>
            {auth.isAuthenticated() ? (
              <Link onClick={this.handleLogout} to='/login'>
                <Button>Log Out</Button>
              </Link>
            ) : (
              <Link to='/login'>
                <Button>Log In</Button>
              </Link>
            )}
          </div>
        </nav>
      </header>
    )
  }
}

export default Header
