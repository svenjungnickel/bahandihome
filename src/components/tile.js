import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from './link'

const Tile = ({ title, slug, price, image }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "placeholder/shoe.png" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const imageSrc = image ? image : data.placeholderImage.childImageSharp.fluid

  return (
    <div className="w-full p-3 flex flex-col m-auto sm:m-0">
      <Link url={`/product/${slug}`} className="relative hover:opacity-75 no-underline">
        <Img fluid={imageSrc} />
        <h2 className="mt-4 text-xl font-semibold">{title}</h2>
        <span className="mb-2">${price.toFixed(2)}</span>
      </Link>
    </div>
  )
}

Tile.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.object,
}

Tile.defaultProps = {
  title: "Men's Down Jacket",
  price: '50',
}

export { Tile }
