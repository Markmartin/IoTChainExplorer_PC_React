import React from 'react'
import httpManager from '../http/httpManager'
import { Pagination, message } from 'antd';

import Loading from '../general/Loading'
import Header from '../general/Header'
import Footer from '../general/Footer'
import TransactionHeader from '../general/TransactionHeader'
import TransactionCell from '../general/TransactionCell'

import '../css/WholeTransaction.css'

class WholeTransactionView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            amount: 0,
            transactions: [],
            loading: false
        }
    }
    render() {
        return (
            <div className="WholeTransaction">
                <Loading loading={this.state.loading} />
                <Header />
                <div className="WholeTransactionContent">
                    <div className="WholeTransactionContainer">
                        <div className="WholeTransactionList">
                            <div className="WholeTransactionTitle">Transactions</div>
                            <TransactionHeader />
                            {
                                this.state.transactions.map((transaction, index) => (
                                    <TransactionCell transaction={transaction} key={index} />
                                ))
                            }
                        </div>
                        <div className="PaginationContainer">
                            <Pagination simple total={this.state.amount} defaultPageSize={15} current={this.state.page} onChange={(page) => this.changePage(page)} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    componentWillMount() {
        this.updateWholeTransactions(this.state.page)
    }

    changePage(page) {
        this.updateWholeTransactions(page)
    }

    async updateWholeTransactions(page) {
        this.setState({ loading: true })
        var resp = await httpManager.requestWholeTransactions(page);
        if (resp.status === true) {
            this.setState(resp.data)
        } else {
            message.error(resp.msg);
        }
        this.setState({ loading: false })
    }
}

export default WholeTransactionView