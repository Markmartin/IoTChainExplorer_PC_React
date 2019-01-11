import React from 'react'
import { withRouter } from 'react-router'
import { BigNumber } from 'bignumber.js';
import httpManager from '../http/httpManager'
import { Pagination, message } from 'antd';


import Loading from '../general/Loading'
import Header from '../general/Header'
import Footer from '../general/Footer'
import HolderTransactionHeader from '../general/HolderTransactionHeader'
import HolderTransactionCell from '../general/HolderTransactionCell'

import '../css/Holder.css'

class HolderView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            amount: 0,
            transactions: [],
            loading: false,
            address: props.match.params.address,
            balance: 'no balance'
        }
    }

    render() {
        return (
            <div className="Holder">
                <Loading loading={this.state.loading} />
                <Header />
                <div className="HolderHeader">
                    <div className="HolderHeaderContainer">
                        <div className="HolderHeaderContent">
                            <label className="Title">Holder</label>
                            <div className="TagContainer">
                                <label className="TagTitle">Address</label>
                                <label className="TagValue">{this.state.address}</label>
                            </div>
                            <div className="TagContainer">
                                <label className="TagTitle">Balance</label>
                                <label className="TagValue">{new BigNumber(new BigNumber(this.state.balance).div(new BigNumber('1e18'))).toString()}</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="HolderContent">
                    <div className="HolderContentContainer">
                        <div className="HolderTransactionList">
                            <div className="HolderTransactionTitle">Transactions</div>
                            <HolderTransactionHeader />
                            {
                                this.state.transactions.map((transaction, index) => (
                                    <HolderTransactionCell transaction={transaction} flow={this.state.address === transaction.receivingAddress ? true : false} key={index} />
                                ))
                            }
                        </div>

                    </div>
                    <div className="PaginationContainer">
                        <Pagination simple total={this.state.amount} defaultPageSize={15} current={this.state.page} onChange={(page) => this.changePage(page)} />
                    </div>
                </div>

                <Footer />
            </div>
        )
    }

    componentWillMount() {
        if (typeof this.state.address === 'undefined') {
            //跳转首页
            this.props.history.push('/')
        } else {
            this.updateHolderInfo(this.state.page, this.state.address)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.address !== this.state.address) {
            this.updateHolderInfo(1, nextProps.match.params.address)
        }
    }

    changePage(page) {
        this.updateHolderInfo(page, this.state.address)
    }

    async updateHolderInfo(page, address) {
        this.setState({ loading: true })
        var resp = await httpManager.requestTransactionsByAddress(page, address);
        if (resp.status === true) {
            this.setState({ ...resp.data, transactions: resp.data.trx, address: address })
        } else {
            message.error(resp.msg);
        }
        this.setState({ loading: false })
    }
}


export default withRouter(HolderView)

