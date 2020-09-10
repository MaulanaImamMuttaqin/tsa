import React,{useContext}  from 'react'
import '../../App.css'
import './style/header.css'
import Logo from "../../assets/image/logo4.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {ProductContext} from '../ParentComponent'


function Header() {
  const productContext = useContext(ProductContext)

  const submitHandler = e => {
    e.preventDefault()
    alert(`Hello ${productContext.Search.SearchState}`)
  }
  console.log(productContext.Search.SearchState);
    return (
        <div className="header">
              <div className="container">

                  <div className="header-left">
                   <img className="logo-tittle center-container" src={Logo} alt=""/>   
                  </div>

                  <div className="header-center center-container">
                    <form onSubmit={submitHandler} className="form center-container">
                        <input 
                          type="text" 
                          className="search" 
                          placeholder="Cari apa yang anda inginkan"
                          value={productContext.Search.SearchState}
                          onChange={e => productContext.Search.DispatchSearchState({type: 'UPDATE_SEARCH', value:e.target.value})}
                          />
                          
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
