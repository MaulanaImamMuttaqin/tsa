import React,{useContext, useState}  from 'react'
import '../../App.css'
import './style/header.css'
import Logo from "../../assets/image/logo4.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch , faUserCircle} from '@fortawesome/free-solid-svg-icons'
import {ProductContext} from '../ParentComponent'
import { Link, withRouter } from 'react-router-dom'
import Profile from './SubComponents/Profile'


function Header(props) {
  const productContext = useContext(ProductContext)
  const [click, setClick] = useState(false)

  const ToggleClick = () => {
    setClick(!click)
  }
  const submitHandler = e => {
    e.preventDefault()
    if(productContext.Search.SearchState !== ''){
      productContext.ButtClickSearch.DispatdhButtSearch({type: 'UPDATE_SEARCH_ONCLICK', value: productContext.Search.SearchState})
      props.history.push(`/Search/${productContext.Search.SearchState}`);
    }
  }

  const ChangeComponent = ()=>{
    props.history.push(`/`);
  }
    return (
        <div className="header">
              <div className="container">

                  <div className="header-left"  >
                   <img className="logo-tittle center-container" src={Logo} alt="" onClick={ChangeComponent}/>   
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
                    {productContext.User.UserState.login ? 
                      <a className="profile" onClick={ToggleClick}><FontAwesomeIcon size="lg" icon={faUserCircle} /></a>
                      :<div>
                          <Link to='/Login'>Masuk</Link>
                          <Link to='/Register'>Daftar</Link>                  
                      </div>
                    }
                  </div>
              </div>
              {
                click ?
                <Profile/>:
                <span></span>
              }
        </div>
    )
}

export default withRouter(Header) 
