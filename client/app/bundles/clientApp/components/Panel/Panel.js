import React, { PropTypes } from 'react'
import './styles.css'

// This feels like two separate components that I'm trying to combime into one.
// A panel is prob different from my container for lists.

// I'm thinking that Item can be it's own component, and probably list, too
// Item might have a title, subtext, thumbnail, etc
// How to handle controls? I'll let it sit for now and see if a pattern shows up

const { node, string } = PropTypes

function Panel (props) {
  // NOTE: a className via props will replace the default className
  //       if provided. This is different from the other components
  //       that take a classname. I did this because width from Panel
  //       was overriding width from ExercisePanel (from props), which
  //       is the opposite of what I wanted. I don't really like this
  //       solution (inconsistent), so I'll look into it.
  //       Styled components has a solution: https://github.com/styled-components/styled-components#overriding-component-styles
  const panelClass = props.className
    ? props.className
    : 'Panel'

  return (
    <div className={panelClass}>
      {props.children}
    </div>
  )
}
Panel.propTypes = {
  children: node,
  className: string
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
