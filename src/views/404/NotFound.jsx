import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { content404 } from './utils'
import './NotFound.css'
const Button = React.lazy(() => import('../../components/Button/Button'))

const NotFound = () => {
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate('../')
  }

  return (
    <HelmetProvider>
      <Helmet>
      <title>{content404.helmet.title}</title>
        <meta
          name={content404.helmet.description.name}
          content={content404.helmet.description.content}
        />
        <meta
          name={content404.helmet.keywords.name}
          content={content404.helmet.keywords.content}
        />
      </Helmet>
      <div className='not-found__container'>
        <article className='not-found__content'>
          <h1 className='not-found__title'>{content404.body.error}</h1>
          <p className='not-found__message'>{content404.body.description}</p>
          <Button
            text='Volver'
            bgColor='black'
            textColor='white'
            action={handleGoBack}
            className='not-found__button'
            p='10px'
            br='5px'
          />
        </article>
      </div>
    </HelmetProvider>
  )
}

export default NotFound
