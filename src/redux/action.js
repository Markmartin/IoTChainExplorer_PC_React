import httpManager from '../http/httpManager'

const REQUEST_LATEST_BLOCK = 'REQUEST_LATEST_BLOCK'
const UPDATE_LATEST_BLOCK = 'UPDATE_LATEST_BLOCK'

const REQUEST_LATEST_TRANSACTION = 'REQUEST_LATEST_TRANSACTION'
const UPDATE_LATEST_TRANSACTION = 'UPDATE_LATEST_TRANSACTION'

export const type = {
    REQUEST_LATEST_BLOCK,
    UPDATE_LATEST_BLOCK,
    REQUEST_LATEST_TRANSACTION,
    UPDATE_LATEST_TRANSACTION
}


export const actionGenerator = (type, payload) => {
    switch (type) {
        case REQUEST_LATEST_BLOCK:
            return async (dispatch, getState) => {
                var resp = await httpManager.requestLatestBlocks();
                if (resp.status === true) {
                    dispatch(actionGenerator(UPDATE_LATEST_BLOCK, resp.data))
                } else {
                    //提示未获取到数据的原因
                }
            }
        case REQUEST_LATEST_TRANSACTION:
            return async (dispatch, getState) => {
                var resp = await httpManager.requestLatestTransactions();
                if (resp.status === true) {
                    dispatch(actionGenerator(UPDATE_LATEST_TRANSACTION, resp.data))
                } else {
                    //提示未获取到数据的原因
                }
            }
        default:
            return {
                type: (typeof type === undefined) ? '' : type,
                payload: (typeof payload === undefined) ? {} : payload
            }
    }

}