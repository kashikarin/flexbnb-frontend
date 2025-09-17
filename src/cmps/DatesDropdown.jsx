import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../assets/styles/cmps/DatesDropdown.scss';

export function DatesDropdown({ isOpen, checkIn, checkOut, onSetDates }) {
  
  function handleSelect(dates) {
    const [start, end] = dates
    console.log("🚀 ~ dates:", dates)
    onSetDates({ checkIn: start, checkOut: end })
  }

  return (
    <section>
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
