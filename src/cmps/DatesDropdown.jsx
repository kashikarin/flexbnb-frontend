import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function DatesDropdown({ dropdownRef, checkIn, checkOut,onSetDates, isOpen }) {
  
  function handleSelect(dates) {
    const [start, end] = dates
    console.log("🚀 ~ dates:", dates)
    onSetDates({ checkIn: start, checkOut: end })
  }

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
          shouldCloseOnSelect={false}
          monthsShown={2}
          inline
          minDate={new Date()}
        />
      </div>
      )}
    </section>
  )
}
