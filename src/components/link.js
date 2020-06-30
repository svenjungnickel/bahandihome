import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import PropTypes from 'prop-types'

const Link = ({ isButton, url, children, ...props }) => {
  return isButton ? (
    <GatsbyLink
      className="p-2 rounded no-underline font-semibold bg-black text-white text-center hover:bg-gray-800"
      activeClassName="active"
      to={url}
      {...props}
    >
      {children}
    </GatsbyLink>
  ) : (
    <GatsbyLink activeClassName="active" to={url} className="text-current hover:text-gray-800 no" {...props}>
      {children}
    </GatsbyLink>
  )
}

Link.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node,
  isButton: PropTypes.bool,
}
Link.defaultProps = {
  isButton: false,
}

export { Link }
