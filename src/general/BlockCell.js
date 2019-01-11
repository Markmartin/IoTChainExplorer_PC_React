import React from 'react'
import { withRouter } from 'react-router'
import moment from 'moment'
import '../css/BlockCell.css'

class BlockCell extends React.Component {
    jumpToBlockDetail(blockUUID) {
        this.props.history.push('/block/' + blockUUID)
    }
    render() {
        const { block } = this.props
        return (
            < div className="BlockCell" >
                <label className="CellHeight ListCellFont enableClick" onClick={() => this.jumpToBlockDetail(block.number)}>{block.number}</label>
                <label className="CellAge ListCellFont disableClick">{moment(parseInt(block.unixTimestamp)).format('YYYY-MM-DD hh:mm:ss')}</label>
                <label className="CellTxn ListCellFont disableClick">{block.txAmount}</label>
                <label className="CellBlockHash ListCellFont enableClick" onClick={() => this.jumpToBlockDetail(block.hash)}>{block.hash}</label>
                <label className="CellGasUsed ListCellFont disableClick">{block.gasUsed}</label>
            </div >
        )
    }
}

export default withRouter(BlockCell)