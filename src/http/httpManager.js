import axios from 'axios'
import moment from 'moment'
import CryptoJS from 'crypto-js'
import { respJson } from '../utils/tool'

const version = '/v1'
const baseUrl = 'https://scan.iotchain.io' + version
const signKey = "Ub1kjkh^800123^&xc%1jjz$89$&0jkz01B+abb"

const GET_METHOD = 'get'
// const POST_METHOD = 'POST'

//订阅请求
const subscribe = async (mailAddr) => {
    try {
        var respObject = await axios({
            method: 'post',
            url: 'https://api.iotchain.io/subscribe',
            data: { mailAddr: mailAddr }
        })
        if (respObject.status === 200 && respObject.data.code === 200) {
            return respJson(true, respObject.data.data, respObject.data.msg)
        } else {
            return respJson(false, respObject.data.data, respObject.data.msg)
        }
    } catch (err) {
        return respJson(false, err, err.message)
    }
}

//参数生成
const sign = (time) => {
    return CryptoJS.MD5(signKey + time).toString()
}

//参数 page size 额外身份信息
const generateParams = (...args) => {
    var time = moment().valueOf();
    var param = {
        time: time,
        sign: sign(time),
        page: (typeof args[0] == undefined ? 0 : args[0]),
        size: (typeof args[1] == undefined ? 10 : args[1])
    }
    if (args[2] !== undefined) {
        return { ...param, ...args[2] }
    } else {
        return param
    }
}

//基础请求
const baseRequest = async (method, path, params) => {
    try {
        var respObject = await axios({
            method: method,
            url: baseUrl + path,
            params: params
        })
        if (respObject.status === 200 && respObject.data.code === 200) {
            return respJson(true, respObject.data.data, respObject.data.msg)
        } else {
            return respJson(false, respObject.data.data, respObject.data.msg)
        }
    } catch (err) {
        return respJson(false, err, err.message)
    }
}

//请求最新的块
const requestLatestBlocks = async () => {
    var resp = await baseRequest(GET_METHOD, '/block/queryall', generateParams(1, 5))
    return resp
}

//请求最新的交易
const requestLatestTransactions = async () => {
    var resp = await baseRequest(GET_METHOD, '/transaction/queryall', generateParams(1, 5))
    return resp
}

//请求所有块
const requestWholeBlocks = async (page) => {
    var resp = await baseRequest(GET_METHOD, '/block/queryall', generateParams(page, 15))
    return resp
}

//请求所有交易
const requestWholeTransactions = async (page) => {
    var resp = await baseRequest(GET_METHOD, '/transaction/queryall', generateParams(page, 15))
    return resp
}

//根据address请求相关的所有交易
const requestTransactionsByAddress = async (page, address) => {
    var resp = await baseRequest(GET_METHOD, '/transaction/address', generateParams(page, 15, { address: address }))
    return resp
}

//根据hash查看交易详情
const requestTransactionInfoByHash = async (hash) => {
    var resp = await baseRequest(GET_METHOD, '/transaction/hash', generateParams(0, 0, { hash: hash }))
    return resp
}

//根据高度查看块详情
const requestBlockInfoByHeight = async (blockNumber) => {
    var resp = await baseRequest(GET_METHOD, '/block/query', generateParams(0, 0, { blockNumber: blockNumber }))
    return resp
}

//根据hash查看块详情
const requestBlockInfoByHash = async (blockHash) => {
    var resp = await baseRequest(GET_METHOD, '/block/query', generateParams(0, 0, { blockHash: blockHash }))
    return resp
}

const httpManager = {
    subscribe,
    requestLatestBlocks,
    requestLatestTransactions,
    requestWholeBlocks,
    requestWholeTransactions,
    requestTransactionsByAddress,
    requestTransactionInfoByHash,
    requestBlockInfoByHeight,
    requestBlockInfoByHash
}

export default httpManager

