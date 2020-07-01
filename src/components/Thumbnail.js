import React from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

const Thumbnail = ({ src, onClick, active }) => {
  const activeStyle = active ? 'border-gray-900' : 'border-transparent'

  return (
    <button
      className={`cursor-pointer focus:text-black focus:outline-none border-2 border-solid ${activeStyle}`}
      onClick={onClick}
    >
      <Img fluid={src.localFile.childImageSharp.fluid} imgStyle={{ padding: '0.125rem' }} />
    </button>
  )
}

Thumbnail.propTypes = {
  src: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
}

Thumbnail.defaultProps = {
  active: false,
}

export { Thumbnail }
