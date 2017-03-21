import React, { Component, PropTypes } from 'react'
import SearchIcon from 'react-icons/lib/md/search'
import classNames from 'classnames'
import './styles.css'

const propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func
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
          placeholder='Find an exercise...'
          onChange={this.handleChange}
        />
        <SearchIcon className='SearchBar__icon' />
      </form>
    )
  }
}
SearchBar.propTypes = propTypes

export default SearchBar
