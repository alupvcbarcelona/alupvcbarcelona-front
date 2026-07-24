import React, { useContext } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import useWidth from '../../hooks/useWidth'
import { ReducerContext, StateContext } from '../../context/createContext'
import { optionsNavigate, optionsNavigateMobile } from './utils/content'
import { handleGoHome } from './utils/functions'
import Img from '../Img/Img'
import './Header.css'
import menu from '/menu.svg'
import login from '/login.svg'
const Button = React.lazy(() => import('../Button/Button'))

const Header = () => {
  const width = useWidth()
  const navigate = useNavigate()
  const location = useLocation()
  const {
    isAuth: { auth },
    showMenu,
    handleShowMenu,
    handleCloseSesion
  } = useContext(StateContext)
  const {
    auth: { user }
  } = useContext(ReducerContext)

  const navbar = optionsNavigate(user, auth)
  const navbarMobile = optionsNavigateMobile(user, auth)

  return (
    <header className='header__container filter'>
      <div className='header__content-logo'>
        <Button
          text='PACKEO'
          bgColor='rgba(255, 255, 255, 0)'
          p='10px'
          br='10px'
          action={() => handleGoHome(navigate)}
        />
      </div>
      {width >= 510 ? (
        <div className='header__content-navbar'>
          <ul>
            {navbar?.map((item, index) => (
              <li key={index} className='header__links'>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `${isActive ? 'header__link-active' : ''}`
                  }
                >
                  <Img icon={item.icon} alt={`icon ${item.text}`} w='14' title={`icon ${item.text}`} />
                  {item.text}
                </NavLink>
              </li>
            ))}
            {auth && (
              <li onClick={handleCloseSesion}>
                <Img icon={login} w='14' alt='Salir' title='Salir' />
                Salir
              </li>
            )}
          </ul>
        </div>
      ) : (
        <div className='header__content-nav-mobile'>
          <div
            className={`header__menu-icon ${
              showMenu ? 'rotate-active' : 'rotate-inactive'
            }`}
          >
            <Img icon={menu} w='30' alt='menú' action={handleShowMenu} title='menú' />
          </div>
          <ul
            className={`${showMenu ? 'menu-active' : 'menu-inactive'}`}
            onClick={handleShowMenu}
          >
            {navbarMobile?.map((item, index) => (
              <li key={index} className='header__links'>
                <NavLink
                  to={item.url}
                  onClick={handleShowMenu}
                  className={({ isActive }) =>
                    `${isActive ? 'header__link-active' : ''}`
                  }
                >
                  <Img icon={item.icon} alt={`icon ${item.text}`} w='14' title={item.text} />
                  {item.text}
                </NavLink>
              </li>
            ))}
            {auth && (
              <li className='header__close-sesion' onClick={handleCloseSesion}>
                <Img icon={login} w='14' alt='icon Salir' title='Salir' />
                Cerrar sesión
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
