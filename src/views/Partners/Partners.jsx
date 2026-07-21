import React, { useContext, useEffect, useState, Suspense } from 'react'
import useFilter from '../../hooks/useFilter'
import { ReducerContext, StateContext } from '../../context/createContext'
import { getFetch } from '../../reducers/partner.reducer/partner.action'
import { partner_content } from './utils/utils'
import './Partners.css'
const Card = React.lazy(() => import('../../components/Card/Partner/Card'))
const Loader = React.lazy(() => import('../../components/Loader/Loader'))
const Content = React.lazy(() => import('../../components/Content/Content'))
const Button = React.lazy(() => import('../../components/Button/Button'))

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const content = partner_content
  const { partnersLoaded, setPartnersLoaded, urlApi } = useContext(StateContext)
  const {
    load: { load },
    dispatchLoad,
    partner: { partners },
    dispatchPartner
  } = useContext(ReducerContext)

  const fetchPartners = async () => {
    const url = urlApi.URL_PARTNERS
    const { response, data } = await getFetch(url, dispatchLoad)
    if (response.status !== 200) {
      return
    }
    dispatchPartner({ type: 'SET_PARTNERS', payload: data.partners })
  }

  useEffect(() => {
    if (!partnersLoaded) fetchPartners()
    else return
  }, [partnersLoaded])

  const filterPartners = useFilter(searchTerm, partners)
  const recentPartners = [...partners]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 10)

  const handleCleanSearInput = () => {
    setSearchTerm('')
  }

  return (
    <section className='partner__content'>
      <div className='fadeIn'>
        <Content element={content} />
        <hr />
        {partners.length > 0 && (
          <div className='partner__content-title'>
            <p>
              Puedes realizar tu búsqueda por: “nombre del establecimiento”,
              “país”, “ciudad” o “código postal”.
            </p>
            {partners.length > 0 && (
              <div className='partner__content-filter'>
                <input
                  type='search'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder='Buscar colaborador'
                />
                {searchTerm.length > 0 && (
                  <div className='fadeIn'>
                    <Suspense fallback={<Loader />}>
                      <Button
                        text='Limpiar'
                        p='5px'
                        bgColor='var(--p-bg-tertiary)'
                        textColor='var(--p-text-tertiary)'
                        br='5px'
                        action={handleCleanSearInput}
                      />
                    </Suspense>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className='partner__container-card fadeIn'>
          {load ? (
            <div className='partner__content-loader'>
              <Loader />
            </div>
          ) : (
            <>
              {partners.length <= 0 ? (
                <p className='partner__result-text'>
                  No hay colaboradores en este momento...
                </p>
              ) : filterPartners.length > 0 ? (
                <>
                  <i>
                    Resultado: {filterPartners.length} colaborador
                    {filterPartners.length > 1 && 'es'}
                  </i>
                  <div className='partner__content-card'>
                    {filterPartners.map((item, index) => (
                      <Card key={index} array={item} />
                    ))}
                  </div>
                </>
              ) : (
                <p>Sin resultado de busqueda para la palabra: "{searchTerm}"</p>
              )}
              {partners.length > 0 && (
                <>
                  <hr />
                  <h2 className='partner__title-ten-limit'>
                    Colaboradores más recientes
                  </h2>
                  <i>
                    {recentPartners.length === 0
                      ? 'Aún no hay colaboradores dados de alta'
                      : recentPartners.length === 1
                      ? `${recentPartners.length} colaborador.`
                      : `${recentPartners.length} colaboradores`}
                  </i>
                  <div className='partner__content-card'>
                    {recentPartners.map((item, index) => (
                      <Card key={index} array={item} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Partners
