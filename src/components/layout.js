import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Header, Hero } from '../components'

const Layout = ({ children, hasHero }) => {
  const {
    site: {
      siteMetadata: { title, description },
    },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={title} />
      {true === hasHero ? <Hero title={title} description={description} /> : null}
      <div className="container m-auto">
        <main>{children}</main>
        <footer className="text-center mt-32">
          <p>
            © {new Date().getFullYear()} {title}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
            {` and `}
            <a href="https://www.shopify.ca">Shopify</a>.
          </p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hasHero: PropTypes.bool,
}

Layout.defaultProps = {
  hasHero: false,
}

export { Layout }
