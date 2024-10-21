import { createStore, combineReducers } from 'redux'

import userReducer from './reducers/userReducer.js'

import acountReducer from './reducers/generalAcountReducer.js'
import categoryReducer from '../store/reducers/generalCategoryReducer'
import homeReducer from './reducers/generalHomeReducer'


const reducers = combineReducers({
  user: userReducer,

  acount: acountReducer,
  category: categoryReducer,

  home: homeReducer
})

export default createStore(reducers)