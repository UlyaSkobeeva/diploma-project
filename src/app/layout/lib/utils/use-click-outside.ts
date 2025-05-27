/* Закрыть хедер по нажатию вне области */

import { MutableRefObject, useEffect } from 'react'

type Callback = () => void

export const UseClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: Callback,
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback()
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  })
}
