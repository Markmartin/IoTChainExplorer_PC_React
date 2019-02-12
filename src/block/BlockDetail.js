import React from 'react'
import { withRouter } from 'react-router'
import httpManager from '../http/httpManager'
import { message } from 'antd';

import Loading from '../general/Loading'
import Header from '../general/Header'
import Footer from '../general/Footer'
import DetailCell from '../general/DetailCell'

import '../css/BlockDetail.css'

class BlockDetailView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blockUUID: props.match.params.blockUUID,
            blockNumber: -1,
            blockHash: '',
            block: {},
            loading: false
        }
    }
    jumpToBlockDetail(blockUUID) {
        this.props.history.push('/block/' + blockUUID)
    }
    render() {
        const { block } = this.state
        return (
            <div className="BlockDetail">
                <Loading loading={this.state.loading} />
                <Header />
                <div className="BlockDetailContent">
                    <div className="BlockDetailContainer">
                        <div className="Block">
                            <div className="BlockTitle">Block Information</div>
                            <DetailCell payload={{ tag: 'Height', value: block.number }} />
                            <DetailCell payload={{ tag: 'status', value: block.hash ? 'success' : '' }} />
                            <DetailCell payload={{ tag: 'txn', value: block.txAmount }} />
                            <DetailCell payload={{ tag: 'hash', value: block.hash }} />
                            <DetailCell
                                payload={{ tag: 'Parent Hash', value: block.parentHash }}
                            // clickEvent={() => this.jumpToBlockDetail(block.parentHash)}
                            />
                            <DetailCell payload={{ tag: 'Difficulty', value: block.difficulty }} />
                            <DetailCell payload={{ tag: 'gasUsed', value: block.gasUsed }} />
                            <DetailCell payload={{ tag: 'gasLimit', value: block.gasLimit }} />
                            <DetailCell payload={{ tag: 'nonce', value: block.nonce ? block.nonce : 'null' }} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
    componentWillMount() {
        if (typeof this.state.blockUUID === 'undefined') {
            //跳转首页
            this.props.history.push('/')
            return;
        }

        this.updateBlockInfo(this.state.blockUUID)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.blockUUID !== this.state.blockUUID) {
            //页面刷新
            this.updateBlockInfo(nextProps.match.params.blockUUID)
        }
    }

    async updateBlockInfo(blockUUID) {
        if (blockUUID.length === 66) {
            this.setState({
                blockUUID: blockUUID,
                blockHash: this.props.blockUUID,
                blockNumber: -1,
            })
            //根据hash请求block
            this.updateBlockInfoByHash(blockUUID)
        }

        if (Number.isInteger(parseInt(blockUUID))) {
            this.setState({
                blockUUID: blockUUID,
                blockNumber: blockUUID,
                blockHash: '',
            })
            this.updateBlockInfoByHeight(blockUUID)
        }
    }

    async updateBlockInfoByHeight(blockNumber) {
        this.setState({ loading: true })
        var resp = await httpManager.requestBlockInfoByHeight(blockNumber);
        if (resp.status === true) {
            this.setState({ block: resp.data })
        } else {
            message.error(resp.msg);
        }
        this.setState({ loading: false })
    }

    async updateBlockInfoByHash(blockHash) {
        this.setState({ loading: true })
        var resp = await httpManager.requestBlockInfoByHash(blockHash);
        if (resp.status === true) {
            this.setState({ block: resp.data })
        } else {
            message.error(resp.msg);
        }
        this.setState({ loading: false })
    }

}



export default withRouter(BlockDetailView)