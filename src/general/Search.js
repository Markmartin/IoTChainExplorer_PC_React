import React from 'react';
import { withRouter } from 'react-router'
import { message } from 'antd';
import '../css/Search.css'

class SearchView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
        this.searchRef = React.createRef()
    }
    searchClick(searchStr) {
        if (searchStr.length !== 42 && searchStr.length !== 66 && searchStr.substr(0, 2) !== '0x' && !Number.isInteger(parseInt(searchStr))) {
            //格式不合规
            message.error('查询地址不符合规范');
        }

        if (searchStr.length === 42) {
            //跳到用户页面
            this.props.history.push('/holder/' + searchStr)
        }

        if (searchStr.length === 66) {
            //跳到交易详情页面
            this.props.history.push('/transaction/' + searchStr)
        }

        if (Number.isInteger(parseInt(searchStr))) {
            this.props.history.push('/block/' + searchStr)
        }

        this.setState({
            inputValue: ''
        })
    }

    changeValue(e) {
        this.setState({
            inputValue: e.target.value
        })
    }
    render() {
        return (
            <div className="searchFrame">
                <input className="SearchInput" type="text" value={this.state.inputValue} onChange={(e) => this.changeValue(e)} placeholder="Search by Address / TxHash" ref={this.searchRef} />
                <button className="SearchButton" onClick={() => this.searchClick(this.searchRef.current.value)}></button>
            </div>
        )
    }
}

export default withRouter(SearchView)