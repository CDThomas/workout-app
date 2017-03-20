import React, { Component, PropTypes } from 'react'
import SearchIcon from 'react-icons/lib/md/search'
import classNames from 'classnames'
import './styles.css'

const propTypes = {
  className: PropTypes.string
}

class SearchBar extends Component {
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
          placeholder='Find an exercise...'
        />
        <SearchIcon className='SearchBar__icon' />
      </form>
    )
  }
}
SearchBar.propTypes = propTypes

export default SearchBar
