import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from 'clientApp/components'
import auth from 'clientApp/helpers/authentication'
import './styles.css'

class PageHeader extends Component {
  constructor (props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout (evt) {
    auth.logout()
  }

  render () {
    return (
      <header className='PageHeader'>
        <nav className='PageHeader__nav'>
          <div className='PageHeader__navLeft'>
            <Link to='/' className='PageHeader__logo'>FA</Link>
            <NavLink
              to='/routines'
              className='PageHeader__navLink'
              activeClassName='PageHeader__navLink--active'
            >
              Routines
            </NavLink>
          </div>
          <div className='PageHeader__navRight'>
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

export default PageHeader
