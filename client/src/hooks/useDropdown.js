import { useState, useEffect, useRef } from 'react'

const useDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = (e) => {
    e.stopPropagation()
    setIsDropdownOpen(!isDropdownOpen)
  }

  const clickOutsideListener = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickOutsideListener)
    return () => {
      window.removeEventListener('click', clickOutsideListener)
    }
  }, [])

  return { isDropdownOpen, dropdownRef, toggleDropdown }
}

export default useDropdown
