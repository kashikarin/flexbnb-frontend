export function LabelPreview({ label }) {
  return (
    <div className='label-preview'>
      <img src={label.imgUrl} alt={label.label} />
      <span>{label.label}</span>
    </div>
  )
}
