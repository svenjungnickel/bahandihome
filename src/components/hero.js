import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

const Hero = ({ title, description }) => {
  const {
    heroImage: {
      childImageSharp: { fluid: heroImageSrc },
    },
  } = useStaticQuery(graphql`
    query {
      heroImage: file(relativePath: { eq: "hero.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const titleBox = (
    <div
      style={{ background: 'rgba(0,0,0,0.40)' }}
      className="flex flex-col border-4 border-solid text-white bg-opacity-75 p-8 pl-12 pr-12 text-center leading-none"
    >
      <span className="text-4xl font-extrabold uppercase">{title}</span>
      <span className="text-2xl font-medium mt-2">{description}</span>
    </div>
  )

  return (
    <div style={{ maxHeight: '35rem' }} className="overflow-hidden relative">
      <div className="absolute z-10 w-full h-full">
        <div className="flex h-full w-full items-center justify-center">{titleBox}</div>
      </div>
      <Img style={{ position: 'initial' }} objectFit="cover" fluid={heroImageSrc} />
    </div>
  )
}

Hero.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

Hero.defaultProps = {
  title: 'Only Down',
  description: 'Get down with Down',
}

export { Hero }
