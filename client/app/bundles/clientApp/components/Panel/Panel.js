import React, { PropTypes } from 'react'
import './styles.css'

const { node } = PropTypes

function Panel (props) {
  return (
    <div className='Panel'>
      {props.children}
    </div>
  )
}
Panel.propTypes = {
  children: node
}

function Header (props) {
  return (
    <div className='Panel__header'>
      {props.children}
    </div>
  )
}
Header.propTypes = {
  children: node
}

function Content (props) {
  return (
    <div className='Panel__content'>
      {props.children}
    </div>
  )
}
Content.propTypes = {
  children: node
}

function List (props) {
  return (
    <ul className='Panel__list'>
      {props.children}
    </ul>
  )
}
List.propTypes = {
  children: node
}

function ListItem (props) {
  return (
    <li className='Panel__listItem'>
      {props.children}
    </li>
  )
}
ListItem.propTypes = {
  children: node
}

Panel.Header = Header
Panel.Content = Content
Panel.List = List
Panel.ListItem = ListItem
export default Panel
