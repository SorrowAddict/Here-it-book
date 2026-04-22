'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    __MSW_STARTED__?: boolean
  }
}

export function MswWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    if (window.__MSW_STARTED__) {
      return
    }

    window.__MSW_STARTED__ = true

    void import('@/mocks/browser')
      .then(({ worker }) => {
        return worker.start({ onUnhandledRequest: 'bypass' })
      })
      .catch(() => {
        window.__MSW_STARTED__ = false
      })
  }, [])

  return null
}
