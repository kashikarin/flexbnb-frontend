import { useSelector } from 'react-redux'
import {
  clearPotentialHome,
  closeHomeEditCompletionModal,
  openHomeEditCompletionModal,
  updatePotentialHome,
} from '../../store/actions/home-edit.actions'
import { useEffectUpdate } from '../../customHooks/useEffectUpdate'
import { useRef, useState } from 'react'
import { utilService } from '../../services/util.service'
import { ReactSVG } from 'react-svg'

export function HomeEditStepThreeA() {
  const potentialHome = useSelector(
    (state) => state.homeEditModule.potentialHome
  )
  const [price, setPrice] = useState(potentialHome?.price ?? '')
  const { debounce } = utilService
  const debouncedUpdatePotentialHomeRef = useRef(
    debounce(updatePotentialHome, 300)
  ).current
  const placeholderPrice = 278
  // const {currentStep, currentSubStep} = potentialHome.editProgress
  const effectivePrice = price === '' ? placeholderPrice : Number(price)
  // const {gTotalSteps, gSubStepsPerStep} = potentialHomeService

  useEffectUpdate(() => {
    debouncedUpdatePotentialHomeRef({ ...potentialHome, price: effectivePrice })
  }, [effectivePrice])

  function handleChange(e) {
    let value = e.target.value
    // Remove non-digits
    value = value.replace(/\D/g, '')
    // Prevent leading zero
    if (value.startsWith('0')) value = value.slice(1)
    setPrice(value)
  }

  if (!potentialHome) return null
  return (
    <>
      <section
        className="home-edit-step-3-a-container"
        style={{ paddingBlockStart: '10em' }}
      >
        <article className="home-edit-step-3-a-title">
          <h1>Now, set a price per night</h1>
        </article>
        <article className="home-edit-step-3-a-price-wrapper">
          <span>$</span>
          <input
            type="text"
            style={{ '--chars': (price || String(placeholderPrice)).length }}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            placeholder={placeholderPrice}
            value={price}
            onChange={handleChange}
          />
          <button>
            <ReactSVG src="/svgs/pencil.svg" />
          </button>
        </article>
      </section>
    </>
  )
}
