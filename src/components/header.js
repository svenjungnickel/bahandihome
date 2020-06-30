import React from 'react'
import PropTypes from 'prop-types'
import { Link } from './link'
import { useCartCount } from 'gatsby-theme-shopify-manager'
import headerStyles from 'css/components/header.module.scss'

const Header = ({ siteTitle }) => {
  const count = useCartCount()

  const countMarkup = count ? (
    <div className={headerStyles.header__cartCount}>
      <span>{count}</span>
    </div>
  ) : null

  return (
    <header>
      <div className="container m-auto flex items-center justify-between pt-4 pb-4">
        <h1 className="m-0 text-xl font-bold">
          <Link url="/" className="text-black tracking-tight no-underline hover:underline">
            {siteTitle}
          </Link>
        </h1>
        <Link url="/cart" className={headerStyles.header__cart}>
          <svg
            aria-hidden="true"
            focusable="false"
            role="presentation"
            className="inline-block w-5 h-5 align-middle fill-currentoverflow-hidden"
            viewBox="0 0 37 40"
          >
            <path d="M36.5 34.8L33.3 8h-5.9C26.7 3.9 23 .8 18.5.8S10.3 3.9 9.6 8H3.7L.5 34.8c-.2 1.5.4 2.4.9 3 .5.5 1.4 1.2 3.1 1.2h28c1.3 0 2.4-.4 3.1-1.3.7-.7 1-1.8.9-2.9zm-18-30c2.2 0 4.1 1.4 4.7 3.2h-9.5c.7-1.9 2.6-3.2 4.8-3.2zM4.5 35l2.8-23h2.2v3c0 1.1.9 2 2 2s2-.9 2-2v-3h10v3c0 1.1.9 2 2 2s2-.9 2-2v-3h2.2l2.8 23h-28z" />
          </svg>
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
