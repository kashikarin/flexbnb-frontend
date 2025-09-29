import { legacy_createStore as createStore, combineReducers } from 'redux'
import { homeReducer } from './reducers/home.reducer'
import { userReducer } from './reducers/user.reducer'
import { reviewReducer } from './reducers/review.reducer'
import { systemReducer } from './reducers/system.reducer'
import { orderReducer } from './reducers/order.reducer'
import { homeEditReducer } from './reducers/home-edit.reducer'
import { scrollReducer } from './reducers/scroll.reducer'
import { draftOrderReducer } from './reducers/draft-order.reducer'

const rootReducer = combineReducers({
  homeModule: homeReducer,
  userModule: userReducer,
  orderModule: orderReducer,
  systemModule: systemReducer,
  reviewModule: reviewReducer,
  homeEditModule: homeEditReducer,
  scrollModule: scrollReducer,
  draftOrderModule: draftOrderReducer
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined
export const store = createStore(rootReducer, middleware)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })
