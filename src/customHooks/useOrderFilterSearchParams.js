import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getFilterFromSearchParams } from '../services/order'
import { getExistingProperties } from '../services/util.service'

export function useOrderFilterSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(getFilterFromSearchParams(searchParams))

  useEffect(() => {
    const parsed = getFilterFromSearchParams(searchParams)
    setFilterBy(parsed)
}, [searchParams])

  useEffect(() => {
    setFilterBy(getFilterFromSearchParams(searchParams))
  }, [searchParams])

  function setExistOrderFilterSearchParams(newFilterBy) {
    setSearchParams(getExistingProperties(newFilterBy))
    setFilterBy(newFilterBy)
  }

  return { filterBy, setExistOrderFilterSearchParams }
}
