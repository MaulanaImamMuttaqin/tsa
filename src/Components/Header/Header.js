import React,{useContext, useState, useRef}  from 'react'
import '../../App.css'
import './style/header.css'
import Logo from "../../assets/image/logo4.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch , faUserCircle, faSignOutAlt,faStore, faBars} from '@fortawesome/free-solid-svg-icons'
import {ProductContext} from '../ParentComponent'
import { Link, useHistory} from 'react-router-dom'
import { useEffect } from 'react'
import { Col, Row, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function Header(props) {
  const {
    User:{
      UserState,
      DispatchUserState
    }} = useContext(ProductContext)

  const wrapperRef1 = useRef(null)
  const wrapperRef2 = useRef(null)
  const [click, setClick] = useState(false)
  const [clickBars, setClickBars] = useState(false)
  const [search, setSearch] = useState('')
  const history = useHistory()

  useEffect(()=> {
    const closeProf = (event) => {
      if (wrapperRef1.current && !wrapperRef1.current.contains(event.target)  ) {
        if (wrapperRef2.current && !wrapperRef2.current.contains(event.target)  ) {
          setClick(false)
        }
      }
    }
    document.addEventListener('mousedown', closeProf)
    return () => {
      document.removeEventListener("mousedown", closeProf);
    };
  },[wrapperRef1])


  const submitHandler = e => {
    e.preventDefault()
    if(search !== ''){
      setClickBars(false)
      history.push(`/Search/${search}`);
    }
  }

  const ChangeComponent = ()=>{
    history.push(`/`);
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
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                          />
                          
                        <button className="sub" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                    </form>
                  </div>
                  <div className="menu-icon" onClick={()=> setClickBars(!clickBars)}>
                    <FontAwesomeIcon size="sm" icon={faBars}/>
                  </div>
                  
                  <div className="header-right">
                    {localStorage.getItem('SavedToken') !== null ? 
                      <span ref={wrapperRef1} className="profile" onClick={() => setClick(!click)}><FontAwesomeIcon size="lg" icon={faUserCircle} /></span>
                      :<div>
                          <Link to='/Login'>Masuk</Link>
                          <Link to='/Register'>Daftar</Link>                  
                      </div>
                    }
                  </div>
              </div>
              {
                click && 
                <div ref={wrapperRef2} className="profile-dropdown">
                  <div className="profile-content">
                    <Row>
                        <Col  >
                          <Link style={{ textDecoration: 'none' }} to="/Profile" onClick={()=> setClick(false)}>
                                <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon={faUserCircle} />Profile
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to={UserState.data.role_id === "1" ? '/Toko_Saya' : '/Buat_Toko' }  onClick={()=> setClick(false)}>
                                <FontAwesomeIcon style={{ marginRight: "7px" }} size="xs" icon={faStore} />Toko Anda
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to="/"  onClick={()=> {localStorage.removeItem("SavedToken");setClick(false); DispatchUserState({type: "LOGOUT"})}}>
                                <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon={faSignOutAlt}/>Keluar
                            </Link>
                        </Col>
                        <Col xs={7} style={{borderLeft: "2px solid #8f9cff"}}>
                          <Row>
                            <div  className="ProfilePic">
                                {UserState.data.profile === "" ? <span><FontAwesomeIcon icon={faUserCircle} size="6x"/></span> :
                                  <Image src={`http://keudepeunajohapi.jsmiot.com/${UserState.data.profile}`} height="130" width="130" roundedCircle   />
                                }
                            </div>
                          </Row>
                          <Row>
                            <div className="profileName">
                              <p>{UserState.data.username}</p>
                            </div>
                            
                          </Row>
                        </Col>
                    </Row>
                    
                        
                  </div>
              </div>
              }
              {
                clickBars &&
               <div className="menu-button-dropdown">
                 <div className="menu-content">
                  <form onSubmit={submitHandler} className="form">
                          <input 
                            type="text" 
                            className="search" 
                            placeholder="Cari apa yang anda inginkan"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            />
                            
                          <button className="sub" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                    </form>
                       {localStorage.getItem('SavedToken') !== null ? 
                         <div>
                           <Link style={{ textDecoration: 'none' }} to="/Profile" onClick={()=> setClickBars(false)}>
                                <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon={faUserCircle} />Profile
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to={UserState.data.role_id === "1" ? '/Toko_Saya' : '/Buat_Toko' }  onClick={()=> setClickBars(false)}>
                                <FontAwesomeIcon style={{ marginRight: "7px" }} size="xs" icon={faStore} />Toko Anda
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to="/"  onClick={()=> {localStorage.removeItem("SavedToken");setClickBars(false);}}>
                                <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon={faSignOutAlt}/>Keluar
                            </Link>
                             
                         </div>:
                          <div>
                             <Link to='/Login'>Masuk</Link>
                            <Link to='/Register'>Daftar</Link>
                          </div>
                       }
                 </div>
               </div>
              }
        </div>
    )
}


export default Header