export function LabelPreview({ label, handleLabelClick }) {
  return (
    <div className='label-preview' onClick={()=> handleLabelClick(label.name)}>
      <img src={label.imageUrl} alt={label.name} />
      <span>{label.name}</span>
    </div>
  )
}
