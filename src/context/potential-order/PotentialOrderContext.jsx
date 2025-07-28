import { createContext, useState } from "react";
import { orderService } from "../../services/order/order.service.local";
import { addOrder } from "../../store/order.actions";

export const PotentialOrderContext = createContext({
    potentialOrder: {},
    setPotentialOrder: ()=>{},
    setInitialPOrderDetails: ()=>{},
    isConfirmationModalOpen: '',
    setIsConfirmationModalOpen: ()=>{},
    openConfirmationModal: ()=>{},
    closeConfirmationModal: ()=>{},
    onConfirmOrder: ()=>{}
})

export function PotentialOrderProvider({children}) {
    const [potentialOrder, setPotentialOrder] = useState(orderService.getEmptyOrder())
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

    async function setInitialPOrderDetails(homeId, userId, filterBy){
        try{
            const initialPOrderDetails = await orderService.getInitialOrderDetails(homeId, userId, filterBy)
            setPotentialOrder((prevPotentialOrder) => ({ ...prevPotentialOrder, ...initialPOrderDetails }))

        } catch(err){
            console.error('Cannot load potential order data', err)
            throw err
        }
    }

    async function onConfirmOrder() {
        try {
            await addOrder(potentialOrder)
        } catch (err) {
            console.error('Cannot complete order', err)
        }
    }

    function openConfirmationModal() {
        setIsConfirmationModalOpen(true)
    }
    
    function closeConfirmationModal() {
        setIsConfirmationModalOpen(false)
    }
    

    return(
        <PotentialOrderContext.Provider value={{potentialOrder, setPotentialOrder, setInitialPOrderDetails, isConfirmationModalOpen, setIsConfirmationModalOpen, openConfirmationModal, onConfirmOrder, closeConfirmationModal}}>{children}</PotentialOrderContext.Provider>
    )

}