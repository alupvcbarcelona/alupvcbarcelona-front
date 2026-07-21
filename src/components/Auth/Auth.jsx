import React, { useContext, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import './Auth.css'
const Form = React.lazy(() => import('../FormGroup/Form'))

const Auth = ({ array, action, load }) => {

  return (
    <HelmetProvider>
      <Helmet>
        <title>{array.helmet.title}</title>
        <meta
          name={array.helmet.description.name}
          content={array.helmet.description.content}
        />
        <meta
          name={array.helmet.keywords.name}
          content={array.helmet.keywords.content}
        />
      </Helmet>
      <section className='auth__container fadeIn'>
        <div className='auth__content-information'>
          <h2>{array.body.title}</h2>
          <p>{array.body.description}</p>
        </div>
        <div className='auth__form'>
          <Form
            fields={array.form}
            btnText={array.button.text}
            onSubmit={action}
            load={load}
          />
        </div>
      </section>
    </HelmetProvider>
  )
}

export default Auth
