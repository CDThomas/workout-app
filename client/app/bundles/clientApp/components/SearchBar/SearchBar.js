import React, { Component, PropTypes } from 'react'
import SearchIcon from 'react-icons/lib/md/search'
import classNames from 'classnames'
import './styles.css'

const { string, func } = PropTypes
const propTypes = {
  className: string,
  onChange: func,
  placeholder: string
}

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (evt) {
    this.props.onChange && this.props.onChange(evt)
  }

  render () {
    const searchBarClass = classNames(
      'SearchBar',
      this.props.className
    )

    return (
      <form className={searchBarClass} >
        <input
          type='text'
          className='SearchBar__input'
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
        />
        <SearchIcon className='SearchBar__icon' />
      </form>
    )
  }
}
SearchBar.propTypes = propTypes

export default SearchBar
