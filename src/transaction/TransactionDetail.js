import React from 'react'
import httpManager from '../http/httpManager'
import moment from 'moment';
import { message } from 'antd';

import Loading from '../general/Loading'
import Header from '../general/Header'
import Footer from '../general/Footer'
import DetailCell from '../general/DetailCell'

import '../css/TransactionDetail.css'

import InputLogo from '../asset/edit_icon.png'
import TextArea from 'antd/lib/input/TextArea';

class TransactionDetailView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hash: props.match.params.hash,
            transaction: {},
            loading: false
        }
    }

    jumpToHolderOrContactByAddressType(type, address) {
        if (type === 0) {
            this.props.history.push('/holder/' + address)
        }

        if (type === 1) {
            message.info('Smart Contact will coming soon');
        }
    }

    render() {
        return (
            <div className="TransactionDetail">
                <Loading loading={this.state.loading} />
                <Header />
                <div className="TransactionContent">
                    <div className="TransactionContainer">
                        <div className="Transaction">
                            <div className="TransactionTitle">Transaction Information</div>
                            <DetailCell payload={{ tag: 'Txhash', value: this.state.transaction.hash }} />
                            <DetailCell payload={{ tag: 'Status', value: this.state.transaction.hash ? 'success' : '' }} />
                            <DetailCell payload={{ tag: 'BlockHeight', value: this.state.transaction.blockNumber }} />
                            <DetailCell payload={{ tag: 'TimeStamp', value: this.state.transaction.hash ? this.state.transaction.unixTimestamp : '' }} />
                            <DetailCell
                                payload={{ tag: 'From', value: this.state.transaction.senderAddress }}
                                clickEvent={() => this.jumpToHolderOrContactByAddressType(this.state.transaction.fromAddressType, this.state.transaction.senderAddress)}
                            />
                            <DetailCell
                                payload={{ tag: 'To', value: this.state.transaction.receivingAddress }}
                                clickEvent={() => this.jumpToHolderOrContactByAddressType(this.state.transaction.toAddressType, this.state.transaction.receivingAddress)}
                            />
                            <DetailCell payload={{ tag: 'Value', value: this.state.transaction.value }} />
                            <DetailCell payload={{ tag: 'Tx Cost', value: this.state.transaction.value }} />
                            <DetailCell payload={{ tag: 'Nonce', value: this.state.transaction.nonce }} />
                            <div className="InputData">
                                <img className="logo" src={InputLogo} alt=""></img>
                                <label className="InputTitle">Input Data</label>
                            </div>
                            <TextArea className="DataArea" readOnly placeholder="Transaction Information..." value={this.state.transaction.input}>
                            </TextArea>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        )
    }

    componentWillMount() {
        if (typeof this.state.hash === 'undefined') {
            //跳转首页
            this.props.history.push('/')
        } else {
            this.updateTransactionInfo(this.state.hash)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.hash !== this.state.hash) {
            this.updateTransactionInfo(nextProps.match.params.hash)
        }
    }

    async updateTransactionInfo(hash) {
        this.setState({ loading: true })
        var resp = await httpManager.requestTransactionInfoByHash(hash);
        if (resp.status === true) {
            this.setState({ transaction: resp.data.trx })
        } else {
            message.error(resp.msg);
        }
        this.setState({ loading: false })
    }
}

export default TransactionDetailView