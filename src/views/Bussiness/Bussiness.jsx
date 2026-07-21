import React, { Suspense, useContext, useEffect, useState } from 'react'
import useWidth from '../../hooks/useWidth'
import {
  ReducerContext,
  ScrollContext,
  StateContext
} from '../../context/createContext'
import { getFetch } from '../../reducers/packs.reducer/pack.action'
import { makeFetch } from '../../services/fetch'
import { bussiness_content } from './utils/content'
import './Bussiness.css'
import { useNavigate } from 'react-router-dom'
const Form = React.lazy(() => import('../../components/FormGroup/Form'))
const Content = React.lazy(() => import('../../components/Content/Content'))
const Button = React.lazy(() => import('../../components/Button/Button'))

const Bussiness = () => {
  const navigate = useNavigate()
  const [selectedPack, setSelectedPack] = useState('')
  const [activeForm, setActiveForm] = useState({
    create: false,
    assign: false,
    redeem: false
  })

  const {
    load: { load },
    dispatchLoad,
    dispatchPack,
    packs: { my_packs }
  } = useContext(ReducerContext)
  const {
    isAuth: { existToken },
    urlApi: {
      URL_PACKS_BUSSINESS,
      URL_USE_PACK_CUSTOMER,
      URL_CREATE_PACK,
      URL_ASSIGN_PACK
    },
    showToast
  } = useContext(StateContext)
  const { useScroll, refForm } = useContext(ScrollContext)

  const width = useWidth()

  useEffect(() => {
    const getMyPacks = async () => {
      const { response, data } = await getFetch({
        url: URL_PACKS_BUSSINESS,
        token: existToken,
        dispatchLoad
      })
      if (response.status !== 200) {
        showToast('error', 'Algo ha salido mal.')
        return
      }
      dispatchPack({ type: 'SET_PACKS', payload: data.packs })
    }
    if (my_packs?.length <= 0) {
      getMyPacks()
    } else return
  }, [activeForm])

  const handleSelectChange = (e) => {
    setSelectedPack(e.target.value)
  }

  const handleOpenForm = (key) => {
    setActiveForm((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(prevState[key] === false && {
        create: key === 'create',
        assign: key === 'assign',
        redeem: key === 'redeem'
      })
    }))
  }
  let height = 0
  useEffect(() => {
    if (width > 200 && width < 290) height = 700
    else if (width > 291 && width < 419) height = 600
    else if (width > 420 && width < 508) height = 400
    else if (width > 509) height = 300
    setTimeout(() => {
      if (refForm?.current) {
        useScroll(refForm, height)
      }
    }, 500)
  }, [activeForm])

  const handleRedeem = async (fields) => {
    if (selectedPack === '') {
      showToast('info', 'Por favor elige un pack')
      return
    }
    try {
      dispatchLoad({ type: 'LOAD_TRUE' })
      const { response, data } = await makeFetch({
        url: `${URL_USE_PACK_CUSTOMER}/${selectedPack}`,
        formFields: fields,
        method: 'POST',
        token: existToken
      })
      if (response.status !== 200) {
        showToast('error', data.message)
        return
      }
      showToast('success', 'Canje realizado con éxito.')
      return
    } catch (error) {
    } finally {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }
  }

  const handleCreate = async (fields) => {
    const newFormFields = {
      name: fields.name,
      description: fields.description,
      initPrice: Number(fields.initPrice),
      discount: Number(fields.discount),
      items_included: Number(fields.items_included),
      bonus_items: Number(fields.bonus_items)
    }

    try {
      dispatchLoad({ type: 'LOAD_TRUE' })
      const { response, data } = await makeFetch({
        url: `${URL_CREATE_PACK}`,
        formFields: newFormFields,
        method: 'POST',
        token: existToken
      })
      if (response.status !== 201) {
        showToast('error', data.message)
        return
      }
      showToast('success', 'Nuevo pack creado con éxito.')
      my_packs.unshift(data.pack)
      return
    } catch (error) {
    } finally {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }
  }

  const handleAssign = async (fields) => {
    if (selectedPack === '') {
      showToast('info', 'Por favor elige un pack')
      return
    }

    try {
      dispatchLoad({ type: 'LOAD_TRUE' })
      const { response, data } = await makeFetch({
        url: `${URL_ASSIGN_PACK}/${selectedPack}`,
        formFields: fields,
        method: 'POST',
        token: existToken
      })
      if (response.status !== 200) {
        showToast('error', data.message)
        return
      }
      showToast('success', 'Canje realizado con éxito.')
      return
    } catch (error) {
    } finally {
      dispatchLoad({ type: 'LOAD_FALSE' })
    }
  }

  const handleMyPacks = async () => {
    navigate('/mis-packs-vendidos')
  }

  return (
    <section className='bussiness__container fadeIn'>
      <Suspense fallback={<p>Espere...</p>}>
        <div className='bussiness__content-header'>
          <Content element={bussiness_content} />
          <div className='bussiness__content-btn-options'>
            <Button
              text='Packs Vendidos'
              w='120px'
              h='120px'
              br='50%'
              p='10px'
              bgColor='var(--p-bg-secondary)'
              action={handleMyPacks}
            />
            <Button
              text='Asignar'
              w='120px'
              h='120px'
              br='50%'
              bgColor='var(--p-bg-secondary)'
              action={() => handleOpenForm('assign')}
            />
            <Button
              text='Crear'
              w='120px'
              h='120px'
              br='50%'
              bgColor='var(--p-bg-secondary)'
              action={() => handleOpenForm('create')}
            />
            <Button
              text='Canjear'
              w='120px'
              h='120px'
              br='50%'
              bgColor='var(--p-bg-secondary)'
              action={() => handleOpenForm('redeem')}
            />
          </div>
        </div>
        {activeForm.redeem && (
          <div ref={refForm} className='bussiness__content-form fadeIn'>
            <div className='bussiness__content-form-title'>
              <h1>Canje de pack</h1>
              <p>Rellene los campos para canjear un producto o servicio.</p>
            </div>
            <div className='bussiness__content-form-fields'>
              <p>Selecciona el pack a canjear</p>
              <select value={selectedPack} onChange={handleSelectChange}>
                <option value='' disabled>
                  Selecciona un pack
                </option>
                {my_packs?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <p>Introduce los datos de tu cliente</p>
              <Form
                fields={bussiness_content.form_redeem}
                btnText={bussiness_content.button_redeem.text}
                onSubmit={handleRedeem}
                load={load}
              />
            </div>
          </div>
        )}
        {activeForm.create && (
          <div ref={refForm} className='bussiness__content-form fadeIn'>
            <div className='bussiness__content-form-title'>
              <h1>Crear mi nuevo Pack</h1>
              <p>Rellene los campos para crear un nuevo lote de productos.</p>
            </div>
            <div className='bussiness__content-form-fields'>
              <p>Introduce los datos de tu nuevo pack</p>
              <Form
                fields={bussiness_content.form_create}
                btnText={bussiness_content.button_create.text}
                onSubmit={handleCreate}
                load={load}
              />
            </div>
          </div>
        )}
        {activeForm.assign && (
          <div ref={refForm} className='bussiness__content-form fadeIn'>
            <div className='bussiness__content-form-title'>
              <h1>Asigna un pack</h1>
              <p>Estas a un paso de asignarle un pack a uno de tus clientes.</p>
            </div>
            <div className='bussiness__content-form-fields'>
              <p>Selecciona el pack a asignar</p>
              <select value={selectedPack} onChange={handleSelectChange}>
                <option value='' disabled>
                  Selecciona un pack
                </option>
                {my_packs
                  ?.filter((item) => item.visible !== false)
                  .map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <p>Introduce el correo electronico de tu cliente</p>
              <Form
                fields={bussiness_content.form_assign}
                btnText={bussiness_content.button_assign.text}
                onSubmit={handleAssign}
                load={load}
              />
            </div>
          </div>
        )}
      </Suspense>
    </section>
  )
}

export default Bussiness
