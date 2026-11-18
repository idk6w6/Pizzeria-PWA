'use client'
 
import { useEffect } from 'react'
 
export default function RegistrarSW({ authenticated = false }) {
  useEffect(() => {
    if (authenticated) {
      localStorage.setItem('pwa-session-active', 'true')
    } else {
      localStorage.removeItem('pwa-session-active')
    }

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado con éxito en:', registration.scope)
          return navigator.serviceWorker.ready
        })
        .then(() => {
          if (!navigator.serviceWorker.controller && authenticated) {
            window.location.reload()
          }
        })
        .catch((error) => {
          console.error('Error al registrar el Service Worker:', error)
        })
    }
  }, [])
 
  return null
}