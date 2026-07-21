import { Helmet, HelmetProvider } from 'react-helmet-async'
import Img from '../Img/Img'
import './Content.css'
import email from '/mail.svg'
import map from '/map.svg'
import whatsapp from '/whatsapp.svg'

const Content = ({ element }) => {
  if (!element) return
  const { body } = element

  const getGoogleMapsUrl = (name, country, city, postalCode) => {
    const query = `${name}, ${city}, ${country}, ${postalCode}`
    const url = `https://www.google.com/maps?q=${encodeURIComponent(query)}`
    return url
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{body.helmet.title}</title>
        <meta
          name={body.helmet.description.name}
          content={body.helmet.description.content}
        />
        <meta
          name={body.helmet.keywords.name}
          content={body.helmet.keywords.content}
        />
      </Helmet>
      <div className='content__container'>
        <div className='content__content-information'>
          {body.avatar && (
            <Img
              icon={body.avatar}
              alt={`icon ${body.title}`}
              w='40'
              title={`icon ${body.title}`}
            />
          )}
          <h1>{body.title}</h1>
        </div>
        <div className='content__content-contact'>
          <p>{body.description}</p>
          <p>{body.description_}</p>
        </div>
        <div className='content__links'>
          {body.email && (
            <>
              {navigator.userAgent.includes('Mobile') ? (
                <a href={`mailto:${body.email}`} target='_blank'>
                  <Img
                    icon={email}
                    alt={`send mail to ${body.email}`}
                    w='20'
                    title={`Envía mail a ${body.email}`}
                  />
                </a>
              ) : (
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${body.email}`}
                  target='_blank'
                >
                  <Img
                    icon={email}
                    alt={`Envía mail a ${body.email}`}
                    w='20'
                    title={`Envía mail a ${body.email}`}
                  />
                </a>
              )}
            </>
          )}
          {body.phone && (
            <a
              href={`https://wa.me/${body.phone}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Img
                icon={whatsapp}
                alt={`Envía ws a ${body.phone}`}
                w='25'
                title={`Envía ws a ${body.phone}`}
              />
            </a>
          )}
        </div>
        <div className='content__content-location'>
          {body.country && <span>{body.country}</span>}
          {body.city && <span>{body.city}</span>}
          {body.postalCode && (
            <a
              href={getGoogleMapsUrl(
                body.title,
                body.country,
                body.city,
                body.postalCode
              )}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Img icon={map} />
            </a>
          )}
        </div>
      </div>
    </HelmetProvider>
  )
}

export default Content
