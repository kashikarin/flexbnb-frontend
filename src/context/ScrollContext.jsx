import { createContext, useState } from "react";

export const ScrollContext = createContext()

export function ScrollProvider({children}) {
    const [isScrolledPast, setIsScrolledPast] = useState(false)

    return(
        <ScrollContext.Provider value={{isScrolledPast, setIsScrolledPast}}>{children}</ScrollContext.Provider>
    )
}