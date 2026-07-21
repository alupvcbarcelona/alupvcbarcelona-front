import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import PRIVACY_CONTENT from './utils/content'
import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
  const location = useLocation()
  const PATH = location.pathname
  const CONTENT = PRIVACY_CONTENT(PATH)

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
      <section className='privacy-container'>
        <h1>{CONTENT.title}</h1>
        {CONTENT.sections.map((section, index) => (
          <div key={index} className='privacy-section'>
            <h2>{section.title}</h2>
            {section.subsections ? (
              section.subsections.map((sub, subIndex) => (
                <div key={subIndex} className='privacy-subsection'>
                  <h3>{sub.subtitle}</h3>
                  <p>{sub.content}</p>
                </div>
              ))
            ) : (
              <p>{section.content}</p>
            )}
          </div>
        ))}
      </section>
    </HelmetProvider>
  )
}

export default PrivacyPolicy
