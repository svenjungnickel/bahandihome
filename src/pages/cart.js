import React from 'react'
import Img from 'gatsby-image'
import { Layout, SEO, Link } from '../components'
import { useStaticQuery, graphql } from 'gatsby'

import {
  useAddItemToCart,
  useCartItems,
  useCheckoutUrl,
  useCart,
  useUpdateItemQuantity,
} from 'gatsby-theme-shopify-manager'

import cartStyles from '../css/pages/cart.module.scss'

const CartPage = () => {
  const {
    allShopifyProductVariant: { nodes: variants },
    allShopifyProduct: { nodes: products },
  } = useStaticQuery(graphql`
    query {
      allShopifyProductVariant {
        nodes {
          shopifyId
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 120) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
      allShopifyProduct {
        nodes {
          handle
          variants {
            shopifyId
          }
        }
      }
    }
  `)

  const lineItems = useCartItems()
  const updateItemQuantity = useUpdateItemQuantity()
  const checkoutUrl = useCheckoutUrl()
  console.log(checkoutUrl)
  const cart = useCart()
  const { tax, total } = getCartTotals(cart)
  const addItemToCart = useAddItemToCart()

  const betterProductHandles = products.map(({ handle, variants }) => {
    const newVariants = variants.map((variant) => variant.shopifyId)
    return {
      variants: newVariants,
      handle,
    }
  })

  function getCartTotals(cart) {
    if (cart == null) {
      return { tax: '-', total: '-' }
    }

    const tax = cart.totalTaxV2 ? `$${Number(cart.totalTaxV2.amount).toFixed(2)}` : '-'
    const total = cart.totalPriceV2 ? `$${Number(cart.totalPriceV2.amount).toFixed(2)}` : '-'

    return {
      tax,
      total,
    }
  }

  async function removeFromCart(variantId) {
    try {
      await updateItemQuantity(variantId, 0)
    } catch (e) {
      console.log(e)
    }
  }

  function getHandleForVariant(variantId) {
    const selectedProduct = betterProductHandles.find((product) => {
      return product.variants.includes(variantId)
    })

    return selectedProduct ? selectedProduct.handle : null
  }

  function getImageFluidForVariant(variantId) {
    const selectedVariant = variants.find((variant) => {
      return variant.shopifyId === variantId
    })

    if (selectedVariant) {
      return selectedVariant.image.localFile.childImageSharp.fluid
    }
    return null
  }

  const LineItem = ({ item }) => (
    <div className={`grid grid-cols-1 gap-4 items-center max-w-xs sm:max-w-full m-auto sm:m-0 ${cartStyles.cartGrid}`}>
      <div className="p-1 border border-solid border-gray-900">
        <Img fluid={getImageFluidForVariant(item.variant.id)} />
      </div>
      <div>
        <Link url={`/product/${getHandleForVariant(item.variant.id)}`} className="text-xl m-0 font-bold text-current">
          {item.title}
        </Link>
        <ul className="mt-2 mb-0 p-0">
          {item.variant.selectedOptions.map(({ name, value }) => (
            <li key={name}>
              <strong>{name}: </strong>
              {value}
            </li>
          ))}
          <li key="quantity">
            <strong>Quantity: </strong>
            {item.quantity}
          </li>
        </ul>
      </div>
      <button
        className="p-2 rounded no-underline font-semibold bg-black text-white text-center hover:bg-gray-800"
        onClick={() => removeFromCart(item.variant.id)}
      >
        Delete
      </button>
      <span className="text-2xl font-bold ml-auto">${Number(item.variant.priceV2.amount).toFixed(2)}</span>
    </div>
  )

  const emptyCart = (
    <Layout>
      <SEO title="Cart" />
      <h1>Cart</h1>
      <p>Your shopping cart is empty.</p>
      <button
        className="mt-4"
        onClick={() => addItemToCart(variants[Math.floor(Math.random() * (variants.length - 1))].shopifyId, 1)}
      >
        <span role="img" aria-label="Dice Emoji">
          🎲
        </span>{' '}
        Random item plz
      </button>
    </Layout>
  )

  return lineItems.length < 1 ? (
    emptyCart
  ) : (
    <Layout>
      <SEO title="Cart" />
      <h1>Cart</h1>
      {lineItems.map((item) => (
        <React.Fragment key={item.id}>
          <LineItem key={item.id} item={item} />
          <hr className="mt-3 mb-3" />
        </React.Fragment>
      ))}
      <div className="flex">
        <div className="m-auto sm:m-0 sm:ml-auto min-w-40 p-10 bg-gray-100">
          <h3 className="mt-0 mb-3">Cart Summary</h3>
          <hr />

          <div className="grid grid-cols-2 gap-1 mt-3 mb-3">
            <span>Subtotal:</span>
            <span className="ml-auto">{total}</span>
            <span>Shipping:</span>
            <span className="ml-auto"> - </span>
            <span>Tax: </span>
            <span className="ml-auto">{tax}</span>
          </div>

          <hr />
          <div className="grid grid-cols-2 gap-1">
            <span className="font-bold">Estimated Total:</span>
            <span className="font-bold ml-auto">{total}</span>
          </div>
          <br />
          {checkoutUrl != null ? (
            <a
              className="mt-4 w-full"
              href={checkoutUrl}
              //target="_blank"
              rel="noopener noreferrer"
            >
              Checkout
            </a>
          ) : null}
        </div>
      </div>
    </Layout>
  )
}

export default CartPage
