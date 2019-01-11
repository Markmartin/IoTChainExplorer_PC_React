import React from 'react'
import '../css/TransactionCell.css'

class TransactionHeader extends React.Component {
    render() {
        return (
            <div className="TransactionListColumn">
                <label className="ColumnTxHash ListColumnFont">Txhash</label>
                <label className="ColumnHeight ListColumnFont">Height</label>
                <label className="ColumnAge ListColumnFont">Age</label>
                <label className="ColumnFrom ListColumnFont">From</label>
                <label className="ColumnTo ListColumnFont">To</label>
                <label className="ColumnValue ListColumnFont">Value</label>
                <label className="ColumnTxfee ListColumnFont">Txfee</label>
            </div>
        )
    }
}

export default TransactionHeader