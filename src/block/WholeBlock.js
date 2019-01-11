import React from 'react'
import httpManager from '../http/httpManager'
import { Pagination, message } from 'antd';


import Loading from '../general/Loading'
import Header from '../general/Header'
import Footer from '../general/Footer'
import BlockHeader from '../general/BlockHeader'
import BlcokCell from '../general/BlockCell'

import '../css/WholeBlock.css'


class WholeBlockView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            amount: 0,
            blocks: [],
            loading: false
        }
    }
    render() {
        return (
            <div className="WholeBlock">
                <Loading loading={this.state.loading} />
                <Header />
                <div className="WholeBlockContent">
                    <div className="WholeBlockContainer">
                        <div className="WholeBlockList">
                            <div className="WholeBlockTitle">Blocks</div>
                            <BlockHeader />
                            {
                                this.state.blocks.map((block, index) => (
                                    <BlcokCell block={block} key={index} />
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
        this.updateWholeBlocks(this.state.page)
    }

    changePage(page) {
        this.updateWholeBlocks(page)
    }

    async updateWholeBlocks(page) {
        this.setState({ loading: true })
        var resp = await httpManager.requestWholeBlocks(page);
        if (resp.status === true) {
            this.setState(resp.data)
        } else {
            message.error(resp.msg);
        }
        this.setState({ loading: false })
    }
}



export default WholeBlockView