import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { COOKIES_CONTENT } from './utils/content'
import './Cookies.css'

const Cookies = () => {
  const location = useLocation()
  const PATH = location.pathname
  const CONTENT = COOKIES_CONTENT(PATH)

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
      <section className='cookies__container'>
        <div className='cookies__content-title'>
          <h1>{CONTENT.body.title}</h1>
        </div>
        <div className='cookies__content-information'>
          {CONTENT.content.map((item, index) => (
            <div key={index}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {item.usedCookies && (
                <>
                  {item.usedCookies.map((cookie, index) => (
                    <Fragment key={index}>
                      <div>
                        <p>
                          {Object.keys(cookie)[0] + ': ' + cookie.Tipo}
                        </p>
                        <p>{Object.keys(cookie)[1] + ': ' + cookie.Propiedad}</p>
                        <p>{Object.keys(cookie)[2] + ': ' + cookie.Cookie}</p>
                        <p>{Object.keys(cookie)[3] + ': ' + cookie.Función}</p>
                        <p>{Object.keys(cookie)[4] + ': ' + cookie.Tiempo}</p>
                        <p>
                          {Object.keys(cookie)[5] + ': ' + cookie.Pertenece}
                        </p>
                        {cookie.url !== '' && (
                          <a
                            href={`https://${cookie.url}`}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {Object.keys(cookie)[5] + ': ' + cookie.url}
                          </a>
                        )}
                      </div>
                      <hr />
                    </Fragment>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </HelmetProvider>
  )
}

export default Cookies
