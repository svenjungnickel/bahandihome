import React from 'react'
import Img from 'gatsby-image'

export const Thumbnail = ({ src, onClick }) => {
  return (
    <button
      className="cursor-pointer border border-solid border-gray-900 p-1 focus:text-black focus:outline-none"
      onClick={onClick}
    >
      <Img fluid={src.localFile.childImageSharp.fluid} />
    </button>
  )
}
