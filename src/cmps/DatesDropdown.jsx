import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../assets/styles/cmps/DatesDropdown.scss';
import { DatesInputs } from './DatesInputs';
import { formatDate } from '../services/util.service';

export function DatesDropdown({ isOpen, isReservationModalDD = false, openedDropdown, handleWhereClick, checkIn, checkOut, nightsNum, onSetDates, bookings = null}) {
  
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
        {isReservationModalDD && (<div className="rm-dates-dropdown-healine-container">
              <div className="rm-dates-dropddown-headline-text-container">
                <span>{(checkIn && checkOut) ? nightsNum + ' nights' : 'Select dates'}</span>
                <span>{(checkIn && checkOut) ? 
                          formatDate(checkIn) + ' - ' + formatDate(checkOut) : 
                          'Select dates'
                          
                      }
                </span>
              </div>
              <DatesInputs 
                checkIn={checkIn || ''}
                checkOut={checkOut || ''}
                withWrapper={true}
                openedDropdown={openedDropdown}
                handleWhereClick={handleWhereClick}
              />
        </div>)}
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
          dayClassName={bookings ? getDayClassName : undefined}
        />
      </div>
      )}
    </section>
  )
}
