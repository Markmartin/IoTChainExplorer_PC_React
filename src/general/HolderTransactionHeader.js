import React from 'react'

import '../css/HolderTransactionCell.css'

class HolderTransactionHeader extends React.Component {
    render() {
        return (
            <div className="HolderTransactionListColumn">
                <label className="ColumnTxHash ListColumnFont">Txhash</label>
                <label className="ColumnHeight ListColumnFont">Height</label>
                <label className="ColumnAge ListColumnFont">Age</label>
                <label className="ColumnFrom ListColumnFont">From</label>
                <label className="ColumnFlow ListColumnFont"></label>
                <label className="ColumnTo ListColumnFont">To</label>
                <label className="ColumnValue ListColumnFont">Value</label>
                <label className="ColumnTxfee ListColumnFont">Txfee</label>
            </div>
        )
    }
}

export default HolderTransactionHeader