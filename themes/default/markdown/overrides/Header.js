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

const slugify = text => text
  .toLowerCase()
  .replace(/[^a-z -]/g, '')
  .split(' ')
  .join('-')

const asText = child => {
  if (typeof child === 'string') {
    return child
  } else if (typeof child.props.children === 'string') {
    return child.props.children
  }
  return collectText(child.props.children)
}

const collectText = children => {
  return Array.from(children).filter(Boolean).map(asText).join(' ')
}

export default function (props) {
  const {
    level = 1,
    children,
  } = props

  // Turn headers into linkable IDs
  const text = collectText(children)
  const itemId = slugify(text)

  const Klass = levels[level]
  return (
    <Klass>
      { level <= 4
        ? <Link style={{ color: 'inherit' }} href={`#${itemId}`} id={itemId}>{children}</Link>
        : children }
    </Klass>
  )
}
