import React from 'react'

class BlockHeader extends React.Component {
    render() {
        return (
            <div className="BlockListColumn">
                <label className="ColumnHeight ListColumnFont">Height</label>
                <label className="ColumnAge ListColumnFont">Age</label>
                <label className="ColumnTxn ListColumnFont">txn</label>
                <label className="ColumnBlockHash ListColumnFont">BlockHash</label>
                <label className="ColumnGasUsed ListColumnFont">GasUsed</label>
            </div>
        )
    }
}

export default BlockHeader