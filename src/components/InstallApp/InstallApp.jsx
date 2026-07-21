import React, { useEffect, useState } from 'react'
import './InstallApp.css'
import logo from '/logo.svg'
const Img = React.lazy(() => import('../Img/Img'))

const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
      setTimeout(() => {
        setShowInstallPrompt(true)
      }, 2000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
    }
  }, [])

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          setShowInstallPrompt(false)
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
        setDeferredPrompt(null)
      })
    }
  }
  return (
    <>
      {showInstallPrompt && (
        <div className='installapp__container fadeIn' onClick={handleInstallClick} >
          <Img
            icon={logo}
            w='60px'
            alt='Icon logo'
            title='Instalar Aplicación'
          />
        </div>
      )}
    </>
  )
}

export default InstallApp
