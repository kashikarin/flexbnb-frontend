import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export function DatesDropdownMobile({ isOpen, onSetDates }) {
  const [range, setRange] = useState([null, null])
  const [startDate, endDate] = range

  function handleSelect(dates) {
    const [start, end] = dates
    setRange(dates)
    if (start && end) {
      onSetDates({ checkIn: start, checkOut: end })
    }
  }

  return (
    <section className="dates-dropdown-wrapper_mobile">
      {isOpen && (
        <div className="dates-dropdown-panel_mobile">
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleSelect}
            inline
            minDate={new Date()}
          />
        </div>
      )}
    </section>
  )
}
