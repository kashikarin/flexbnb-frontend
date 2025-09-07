export const SET_HOMEPAGE_SCROLLED = 'SET_HOMEPAGE_SCROLLED'
export const SET_HOMEPAGE_NOT_SCROLLED = 'SET_HOMEPAGE_NOT_SCROLLED'
export const SET_HD_IMG_SCROLLED = 'SET_HD_IMG_SCROLLED'
export const SET_HD_IMG_NOT_SCROLLED = 'SET_HD_IMG_NOT_SCROLLED'
export const SET_HD_STICKYCARD_SCROLLED = 'SET_HD_STICKYCARD_SCROLLED'
export const SET_HD_STICKYCARD_NOT_SCROLLED = 'SET_HD_STICKYCARD_NOT_SCROLLED'

const initialState = {
    isHDImgScrolled: false,
    isHDStickyCardScrolled: false,
    isHomePageScrolled: false
}

export function homeEditReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {
    case SET_HOMEPAGE_SCROLLED: {
      newState = { ...state, isHomePageScrolled: true }
      break
    }
    case SET_HOMEPAGE_NOT_SCROLLED: {
      newState = { ...state, isHomePageScrolled: false }
      break
    }
    case SET_HD_IMG_SCROLLED:
      newState = { ...state, isHDImgScrolled: true }
      break
    case SET_HD_IMG_NOT_SCROLLED:
      newState = { ...state, isHDImgScrolled: false }
      break
    case SET_HD_STICKYCARD_SCROLLED:
      newState = { ...state, isHDStickyCardScrolled: true }
      break
    case SET_HD_STICKYCARD_NOT_SCROLLED:
      newState = { ...state, isHDStickyCardScrolled: false }
      break
    default:
  }
  return newState
}

