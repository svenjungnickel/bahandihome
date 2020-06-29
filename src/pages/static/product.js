import React, { useState } from 'react'
import Img from 'gatsby-image'
import { Layout, SEO } from '../../components'
import { useStaticQuery, graphql } from 'gatsby'

const ProductPage = () => {
  const {
    allFile: { nodes: productImages },
  } = useStaticQuery(graphql`
    query placeholderProductPage {
      allFile(filter: { relativeDirectory: { eq: "placeholder" } }) {
        nodes {
          id
          childImageSharp {
            fluid(maxWidth: 445) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  `)

  if (productImages.length < 1) {
    throw new Error('Must have product images!')
  }

  const [image, setImage] = useState(productImages[0])
  const colors = ['Blue', 'Black', 'Green']
  const sizes = ['Small', 'Medium', 'Large']

  const Thumbnail = ({ image }) => {
    return (
      <div className="cursor-pointer border border-solid border-gray-900 p-1">
        <Img key={image.id} fluid={image.childImageSharp.fluid} onClick={() => setImage(image)} />
      </div>
    )
  }

  const gallery = (
    <div>
      <div className="border border-solid border-gray-900 p-2 mb-2">
        <Img fluid={image.childImageSharp.fluid} />
      </div>
      <div className="grid grid-cols-6 gap-2">
        {productImages.map((productImage) => (
          <Thumbnail key={productImage.id} image={productImage} />
        ))}
      </div>
    </div>
  )

  const description = (
    <div>
      <p>This is where the product description goes. It's where you can learn more about the product.</p>
      <ul>
        <li>There's a hat</li>
        <li>There's a pair of glasses</li>
        <li>There's a shoe</li>
        <li>They're all drawings, which makes them pretty hard to wear</li>
      </ul>
    </div>
  )

  return (
    <Layout>
      <SEO title="Product Name" />
      <div className="grid grid-cols-2 gap-4">
        {gallery}
        <div className="flex flex-col">
          <h1 className="mt-0 mb-2">Product Name</h1>
          {description}
          <div>
            <div className="p-2 grid grid-cols-2">
              <div>
                <label htmlFor="colors">Color</label>
                <select id="colors" defaultValue={colors[0]}>
                  {colors.map((color) => (
                    <option value={color}>{color}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="sizes">Size</label>
                <select id="sizes" defaultValue={sizes[0]}>
                  {sizes.map((size) => (
                    <option value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button className="m-2 block">Add to Cart</button>
        </div>
      </div>
    </Layout>
  )
}

export default ProductPage
