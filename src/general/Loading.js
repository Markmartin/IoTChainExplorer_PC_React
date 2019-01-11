import React from 'react'
import { Spin } from 'antd';

import '../css/Loading.css'

class Loading extends React.Component {
    render() {
        return (
            this.props.loading &&
            <div className="LoadingMaskLayer">
                <Spin className="loading" size="large" spinning={this.props.loading}></Spin>
            </div>

        )
    }
}

export default Loading