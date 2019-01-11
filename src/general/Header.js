import React from 'react'

import Search from './Search'

import '../css/Header.css'

import logo from '../asset/logo.png'



class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <div className="logoContainer">
                    <a href="https://iotchain.io/explorer">
                        <img className="logo" src={logo} alt="IoT Chain"></img>
                    </a>
                </div>

                <div className="searchContainer">
                    <Search />
                </div>
            </div>
        )
    }
}

export default Header