import { useRef, useState } from "react";
import { CapacityDropdown } from "./CapacityDropdown";

export function SearchBarCapacityDrowdown({isOpen, onOpen, onClose, adultsFilter, childrenFilter, infantsFilter, petsFilter, onUpdateFilterBy, parentRef}){
    
    

        function onGuestsNumChange(){
            onUpdateFilterBy({})
        }

    // useEffect(()=>{
    //     setCapacityFilterToEdit({capacity: adultsNum + childrenNum + infantsNum + petsNum})
    // }, [adultsNum, childrenNum, infantsNum, petsNum])
    

    return(
        isOpen ? (
      
        <CapacityDropdown adultsFilter={adultsFilter} childrenFilter={childrenFilter} infantsFilter={infantsFilter} petsFilter={petsFilter} onGuestsNumChange={onGuestsNumChange}/>
      </div>
    ):
    null
    )
}