import React from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ETHICS_CHANNEL_CONTENT } from './utils/content'
import './EthicsChannel.css'

const EthicsChannel = () => {
  const location = useLocation()
  const PATH = location.pathname
  const CONTENT = ETHICS_CHANNEL_CONTENT(PATH)
  
  return (
     <HelmetProvider>
          <Helmet>
            <title>{CONTENT.helmet.title}</title>
            <link rel='canonical' href={CONTENT.helmet.canonical} />
            <meta
              name={CONTENT.helmet.description.name}
              content={CONTENT.helmet.description.content}
            />
            <meta
              name={CONTENT.helmet.keywords.name}
              content={CONTENT.helmet.keywords.content}
            />
          </Helmet>
          <section className='ethics-container'>
            <h1>{CONTENT.body.title}</h1>
            <p>{CONTENT.body.description}</p>
          </section>
        </HelmetProvider>
  )
}

export default EthicsChannel