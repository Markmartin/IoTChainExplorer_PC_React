import React from 'react'

import '../css/DetailCell.css'

class DetailCellView extends React.Component {
    emptyClick(e) {
        e.preventDefault();
    }
    render() {

        const { payload } = this.props
        const enableClick = typeof this.props.clickEvent === 'undefined' ? false : true
        const clickEvent = typeof this.props.clickEvent === 'undefined' ? this.emptyClick : this.props.clickEvent
        return (
            <div className="DetailCell">
                <label className="DetailCellTag disableClick">{payload.tag}</label>
                <label
                    className={enableClick ? "DetailValue enableClick" : "DetailValue disableClick"}
                    onClick={clickEvent}
                >
                    {payload.value}
                </label>
            </div>
        )
    }
}

export default DetailCellView