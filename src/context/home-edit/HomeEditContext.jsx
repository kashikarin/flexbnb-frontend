import { createContext, useState } from "react";
import { homeService } from "../../services/home";

export const HomeEditContext = createContext({
    step: '',
    setStep: ()=>{},
    potentiaHome: {},
    setPotentiaHome: ()=>{}
})

export function HomeEditProvider({children}) {
    const [step, setStep] = useState(1)
    const [potentiaHome, setPotentiaHome] = useState(homeService.getEmptyHome())
    return(
        <HomeEditContext.Provider value={{step, setStep, }}>{children}</HomeEditContext.Provider>
    )
} 