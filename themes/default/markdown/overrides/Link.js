import React from 'react'
import { Link } from 'react-router-dom'

export default function (props) {
  const { href, children, ...rest } = props
  const isExternal = /^https?:\/\//.test(href)

  if (isExternal) {
    return <a {...props} target="_blank">{children}</a>
  } else if (!href) {
    return <a {...props}>{children}</a>
  } else {
    return <Link {...rest} to={href}>{children}</Link>
  }
}
