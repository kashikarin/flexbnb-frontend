import { useSelector } from 'react-redux'
import { updatePotentialHome } from '../../store/actions/home-edit.actions'
import { utilService } from '../../services/util.service'
import { useRef, useState, useEffect } from 'react'

export function HomeEditStepTwoD() {
  const potentialHome = useSelector(
    (state) => state.homeEditModule.potentialHome
  )
  console.log('🚀 ~ potentialHome:', potentialHome)
  const maxLength = 500
  const { debounce } = utilService
  const debouncedUpdatePotentialHomeRef = useRef(
    debounce(updatePotentialHome, 300)
  ).current
  const [summary, setSummary] = useState(potentialHome?.summary || '')
  const summaryPlaceHolder =
    "You'll always remember your time at this unique place to stay."

  function handleChange(e) {
    setSummary(e.target.value)
  }

  useEffect(() => {
    debouncedUpdatePotentialHomeRef({ ...potentialHome, summary })
  }, [summary])

  return (
    <section
      className="home-edit-step-2-d-container"
      style={{ paddingBlockStart: '10em', marginInline: '0', height: '600px' }}
    >
      <article className="home-edit-step-2-d-title">
        <h1>Create your description</h1>
        <span>Share what makes your place special.</span>
      </article>
      <article className="home-edit-step-2-d-txt-container">
        <div className="home-edit-step-2-d-txt-box">
          <textarea
            rows="7"
            maxLength={500}
            id="potentialHome.summary"
            placeholder={summaryPlaceHolder}
            autoComplete="off"
            value={summary}
            onChange={handleChange}
          />
        </div>
        <article className="home-edit-step-2-d-tabs-control">
          <span>{`${summary.length ?? 0}/${maxLength}`}</span>
        </article>
      </article>
    </section>
  )
}
