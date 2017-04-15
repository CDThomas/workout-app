import React, { Component, PropTypes } from 'react'
import SearchIcon from 'react-icons/lib/md/search'
import classNames from 'classnames'
import './styles.css'

const { string, func, bool } = PropTypes
const propTypes = {
  className: string,
  onChange: func,
  placeholder: string,
  autoFocus: bool
}

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (evt) {
    this.props.onChange && this.props.onChange(evt)
  }

  handleSubmit (evt) {
    // Prevent a page refresh, but don't do anything else
    evt.preventDefault()
  }

  render () {
    const { className, placeholder, autoFocus } = this.props
    const searchBarClass = classNames(
      'SearchBar',
      className
    )

    return (
      <form className={searchBarClass} onSubmit={this.handleSubmit} >
        <input
          type='text'
          className='SearchBar__input'
          placeholder={placeholder}
          onChange={this.handleChange}
          autoFocus={autoFocus}
        />
        <SearchIcon className='SearchBar__icon' />
      </form>
    )
  }
}
SearchBar.propTypes = propTypes

export default SearchBar
