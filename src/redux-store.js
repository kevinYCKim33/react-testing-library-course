import {createStore} from 'redux'
import {reducer} from './redux-reducer'

const store = createStore(reducer) // you hook it up with a <Provider> then you get the store...

export {store}
