import { useState } from "react"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"

export function LabelPreview({ label, filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  console.log('render')
  function handleClick(event){
      console.log('clicked')
  }

  return (
    <div className='label-preview' onClick={handleClick} onClickCapture={() => console.log('LABEL capture')}>
      <img src={label.imgUrl} alt={label.name} />
      <span>{label.name}</span>
    </div>
  )
}
