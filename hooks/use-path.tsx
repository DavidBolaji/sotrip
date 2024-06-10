'use client'
import {  usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const usePath = () => {
  const pathname = usePathname()

  const [locationCurrent, setLoc] = useState('')

  useEffect(() => {
    const key =
      pathname === '/dashboard'
        ? '/dashboard'
        : pathname === '/dashboard/messages'
        ? '/dashboard/messages'
        : pathname === '/dashboard/notifications'
        ? '/dashboard/notifications'
        : pathname === '/dashboard/profile'
        ? '/dashboard/profile'
        : pathname === '/dashboard/settings'
        ? '/dashboard/settings'
        : pathname === '/dashboard/pro'
        ? '/dashboard/pro'
        : pathname?.split('/')[pathname?.split('/').length - 1]
    setLoc(key)
  }, [pathname])

  return { locationCurrent }
}

export default usePath
