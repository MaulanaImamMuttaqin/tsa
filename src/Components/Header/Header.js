import React,{useContext, useState, useRef}  from 'react'
import '../../App.css'
import './style/header.css'
import Logo from "../../assets/image/logo4.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch , faUserCircle, faSignOutAlt,faStore} from '@fortawesome/free-solid-svg-icons'
import {ProductContext} from '../ParentComponent'
import { Link, useHistory} from 'react-router-dom'
import { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header(props) {
  const {ButtClickSearch:{DispatchButtSearch},User:{UserState}} = useContext(ProductContext)
  const wrapperRef1 = useRef(null)
  const wrapperRef2 = useRef(null)
  const [click, setClick] = useState(false)
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
      DispatchButtSearch({type: 'UPDATE_SEARCH_ONCLICK', value:search})
      history.push(`/Search/${search}`);
    }
  }

  const ChangeComponent = ()=>{
    history.push(`/`);
  }

  // const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  //   <a
  //     href=""
  //     ref={ref}
  //      className="profile"
  //     onClick={(e) => {
  //       e.preventDefault();
  //       onClick(e);
  //     }}
  //   >
  //     {children}
      
  //   </a>
  // ));
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

                  <div className="header-right">
                    {localStorage.getItem('SavedToken') !== null ? 
                      <a ref={wrapperRef1} className="profile" onClick={() => setClick(!click)}><FontAwesomeIcon size="lg" icon={faUserCircle} /></a>
                      // <Dropdown alignRight  >
                      //   <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                      //       <FontAwesomeIcon size="lg" icon={faUserCircle} />
                      //   </Dropdown.Toggle>

                      //   <Dropdown.Menu className="dropdown" >
                      //       <Link style={{ textDecoration: 'none' }} to="/Profile">
                      //           <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon={faUserCircle} />Profile
                      //       </Link>
                      //       <Link style={{ textDecoration: 'none' }} to={UserState.data.role_id === "1" ? '/Toko_Saya' : '/Buat_Toko' }>
                      //           <FontAwesomeIcon style={{ marginRight: "7px" }} size="xs" icon={faStore} />Toko Anda
                      //       </Link>
                      //       <a href=""  onClick={()=> localStorage.removeItem("SavedToken")}>
                      //           <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon={faSignOutAlt}/>Keluar
                      //       </a>
                      //   </Dropdown.Menu>
                      // </Dropdown>
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
                      <Link style={{ textDecoration: 'none' }} to="/Profile" onClick={()=> setClick(false)}>
                          <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon={faUserCircle} />Profile
                      </Link>
                      <Link style={{ textDecoration: 'none' }} to={UserState.data.role_id === "1" ? '/Toko_Saya' : '/Buat_Toko' }  onClick={()=> setClick(false)}>
                          <FontAwesomeIcon style={{ marginRight: "7px" }} size="xs" icon={faStore} />Toko Anda
                      </Link>
                      <Link style={{ textDecoration: 'none' }} to="/Login"  onClick={()=> localStorage.removeItem("SavedToken")}>
                          <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon={faSignOutAlt}/>Keluar
                      </Link>
                        
                  </div>
              </div>
              }
        </div>
    )
}


export default Header
	