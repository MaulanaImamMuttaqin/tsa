import React,{useContext, useState, useRef}  from 'react'
import '../../App.css'
import '../../assets/style/header.css'
import Logo from "../../assets/image/logo4.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {ProductContext} from '../ParentComponent'
import { Link, useHistory} from 'react-router-dom'
import { useEffect } from 'react'
import { Col, Row, Image, Container, FormControl, InputGroup, Button} from 'react-bootstrap';
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
              <Container>
              {/* style={{border:"1px solid"}} */}
                  <Row className="header-container"  >
                      <Col xs={3}>
                          <img className="logo-tittle center-container" src={Logo} alt="" onClick={ChangeComponent}/>
                      </Col>

                      <Col className="header-center" >
                          <form onSubmit={submitHandler} className="form-search">
                          <InputGroup size="md"  >
                            <FormControl
                              className="search" 
                              placeholder="Cari apa yang anda inginkan"
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                              value={search}
                              onChange={e => setSearch(e.target.value)}
                            />
                            <InputGroup.Append>
                              <Button className="sub" type="submit" variant="outline-primary"><FontAwesomeIcon icon="search" /></Button>
                            </InputGroup.Append>
                          </InputGroup>
                        </form>
                      </Col>
                      <Col className="menu-icon-container">
                        <div className="menu-icon" onClick={()=> setClickBars(!clickBars)}>
                          <FontAwesomeIcon size="sm" icon="bars"/>
                        </div>
                      </Col>
                     
                      <Col className="header-right" xs={3} >
                          {localStorage.getItem('SavedToken') !== null ? 
                          <span ref={wrapperRef1} className="profile" onClick={() => setClick(!click)}><FontAwesomeIcon size="lg" icon="user-circle" /></span>
                          :<div>
                              <Link to='/Login'>Masuk</Link>
                              <Link to='/Register'>Daftar</Link>                  
                          </div>
                        }
                      </Col>
                  </Row>

              </Container>
              {
                click && 
                <div ref={wrapperRef2} className="profile-dropdown">
                  <div className="profile-content">
                    <Row>
                        <Col  >
                          <Link style={{ textDecoration: 'none' }} to="/Profile" onClick={()=> setClick(false)}>
                                <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon="user-circle" />Profile
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to={UserState.data.role_id === "1" ? '/Toko_Saya' : '/Buat_Toko' }  onClick={()=> setClick(false)}>
                                <FontAwesomeIcon style={{ marginRight: "7px" }} size="xs" icon="store" />Toko Anda
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to="/"  onClick={()=> {localStorage.removeItem("SavedToken");setClick(false); DispatchUserState({type: "LOGOUT"})}}>
                                <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon="sign-out-alt"/>Keluar
                            </Link>
                        </Col>
                        <Col xs={7} style={{borderLeft: "2px solid #8f9cff"}}>
                          <Row>
                            <div  className="ProfilePic">
                                {UserState.data.profile === "" ? <span><FontAwesomeIcon icon="usercircle" size="6x"/></span> :
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
                            
                          <button className="sub" type="submit"><FontAwesomeIcon icon="search" /></button>
                    </form>
                       {localStorage.getItem('SavedToken') !== null ? 
                         <div>
                           <Link style={{ textDecoration: 'none' }} to="/Profile" onClick={()=> setClickBars(false)}>
                                <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon="user-circle" />Profile
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to={UserState.data.role_id === "1" ? '/Toko_Saya' : '/Buat_Toko' }  onClick={()=> setClickBars(false)}>
                                <FontAwesomeIcon style={{ marginRight: "7px" }} size="xs" icon="store" />Toko Anda
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to="/"  onClick={()=> {localStorage.removeItem("SavedToken");setClickBars(false);}}>
                                <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon="sign-out-alt"/>Keluar
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