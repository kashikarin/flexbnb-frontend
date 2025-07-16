export function LabelPreview({ label }) {
  return (
    <div className='label-preview'>
      <img src={label.imgUrl} alt={label.name} />
      <span>{label.name}</span>
    </div>
  )
}
