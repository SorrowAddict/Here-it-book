'use client'

import { useEffect, useState } from 'react'

type HealthResponse = {
  ok: boolean
}

export function HealthBadge() {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json() as Promise<HealthResponse>)
      .then((data) => {
        setStatus(data.ok ? 'ok' : 'error')
      })
      .catch(() => {
        setStatus('error')
      })
  }, [])

  if (status === 'loading') {
    return <span>Checking API...</span>
  }

  if (status === 'error') {
    return <span>API unavailable</span>
  }

  return <span>API healthy</span>
}
