import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterBy } from '../store/stay.actions.js'

export function WhereDropdown(){

    const dropdownRef = useRef()
    const [isOpen, setIsOpen] = useState(false)


    const suggestedPlaces = [
        { title: 'Nearby', subtitle: "Find what's around you" },
        { title: 'Eilat, Israel', subtitle: 'For a trip abroad' },
        { title: 'Tel Aviv-Yafo, Israel', subtitle: 'Popular beach destination' },
        { title: 'Jerusalem, Israel', subtitle: 'For sights like Church of the Holy Sepulchre' },
    ]

    return {
       
    }
}