import { use } from 'react'
import { useState, useEffect } from 'react'

export function FilterDropdown({ isOpen, onClose }) {
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, onClose])
  if (!isOpen) return null

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-container' onClick={(e) => e.stopPropagation()}>
        {/* כאן יהיה התוכן */}
        <h2>Filters Modal</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
