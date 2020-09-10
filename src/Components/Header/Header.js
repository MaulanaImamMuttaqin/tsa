import React from 'react'
import '../../App.css'
import './style/header.css'
import Logo from "../../assets/image/logo4.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


function Header() {
    return (
        <div className="header">
              <div className="container">

                  <div className="header-left">
                   <img className="logo-tittle center-container" src={Logo} alt=""/>   
                  </div>

                  <div className="header-center center-container">
                    <form className="form center-container">
                        <input type="text" className="search" placeholder="Cari apa yang anda inginkan"/>
                        <button className="sub" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                    </form>
                  </div>

                  <div className="header-right">
                    <a href="">Masuk</a><a href="">Daftar</a>
                  </div>
              </div>
        </div>
    )
}

export default Header
