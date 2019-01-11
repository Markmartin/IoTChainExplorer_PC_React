import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { type, actionGenerator } from '../redux/action'

import SearchView from '../general/Search'
import BlockHeader from '../general/BlockHeader'
import BlcokCell from '../general/BlockCell'
import TransactionHeader from '../general/TransactionHeader'
import TransactionCell from '../general/TransactionCell'
import Footer from '../general/Footer'


import '../css/Home.css'
import logo from '../asset/logo.png'

class HomeView extends React.Component {
    //跳转到所有块页面
    jumpToWholeBlock = () => {
        this.props.history.push('/blocks')
    }
    //跳转到所有交易页面
    jumpToWholeTransaction = () => {
        this.props.history.push('/transactions')
    }
    render() {
        const blockTitle = 'Block'
        const transactionTitle = 'Transaction'
        const BtnDes = 'View All'
        return (
            <div className="HomeView">
                {/* 头部 */}
                <div className="HomeHeader">
                    <div className="HomeHeaderLink">
                        <a href="https://iotchain.io/explorer">
                            <img className="logo" src={logo} alt="IoT Chain"></img>
                        </a>
                        <a className="OfficialWeb" href="https://iotchain.io/">iotchain.io</a>
                    </div>
                    <label className="HomeTitle">IoT Chain Explorer</label>
                    <div className="SearchContainer">
                        <SearchView />
                    </div>
                </div>
                {/* 内容 */}
                <div className="HomeContent">
                    <div className="BlockContainer">
                        <div className="BlockList">
                            <div className="ListHeader">
                                <label className="ListTitle">{blockTitle}</label>
                                <button className="ShowAll" onClick={() => this.jumpToWholeBlock()}>{BtnDes}</button>
                            </div>
                            <div className="ListContent">
                                <BlockHeader />
                                {
                                    this.props.blocks.map((block, index) => (
                                        <BlcokCell block={block} key={index} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="TransactionContainer">
                        <div className="transactionList">
                            <div className="ListHeader">
                                <label className="ListTitle">{transactionTitle}</label>
                                <button className="ShowAll" onClick={() => this.jumpToWholeTransaction()}>{BtnDes}</button>
                            </div>
                            <div className="ListContent">
                                <TransactionHeader />
                                {
                                    this.props.transactions.map((transaction, index) => (
                                        <TransactionCell transaction={transaction} key={index} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* 尾部 */}
                <Footer />
            </div >
        )
    }
    componentWillMount() {
        this.props.requestLatestBlocks();
        this.props.requestLatestTransactions();
    }
}

const mapStateToProps = (state) => {
    return {
        blocks: state.latestBlocks.blocks,
        transactions: state.latestTransactions.transactions,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestLatestBlocks: () => {
            dispatch(actionGenerator(type.REQUEST_LATEST_BLOCK))
        },
        requestLatestTransactions: () => {
            dispatch(actionGenerator(type.REQUEST_LATEST_TRANSACTION))
        }
    }
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(HomeView))

export default Home