import React from 'react'
import styled from 'react-emotion'
import palette from '../../palette'

const Link = styled('a')`
  color: rgba(0,0,0,.7);
  margin: 1rem 0 0 0;
  text-decoration: none;
  display: block;

  &:hover {
    ::after {
      position: relative;
      left: 10px;
      content: "\u21b5";
      font-weight: bold;
      display: inline-block;
      color: ${palette.primary.main};
    }
  }
`

const levels = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
}

export default function (props) {
  const {
    level = 1,
    children,
  } = props

  // Turn headers into linkable IDs
  const text = children[0]
  const itemId = typeof text === 'string'
    ? text
      .toLowerCase()
      .split(' ')
      .join('-')
    : ''

  const Klass = levels[level]
  return (
    <Klass>
      { level <= 2
        ? <Link style={{ color: 'inherit' }} href={`#${itemId}`} id={itemId}>{children}</Link>
        : children }
    </Klass>
  )
}
