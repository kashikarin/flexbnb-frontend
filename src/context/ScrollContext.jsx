import { createContext, useState } from "react";

export const ScrollContext = createContext({
    isImgScrolledPast: '',
    setIsImgScrolledPast: ()=>{},
    isStickyScrolledPast: '',
    setIsStickyScrolledPast: ()=>{}
})

export function ScrollProvider({children}) {
    const [isImgScrolledPast, setIsImgScrolledPast] = useState(false)
    const [isStickyScrolledPast, setIsStickyScrolledPast] = useState(false)
    return(
        <ScrollContext.Provider value={{isImgScrolledPast, setIsImgScrolledPast, isStickyScrolledPast, setIsStickyScrolledPast}}>{children}</ScrollContext.Provider>
    )
}