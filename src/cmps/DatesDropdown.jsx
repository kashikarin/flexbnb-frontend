import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function DatesDropdown({ dropdownRef, checkIn, checkOut,onSetDates, isOpen }) {
  
  function handleSelect(dates) {
    const [start, end] = dates
    onSetDates({ checkIn: start, checkOut: end })
  }

  console.log('checkIn:', checkIn)
  console.log('checkOut:', checkOut)

  return (
    <section ref={dropdownRef}>
      {isOpen && (
      <div className="dates-dropdown-panel">
        <DatePicker
          selected={checkIn}
          onChange={handleSelect}
          startDate={checkIn}
          endDate={checkOut}
          selectsRange
          monthsShown={2}
          inline
          minDate={new Date()}
        />
      </div>
      )}
    </section>
  )
}
