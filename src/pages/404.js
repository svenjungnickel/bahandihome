import React from 'react'
import { Layout, SEO } from '../components/'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1 className="mt-5 mb-0"> Down Not Found</h1>
    <p className="mt-0 mb-5">We couldn't find the down you were looking for.</p>
  </Layout>
)

export default NotFoundPage
