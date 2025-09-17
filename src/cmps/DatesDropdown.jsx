import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function DatesDropdown({ isOpen, checkIn, checkOut, onSetDates, bookings = null}) {
  
  function handleSelect(dates) {
    const [start, end] = dates
    console.log("🚀 ~ dates:", dates)
    onSetDates({ checkIn: start, checkOut: end })
  }

  function isDateAvailable(date) {
    return !bookings.some(booking => {
      const bookingStart = new Date(booking.checkIn)
      const bookingEnd = new Date(booking.checkOut)
      return date >= bookingStart && date <= bookingEnd
    })
  }

  function isDateBooked(date) {
    return bookings.some(booking => {
      const bookingStart = new Date(booking.checkIn)
      const bookingEnd = new Date(booking.checkOut)
      return date >= bookingStart && date <= bookingEnd
    })
  }

  function getDayClassName(date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0) 

  if (date < today || isDateBooked(date)) {
    return 'unavailable-day'
  }
  return undefined
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
          filterDate={bookings ? isDateAvailable : undefined}
          dayClassName={getDayClassName}
        />
      </div>
      )}
    </section>
  )
}
