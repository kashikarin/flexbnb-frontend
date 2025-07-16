import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { setFilterBy } from "../store/home.actions"
import { homeService } from "../services/home/home.service.local"
import { getExistingProperties } from "../services/util.service"


export function useFilterSearchParams() {
    
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setFilterBy(homeService.getFilterFromSearchParams(searchParams))
    }, [])

    function setExistFilterSearchParams(filterBy) {
        setSearchParams(getExistingProperties(filterBy))
    }

    return setExistFilterSearchParams

}