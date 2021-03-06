import React from 'react'
import { Layout, SEO, Tile } from 'components'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => {
  const {
    allShopifyProduct: { nodes: products },
  } = data

  return (
    <Layout hasHero={true}>
      <SEO title="Home" />
      <h2 className="mt-5 text-4xl font-semibold text-center">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-5">
        {products.map((product) => (
          <Tile
            key={product.handle}
            slug={product.handle}
            title={product.title}
            price={Number(product.priceRange.minVariantPrice.amount)}
            image={product.images[0].localFile.childImageSharp.fluid}
          />
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const IndexPageQuery = graphql`
  query allProducts {
    allShopifyProduct {
      nodes {
        title
        handle
        images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`
