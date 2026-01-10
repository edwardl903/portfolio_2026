import { useState, useEffect, useRef } from 'react'

export function useTypewriter(roles, speed = 100) {
  const [currentText, setCurrentText] = useState('')
  const roleIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const isDeletingRef = useRef(false)

  useEffect(() => {
    const type = () => {
      const currentRole = roles[roleIndexRef.current]
      
      if (isDeletingRef.current) {
        if (charIndexRef.current > 0) {
          charIndexRef.current--
          setCurrentText(currentRole.substring(0, charIndexRef.current))
          setTimeout(type, 50)
        } else {
          isDeletingRef.current = false
          roleIndexRef.current = (roleIndexRef.current + 1) % roles.length
          setTimeout(type, 500)
        }
      } else {
        if (charIndexRef.current < currentRole.length) {
          charIndexRef.current++
          setCurrentText(currentRole.substring(0, charIndexRef.current))
          setTimeout(type, speed)
        } else {
          isDeletingRef.current = true
          setTimeout(type, 2000)
        }
      }
    }

    const timeoutId = setTimeout(type, speed)
    return () => clearTimeout(timeoutId)
  }, [roles, speed])

  return currentText
}

