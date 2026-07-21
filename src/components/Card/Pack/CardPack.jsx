import React, { useContext, useState } from 'react'
import { formatCurrency } from '../../../utils/util'
import './CardPack.css'
import price from '/price.svg'
import add from '/add.svg'
import discount from '/discount.svg'
import plus from '/plus.svg'
import saving from '/saving.svg'
import tot from '/tot.svg'
import cont from '/cont.svg'
import usage from '/usage.svg'
import { makeFetch } from '../../../services/fetch'
import { ReducerContext, StateContext } from '../../../context/createContext'
const Img = React.lazy(() => import('../../Img/Img'))

const CardPack = ({ pack, usePack }) => {
  const [statusOffer, setStatusOffer] = useState(pack?.visible)
  const {
    urlApi: { URL_CHANGE_STATE_PACK },
    isAuth: { existToken },
    showToast,
    updateAuthToken
  } = useContext(StateContext)
  const {
    auth: { user },
    dispatchPack,
    packs: { my_packs }
  } = useContext(ReducerContext)

  const handleInfoConfig = {
    price: (pack) =>
      `El precio del pack sin descuento es: ${formatCurrency(pack.initPrice)}`,
    discount: (pack) => `El descuento del pack es de: ${pack.discount}`,
    saving: (pack) => `Te ahorrarás en total: ${formatCurrency(pack.saving)}`,
    add: (pack) => `Incluye ${pack.items_included} uds`,
    plus: (pack) => `Extra ${pack.bonus_items} uds`,
    tot: (pack) => `Total de productos: ${pack.usage_limit} uds`,
    cont: (pack) => `Packs vendidos: ${pack.purchase_count}`,
    usage: (usePack) => `Unidades consumidas: ${usePack.usage}`
  }

  const handleInfo = (type, pack) => {
    if (handleInfoConfig[type]) {
      alert(handleInfoConfig[type](pack))
    }
  }

  const handleChangeStatusPack = async (pack) => {
    const newUrl = `${URL_CHANGE_STATE_PACK}/${pack._id}`
    try {
      const { response, data } = await makeFetch({
        url: newUrl,
        method: 'PUT',
        token: existToken
      })
      if (response.status !== 200) {
        showToast('error', data.message)
        return
      }
      setStatusOffer(data.pack.visible)
      const updatePacks = my_packs.map((item) =>
        item._id === data.pack._id ? data.pack : item
      )
      dispatchPack({ type: 'SET_PACKS', payload: updatePacks })
    } catch (error) {
      showToast('error', 'Hubo un error en la consulta.')
      updateAuthToken(false)
      return
    }
  }

  return (
    <div className='pack__content-pack'>
      <div className='pack__content-information'>
        <div className=''>
          <h3>{pack.name}</h3>
          <p>{pack.description}</p>
        </div>
      </div>
      <div className='pack__content'>
        <div>
          <Img
            icon={price}
            alt='Precio'
            title='Precio'
            action={() => handleInfo('price', pack)}
          />
          <p>{formatCurrency(pack.initPrice)}</p>
          <span>{usePack ? 'pagado' : 'Precio'}</span>
        </div>
        {pack.discount > 0 && (
          <div>
            <Img
              icon={discount}
              alt='Descuento'
              title='Descuento'
              action={() => handleInfo('discount', pack)}
            />
            <p>{pack.discount}%</p>
            <span>Descuento</span>
          </div>
        )}

        {pack.saving > 0 && (
          <div>
            <Img
              icon={saving}
              alt='Ahorro'
              title='Ahorro'
              action={() => handleInfo('saving', pack)}
            />
            <p>{formatCurrency(pack.saving)}</p>
            <span>Ahorro</span>
          </div>
        )}
      </div>

      {pack.saving > 0 && (
        <div className='pack__content'>
          <div>
            <Img
              icon={price}
              alt='Incluye'
              title='Incluye'
              action={() => handleInfo('add', pack)}
            />
            <p>{formatCurrency(pack.price)}</p>
            <span>{usePack ? 'pagado' : 'Total a pagar'}</span>
          </div>
        </div>
      )}

      <div className='pack__content'>
        <div>
          <Img
            icon={add}
            alt='Incluye'
            title='Incluye'
            action={() => handleInfo('add', pack)}
          />
          <p>{pack.items_included} uds.</p>
          <span>Incluye</span>
        </div>
        {pack.bonus_items > 0 && (
          <div>
            <Img
              icon={plus}
              alt='Extras'
              title='Extras'
              action={() => handleInfo('plus', pack)}
            />
            <p>{pack.bonus_items} uds.</p>
            <span>Extra</span>
          </div>
        )}
        <div>
          <Img
            icon={tot}
            alt='Total'
            title='Total'
            action={() => handleInfo('tot', pack)}
          />
          <p>{pack.usage_limit} uds.</p>
          <span>Total</span>
        </div>
      </div>
      {usePack && (
        <div className='pack__content'>
          <div>
            <Img
              icon={tot}
              alt='Total'
              title='Total'
              action={() => handleInfo('tot', pack)}
            />
            <p>{usePack.usage_limit} uds.</p>
            <span>Disponibles</span>
          </div>
          <div>
            <Img
              icon={usage}
              alt='Total'
              title='Total'
              action={() => handleInfo('usage', usePack)}
            />
            <p>{usePack.usage} uds.</p>
            <span>Usados</span>
          </div>
        </div>
      )}
      <div className='pack__content-purchase'>
        <div>
          <Img
            icon={cont}
            w='18'
            alt='Limite'
            title='Limite'
            action={() => handleInfo('cont', pack)}
          />
          <p>{usePack ? usePack.contPurchases : pack.purchase_count}</p>
          <span>{usePack ? 'veces comprado' : 'Vendidos'}</span>
        </div>
        {Object.keys(user).length > 0 &&
          Object.keys(pack.idUser).length > 0 &&
          (user._id === pack.idUser._id || pack.idUser === user._id) && (
            <div className='card__creator-switch'>
              <label className='switch'>
                <input
                  className='pack__checkbox'
                  type='checkbox'
                  checked={statusOffer}
                  onChange={() => handleChangeStatusPack(pack)}
                />
                <span className='slider'></span>
              </label>
              <span>{statusOffer ? 'Visible' : 'No visible'}</span>
            </div>
          )}
      </div>
    </div>
  )
}

export default CardPack
