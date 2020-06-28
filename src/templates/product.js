import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import Img from 'gatsby-image'
import { Layout, SEO } from '../components'
import { Thumbnail, OptionPicker } from './components'
import { graphql } from 'gatsby'
import { prepareVariantsWithOptions, prepareVariantsImages } from './utilities'
import { useAddItemToCart } from 'gatsby-theme-shopify-manager'

const ProductPage = ({ data: { shopifyProduct: product } }) => {
  const colors = product.options.find(option => option.name.toLowerCase() === 'color')?.values
  const sizes = product.options.find(option => option.name.toLowerCase() === 'size')?.values

  const variants = useMemo(() => prepareVariantsWithOptions(product.variants), [product.variants])
  const images = useMemo(() => prepareVariantsImages(variants, 'color'), [variants])

  if (images.length < 1) {
    throw new Error('Must have at least one product image!')
  }

  const addItemToCart = useAddItemToCart()
  const [variant, setVariant] = useState(variants[0])
  const [color, setColor] = useState(variant.color)
  const [size, setSize] = useState(variant.size)
  const [addedToCartMessage, setAddedToCartMessage] = useState(null)

  useEffect(() => {
    const newVariant = variants.find(variant => {
      return variant.size === size && variant.color === color
    })

    if (variant.shopifyId !== newVariant.shopifyId) {
      setVariant(newVariant)
    }
  }, [size, color, variants, variant.shopifyId])

  const gallery =
    images.length > 1 ? (
      <div className="grid grid-cols-6 gap-2">
        {images.map(({ src, color }) => (
          <Thumbnail key={color} src={src} onClick={() => setColor(color)} />
        ))}
      </div>
    ) : null

  async function handleAddToCart() {
    try {
      await addItemToCart(variant.shopifyId, 1)
      setAddedToCartMessage('🛒 Added to your cart!')
    } catch (e) {
      setAddedToCartMessage('There was a problem adding this to your cart')
    }
  }

  return (
    <Layout>
      <SEO title={product.title} />
      {addedToCartMessage ? (
        <div className="mb-4 border border-black px-4 py-3 rounded relative" role="alert">
          {addedToCartMessage}
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-black" role="button" onClick={() => setAddedToCartMessage(null)}>
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="border border-solid border-gray-900 p-2 mb-2">
            <Img fluid={variant.image.localFile.childImageSharp.fluid} />
          </div>
          {gallery}
        </div>
        <div className="flex flex-col">
          <h1 className="mt-0 mb-2">{product.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          <div>
            <div className="grid grid-cols-2 gap-2">
              {colors && (
                <OptionPicker
                  key="Color"
                  name="Color"
                  options={colors}
                  selected={color}
                  onChange={event => setColor(event.target.value)}
                />
              )}
              {sizes && (
                <OptionPicker
                  key="Size"
                  name="Size"
                  options={sizes}
                  selected={size}
                  onChange={event => setSize(event.target.value)}
                />
              )}
            </div>
          </div>
          <button className="mt-2 mb-2 block bg-black text-white rounded p-2 w-full" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default ProductPage

export const ProductPageQuery = graphql`
  query productPage($productId: String!) {
    shopifyProduct(id: { eq: $productId }) {
      id
      title
      descriptionHtml
      options {
        name
        values
      }
      variants {
        shopifyId
        selectedOptions {
          name
          value
        }
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 446) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
