import { createContext, useState } from "react";

export const ScrollContext = createContext()

export function ScrollProvider({children}) {
    const [isScrolledPast, setIsScrolledPast] = useState(false)

    return(
        <ScrollProvider value={{isScrolledPast, setIsScrolledPast}}>{children}</ScrollProvider>
    )
}