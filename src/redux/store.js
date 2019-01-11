import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
//中间件调试工具
import { composeWithDevTools } from 'redux-devtools-extension'

const initState = {
    latestBlocks: {
        blocks: []
    },
    latestTransactions: {
        transactions: []
    }
}

const store = createStore(
    reducer,
    initState,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store