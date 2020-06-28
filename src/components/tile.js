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
    <div className="max-w-xs p-3 flex flex-col">
      <Link url={`/product/${slug}`} className="relative hover:opacity-75">
        <Img fluid={imageSrc} />
      </Link>
      <h2 className="mt-4 text-2xl">{title}</h2>
      <span className="text-2xl mb-2">${price.toFixed(2)}</span>
      <Link url={`/product/${slug}`} isButton>
        View
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
