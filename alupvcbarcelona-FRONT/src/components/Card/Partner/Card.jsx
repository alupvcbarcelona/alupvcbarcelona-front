import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Card.css'
import email from '/mail.svg'
import map from '/map.svg'
import whatsapp from '/whatsapp.svg'
const Img = React.lazy(() => import('../../Img/Img'))
const Button = React.lazy(() => import('../../Button/Button'))

const Card = ({ array, option = false, action = () => {} }) => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    const formatUrl = array.name.replace(/\s+/g, '-').toLowerCase()
    navigate(`/colaborador/${formatUrl}/${array._id}`)
  }

  const getGoogleMapsUrl = (name, country, city, postalCode) => {
    const query = `${name}, ${city}, ${country}, ${postalCode}`
    const url = `https://www.google.com/maps?q=${encodeURIComponent(query)}`
    return url
  }

  return (
    <div className='card__container'>
      <div className='card__content'>
        <div className='card__content-title'>
          <Img
            icon={array.avatar}
            w='40'
            alt={`icon ${array.name}`}
            title={`icon ${array.name}`}
          />
          <h2>{array.name}</h2>
        </div>
        <div className='card__content-location'>
          <span>{array.country}</span>
          <span>{array.city}</span>
          <a
            href={getGoogleMapsUrl(
              array.name,
              array.country,
              array.city,
              array.postal_code
            )}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Img icon={map} />
          </a>
        </div>
      </div>
      <div className='card__content-info'>
        {array.email && (
          <>
            {navigator.userAgent.includes('Mobile') ? (
              <a href={`mailto:${array.email}`} target='_blank'>
                <Img
                  icon={email}
                  alt={`send mail to ${array.email}`}
                  w='20'
                  title={`Envía mail a ${array.email}`}
                />
              </a>
            ) : (
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${array.email}`}
                target='_blank'
              >
                <Img
                  icon={email}
                  alt={`Envía mail a ${array.email}`}
                  w='20'
                  title={`Envía mail a ${array.email}`}
                />
              </a>
            )}
          </>
        )}
        {array.phone && (
          <a href={`https://wa.me/${array.phone}`} target='_blank'>
            <Img
              icon={whatsapp}
              alt={`Envía ws a ${array.phone}`}
              w='25'
              title={`Envía ws a ${array.phone}`}
            />
          </a>
        )}
      </div>
      <div className='card__content-link'>
        {option ? (
          <Button text='Ver mis packs' p='5px 5px' br='5px' action={action} />
        ) : (
          <Button
            text='Ver todos los packs'
            p='5px 5px'
            br='5px'
            action={handleNavigate}
          />
        )}
      </div>
    </div>
  )
}

export default Card
