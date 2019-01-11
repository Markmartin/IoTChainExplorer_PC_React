import React from 'react'
import { withRouter } from 'react-router'
import moment from 'moment'
import { message } from 'antd';

import '../css/HolderTransactionCell.css'

class HolderTransactionCell extends React.Component {
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
            < div className="HolderTransactionCell" >
                <label
                    className="CellTxHash ListCellFont enableClick"
                    onClick={() => this.jumpToTransactionDetailByHash(transaction.hash)}
                >
                    {transaction.hash}
                </label>
                <label className="CellHeight ListCellFont">{transaction.blockNumber}</label>
                <label className="CellAge ListCellFont">{moment(parseInt(transaction.unixTimestamp)).format('YYYY-MM-DD hh:mm:ss')}</label>
                <button
                    className={!this.props.flow === true ? "CellFrom ListCellFont disableClick" : "CellFrom ListCellFont enableClick"}
                    onClick={() => this.jumpToHolderOrContactByAddressType(transaction.fromAddressType, transaction.senderAddress)}
                    disabled={!this.props.flow}
                >
                    {transaction.senderAddress}
                </button>
                <label className={this.props.flow === true ? "CellFlow ListCellFont CellIn" : "CellFlow ListCellFont CellOut"}>{this.props.flow === true ? 'IN' : 'OUT'}</label>
                <button
                    className={this.props.flow === true ? "CellTo ListCellFont disableClick" : "CellTo ListCellFont enableClick"}
                    onClick={() => this.jumpToHolderOrContactByAddressType(transaction.toAddressType, transaction.receivingAddress)}
                    disabled={this.props.flow}
                >
                    {transaction.receivingAddress}
                </button>
                <label className="CellValue ListCellFont">{transaction.value}</label>
                <label className="CellTxfee ListCellFont">{parseInt(transaction.gasPrice) * parseInt(transaction.gasLimit)}</label>
            </div >
        )
    }
}

export default withRouter(HolderTransactionCell)