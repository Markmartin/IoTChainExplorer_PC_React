import React from 'react'
import { withRouter } from 'react-router'
import moment from 'moment'
import { message } from 'antd';

import '../css/TransactionCell.css'

class TransactionCell extends React.Component {
    jumpToHolderOrContactByAddressType(type, address) {
        if (type === 0) {
            this.props.history.push('/holder/' + address)
        }

        if (type === 1) {
            message.info('Smart Contact will coming soon');
        }
    }
    jumpToTransactionDetailByHash(hash) {
        this.props.history.push('/transaction/' + hash)
    }
    render() {
        const { transaction } = this.props
        return (
            < div className="TransactionCell" >
                <label
                    className="CellTxHash ListCellFont"
                    onClick={() => this.jumpToTransactionDetailByHash(transaction.hash)}
                >
                    {transaction.hash}
                </label>
                <label className="CellHeight ListCellFont">{transaction.blockNumber}</label>
                <label className="CellAge ListCellFont">{moment(parseInt(transaction.unixTimestamp)).format('YYYY-MM-DD hh:mm:ss')}</label>
                <label
                    className="CellFrom ListCellFont"
                    onClick={() => this.jumpToHolderOrContactByAddressType(transaction.fromAddressType, transaction.senderAddress)}
                >
                    {transaction.senderAddress}
                </label>
                <label
                    className="CellTo ListCellFont"
                    onClick={() => this.jumpToHolderOrContactByAddressType(transaction.toAddressType, transaction.receivingAddress)}
                >
                    {transaction.receivingAddress}
                </label>
                <label className="CellValue ListCellFont">{transaction.value}</label>
                <label className="CellTxfee ListCellFont">{parseInt(transaction.gasPrice) * parseInt(transaction.gasLimit)}</label>
            </div >
        )
    }
}

export default withRouter(TransactionCell)