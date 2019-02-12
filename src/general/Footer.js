import React from 'react'
import { message } from 'antd';
import tool from '../utils/tool'
import httpManager from '../http/httpManager'

import '../css/Footer.css'
import ll0 from '../asset/ll0.png'
import ll1 from '../asset/ll1.png'
import ll2 from '../asset/ll2.png'
import ll4 from '../asset/ll4.png'
import ll5 from '../asset/ll5.png'
import ll6 from '../asset/ll6.png'
import ll7 from '../asset/ll7.png'
import ll8 from '../asset/ll8.png'
import ll9 from '../asset/ll9.png'
import ll10 from '../asset/ll10.png'
import ll11 from '../asset/ll11.png'
import ll12 from '../asset/ll12.png'
import wx_qr_code from '../asset/weixin_qr_code.jpg'

class FooterView extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            inputValue: '',
            isShowWxRrCode: false
        })
        this.inputRef = React.createRef()
    }

    onMouseOverWX = () => {
        this.setState({
            isShowWxRrCode: true
        })
    }

    onMouseOutWX = () => {
        this.setState({
            isShowWxRrCode: false
        })
    }

    changeValue(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    subscribeClick(mailAddr) {
        if (mailAddr === '') {
            //Please enter your email address
            message.info('订阅邮箱不能为空')
            return;
        }
        if (tool.validateEmail(mailAddr) === false) {
            //Please enter a correct email address
            message.info('订阅邮箱格式不正确')
            return;
        }

        this.updateSubscribe(mailAddr)

        this.setState({
            inputValue: ''
        })
    }

    async updateSubscribe(mailAddr) {
        var resp = await httpManager.subscribe(mailAddr);
        if (resp.status === true) {
            message.succcess(resp.msg);
        } else {
            message.error(resp.msg);
        }
    }

    render() {
        return (
            <div className="FooterContainer">
                <div className="FooterContent">
                    <div className="FooterLeftBox">
                        <p className="FooterSubscribe">Subscribe</p>
                        <div className="FooterInputBox">
                            <input className="FooterInput" value={this.state.inputValue} onChange={(e) => this.changeValue(e)} type="text" placeholder="Email@example.com"></input>
                            <button className="FooterInputSubmit" onClick={() => this.subscribeClick(this.state.inputValue)}>SUBSCRIBE</button>
                        </div>
                    </div>
                    <div className="FooterRightBox">
                        <div className="FooterLinkIconBox">
                            <button className="FooterWX" target='_blank' onMouseOver={this.onMouseOverWX} onMouseOut={this.onMouseOutWX}>
                                <img className="ImgAIcon" src={ll0} alt=""></img>
                                {this.state.isShowWxRrCode ? <img className="WXQrCodeIcon" src={wx_qr_code} alt="" /> : null}
                            </button>
                            <a className="ImgA" href="https://twitter.com/IoT_Chain" target="_blank" rel="nofollow me noopener noreferrer">
                                <img className="ImgAIcon" src={ll1} alt="" />
                            </a>
                            <a className="ImgA" href="https://www.facebook.com/IoTChain/" target="_blank" rel="nofollow me noopener noreferrer">
                                <img className="ImgAIcon" src={ll2} alt="" />
                            </a>
                            <a className="ImgA" href="https://t.me/IoTChain" target="_blank" rel="nofollow me noopener noreferrer">
                                <img className="ImgAIcon" src={ll4} alt="" />
                            </a>
                            <a className="ImgA" href="http://qm.qq.com/cgi-bin/qm/qr?k=CjS_9da0Uj5SfXX8Wm1PIDuL_Nbjzmc3" target="_blank" rel="nofollow me noopener noreferrer">
                                <img className="ImgAIcon" src={ll5} alt="" />
                            </a>
                            <a className="ImgA" href="https://www.reddit.com/r/iotchain/" target="_blank" rel="nofollow me noopener noreferrer">
                                <img className="ImgAIcon" src={ll6} alt="" />
                            </a>
                        </div>

                        <div className="FooterLinkIconBox MarginTop10">
                            <a className="ImgA" href="https://github.com/c-block" target="_blank" rel="nofollow me noopener noreferrer">
                                <img className="ImgAIcon" src={ll7} alt="" />
                            </a>
                            <a className="ImgA" href="mailto:support@iotchain.io" target="_blank" rel="nofollow me noopener noreferrer">
                                <img className="ImgAIcon" src={ll8} alt="" />
                            </a>
                            <a className="ImgA" href="https://medium.com/iot-chain" target="_blank" rel="nofollow me noopener noreferrer">
                                <img className="ImgAIcon" src={ll9} alt="" />
                            </a>
                            <a className="ImgA" href="https://steemit.com/@iot-chain" target="_blank" rel="nofollow me noopener noreferrer">
                                <img className="ImgAIcon" src={ll10} alt="" />
                            </a>
                            <a className="ImgA" href="https://www.youtube.com/channel/UCJPaVb7NlxhfCHRkz6yuXBw" target="_blank" rel="nofollow me noopener noreferrer">
                                <img className="ImgAIcon" src={ll11} alt="" />
                            </a>
                            <a className="ImgA" href="https://open.kakao.com/o/gOZK2gY" target="_blank" rel="nofollow me noopener noreferrer">
                                <img className="ImgAIcon" src={ll12} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FooterView