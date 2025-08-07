import { createContext, useState } from "react";
import { homeService } from "../../services/home";

export const HomeEditContext = createContext({
    step: '',
    setStep: ()=>{},
    potentiaHome: {},
    setPotentiaHome: ()=>{},
    isStepCompleted: '',
    setIsStepCompleted: ()=>{}
})

export function HomeEditProvider({children}) {
    const [step, setStep] = useState(1)
    const [potentiaHome, setPotentiaHome] = useState(homeService.getEmptyHome())
    const [isStepCompleted, setIsStepCompleted] = useState(false)
    return(
        <HomeEditContext.Provider value={{step, setStep, potentiaHome, setPotentiaHome, isStepCompleted, setIsStepCompleted}}>{children}</HomeEditContext.Provider>
    )
} 