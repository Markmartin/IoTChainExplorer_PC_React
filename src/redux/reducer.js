import { combineReducers } from 'redux'
import { type } from './action'

const latestBlocks = (state = {}, action) => {
    switch (action.type) {
        case type.UPDATE_LATEST_BLOCK:
            return action.payload
        default:
            return state
    }
}

const latestTransactions = (state = {}, action) => {
    switch (action.type) {
        case type.UPDATE_LATEST_TRANSACTION:
            return action.payload
        default:
            return state
    }
}



const reducer = combineReducers({
    latestBlocks: latestBlocks,
    latestTransactions: latestTransactions
})

export default reducer