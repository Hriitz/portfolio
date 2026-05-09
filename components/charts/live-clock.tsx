'use client'

import { useEffect, useState } from 'react'

function pad(n: number) { return String(n).padStart(2, '0') }

function istNow() {
  const now = new Date()
  // IST = UTC+5:30
  return new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60000)
}

interface Props {
  /** 'inline' = HH:MM:SS, 'split' = h+m and seconds rendered separately */
  variant?: 'inline' | 'split'
  showLabel?: boolean
  className?: string
}

export function LiveClock({ variant = 'inline', showLabel = true, className }: Props) {
  // Render an empty placeholder on the server so SSR & client agree until mounted.
  const [ist, setIst] = useState<Date | null>(null)

  useEffect(() => {
    setIst(istNow())
    const t = setInterval(() => setIst(istNow()), 1000)
    return () => clearInterval(t)
  }, [])

  if (!ist) {
    return (
      <span className={`font-mono text-muted ${className ?? ''}`}>
        {variant === 'split' ? '--:--' : '--:--:--'} {showLabel ? 'IST' : ''}
      </span>
    )
  }

  const hh = pad(ist.getHours())
  const mm = pad(ist.getMinutes())
  const ss = pad(ist.getSeconds())

  if (variant === 'split') {
    return (
      <span className={`font-mono ${className ?? ''}`}>
        <span>{hh}:{mm}</span>
        <span className="text-accent">:{ss}</span>
        {showLabel && <span className="text-muted-2 text-[10px] ml-1">IST</span>}
      </span>
    )
  }

  return (
    <span className={`font-mono text-muted ${className ?? ''}`}>
      {hh}:{mm}:{ss}{showLabel ? ' IST' : ''}
    </span>
  )
}
