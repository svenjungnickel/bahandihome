import React from 'react'
import PropTypes from 'prop-types'
import { Link } from './link'
import { useCartCount } from 'gatsby-theme-shopify-manager'

const Header = ({ siteTitle }) => {
  const count = useCartCount()

  const countMarkup = (
    <span className="inline-block bg-white text-black h-5 leading-tight w-5 text-sm rounded-lg ml-2 relative text-center">
      {count}
    </span>
  )

  return (
    <header>
      <div className="container m-auto flex items-center justify-between pt-4 pb-4">
        <h1 className="m-0 text-xl font-bold">
          <Link url="/" className="text-black tracking-tight no-underline hover:underline">
            {siteTitle}
          </Link>
        </h1>
        <Link url="/cart" isButton={true}>
          Cart
          {countMarkup}
        </Link>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export { Header }
