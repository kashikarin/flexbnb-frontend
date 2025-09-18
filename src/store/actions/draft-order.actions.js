import { draftOrderService } from '../../services/draft-order/draft-order.service.local'
import {
  ADD_DRAFT_ORDER,
  CLEAR_DRAFT_ORDER,
  CLOSE_ORDER_CONFIRMATION_MODAL,
  OPEN_ORDER_CONFIRMATION_MODAL,
  UPDATE_DRAFT_ORDER,
} from '../reducers/draft-order.reducer'
import { store } from '../store'

export async function addDraftOrder(homeId, filterBy) {
  try {
    const draftOrder = await draftOrderService.getDraftOrder(
      homeId,
      filterBy
    )
    store.dispatch(getCmdAddDraftOrder(draftOrder))
    return draftOrder
  } catch (err) {
    console.error('Cannot add draft order', err)
    throw err
  }
}

export function removeDraftOrder() {
  store.dispatch(getCmdClearDraftOrder())
}

export function updateDraftOrder(draftOrder) {
  store.dispatch(getCmdUpdateDraftOrder(draftOrder))
  return draftOrder
}

export function closeOrderConfirmationModal() {
  store.dispatch(getCmdCloseOrderConfirmationModal())
}

export function openOrderConfirmationModal() {
  store.dispatch(getCmdOpenOrderConfirmationModal())
}

// Command Creators:

function getCmdAddDraftOrder(draftOrder) {
  return {
    type: ADD_DRAFT_ORDER,
    draftOrder,
  }
}

function getCmdClearDraftOrder() {
  return {
    type: CLEAR_DRAFT_ORDER,
  }
}
function getCmdUpdateDraftOrder(draftOrder) {
  return {
    type: UPDATE_DRAFT_ORDER,
    draftOrder,
  }
}

function getCmdCloseOrderConfirmationModal() {
  return {
    type: CLOSE_ORDER_CONFIRMATION_MODAL,
  }
}

function getCmdOpenOrderConfirmationModal() {
  return {
    type: OPEN_ORDER_CONFIRMATION_MODAL,
  }
}
