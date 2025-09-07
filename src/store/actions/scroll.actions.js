import { SET_HD_IMG_NOT_SCROLLED, SET_HD_IMG_SCROLLED, SET_HD_STICKYCARD_NOT_SCROLLED, SET_HD_STICKYCARD_SCROLLED, SET_HOMEPAGE_NOT_SCROLLED, SET_HOMEPAGE_SCROLLED } from "../reducers/scroll.reducer"
import { store } from "../store"

export function setHomePageScrolled(){
    store.dispatch(getCmdSetHomePageScrolled())
}

export function setHomePageNotScrolled(){
    store.dispatch(getCmdSetHomePageNotScrolled())
}

export function setHomeDetailsImgScrolled(){
    store.dispatch(getCmdSetHDImgScrolled())
}

export function setHomeDetailsImgNotScrolled(){
    store.dispatch(getCmdSetHDImgNotScrolled())
}

export function setHomeDetailsStickyCardScrolled(){
    store.dispatch(getCmdSetHDStickyCardScrolled())
}

export function setHomeDetailsStickyCardNotScrolled(){
    store.dispatch(getCmdSetHDStickyCardNotScrolled())
}

//comand creators
function getCmdSetHDImgScrolled() {
  return {
    type: SET_HD_IMG_SCROLLED
  }
}

function getCmdSetHDImgNotScrolled() {
  return {
    type: SET_HD_IMG_NOT_SCROLLED
  }
}

function getCmdSetHDStickyCardScrolled(){
    return{
        type: SET_HD_STICKYCARD_SCROLLED
    }
}

function getCmdSetHDStickyCardNotScrolled(){
    return{
        type: SET_HD_STICKYCARD_NOT_SCROLLED
    }
}

function getCmdSetHomePageScrolled(){
    return{
        type: SET_HOMEPAGE_SCROLLED
    }
}

function getCmdSetHomePageNotScrolled(){
    return{
        type: SET_HOMEPAGE_NOT_SCROLLED
    }
}
