import { useState } from "react"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"

export function LabelPreview({ label, handleLabelClick }) {
  
  


  return (
    <div className='label-preview' onClick={()=> handleLabelClick(label.name)}>
      <img src={label.imageUrl} alt={label.name} />
      <span>{label.name}</span>
    </div>
  )
}
