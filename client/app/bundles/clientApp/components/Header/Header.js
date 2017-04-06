import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

function Header () {
  return (
    <header className='Header'>
      <Link to='/'>FAF</Link>
      <Link to='/login'>Login</Link>
    </header>
  )
}

export default Header
