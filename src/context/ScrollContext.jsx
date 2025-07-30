import { createContext, useState } from "react";

export const ScrollContext = createContext({
    isImgScrolledPast: '',
    setIsImgScrolledPast: ()=>{},
    isStickyScrolledPast: '',
    setIsStickyScrolledPast: ()=>{},
    isScrolled: '',
    setIsScrolled: ()=>{}
})

export function ScrollProvider({children}) {
    const [isImgScrolledPast, setIsImgScrolledPast] = useState(false)
    const [isStickyScrolledPast, setIsStickyScrolledPast] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    
    
    return(
        <ScrollContext.Provider value={{isImgScrolledPast, setIsImgScrolledPast, isStickyScrolledPast, setIsStickyScrolledPast, isScrolled, setIsScrolled}}>{children}</ScrollContext.Provider>
    )
}