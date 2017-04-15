import React, { Component, PropTypes } from 'react'
import './styles.css'

const { string, func, bool, number, oneOfType } = PropTypes

// Must be a controlled input. Might change this
const propTypes = {
  onChange: func.isRequired,
  value: oneOfType([string, number]).isRequired,
  type: string,
  name: string,
  placeholder: string,
  autoFocus: bool
}

const defaultProps = {
  type: 'text',
  autoFocus: false
}

class Input extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  render () {
    const {
      type,
      name,
      placeholder,
      onChange,
      value,
      autoFocus
    } = this.props

    return (
      <input
        className='Input'
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    )
  }
}
Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default Input
