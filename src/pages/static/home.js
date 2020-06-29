import React from 'react'
import { Layout, SEO, Tile } from '../../components'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => {
  const {
    allFile: { nodes: placeholderImages },
  } = data

  return (
    <Layout hasHero={true}>
      <SEO title="Home" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5">
        {placeholderImages.map((placeholderImage) => (
          <Tile
            key={placeholderImage.id}
            title="Product Name"
            price={10}
            image={placeholderImage.childImageSharp.fluid}
          />
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const IndexPageQuery = graphql`
  query placeholderImages {
    allFile(filter: { relativeDirectory: { eq: "placeholder" } }) {
      nodes {
        id
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
