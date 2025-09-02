import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { setFilterBy } from "../store/actions/home.actions"
import { homeService } from "../services/home"
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