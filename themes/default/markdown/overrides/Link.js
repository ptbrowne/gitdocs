import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const absoluteLinkRx = /^https?:\/\//

export default function (props) {
  const { href, children, ...rest } = props
  const isExternal = absoluteLinkRx.test(href)

  if (isExternal) {
    return <a {...props} target="_blank">{children}</a>
  } else if (!href) {
    return <a {...props}>{children}</a>
  } else if (href.startsWith('#')) {
    // We need to go around a bug in react-router
    return <HashLink {...props} to={href}>{ children }</HashLink>
  }

  // If the href is an internal link, we need to go up one level since
  // the routing adds a slash to the pages
  return <Link {...rest} to={`../${href}`}>{children}</Link>
}
