import Axios from 'axios'
import React ,{useContext,useState}from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useLocation } from 'react-router-dom'
import {ProductContext} from '../../ParentComponent'
import '../style/Profile.css'
import { Alert, InputGroup , FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MiniLoad from '../../../assets/gifs/mini-loading.gif';
import Loading from '../../general/Loading';
import {Button, Modal, Container, Row, Col, Image, Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faImage } from '@fortawesome/free-solid-svg-icons'
function ProfileBody() {
    const {
        User :{ 
            DispatchUserState, 
            UserState
        },
        Toko : {
            TokoState,
            DispatchTokoState
        }
    } = useContext(ProductContext)
    const history = useHistory()
    const Location = useLocation()
    const { register, handleSubmit, errors } = useForm();
    const [editProf, setEditProf] = useState(true)
    const [editToko, setEditToko] = useState(true)

    const[updateToko, setUpdateToko] = useState(false)
    const[updateProfile, setUpdateProfile] = useState(false)

    const [profLoad, setProfLoad] = useState(false)
    const [tokoLoad, setTokoLoad] = useState(false)
    // const [editForm , setEditForm] = (UserState.data)
    const UpdateProfile = data => {
        setProfLoad(true)
        Axios.post('http://localhost/keudepeunajoh-rest-api2/Data/editData', {
            id: UserState.data.id,
            username:data.username,
            alamat:data.alamat,
            email:data.email,
            nohp:data.nohp
        },{
            headers: {
                'Authorization': localStorage.getItem('SavedToken')
              }
        }).then(res => {
            DispatchUserState({type: "SET_USER_STATE", payload: res.data.data})
            setEditProf(true)
            setProfLoad(false)
            setUpdateProfile(true)
        }).catch(error => {
            setProfLoad(false)
            console.log('error')
        })
    }

    const UpdateToko = data => {
        setTokoLoad(true)
        Axios.post('http://localhost/keudepeunajoh-rest-api2/Data/editToko', {
            id: TokoState.data.toko.id,
            user_id:UserState.data.id,
            nama_prev: TokoState.data.toko.nama_toko,
            nama:data.nama,
            alamat:data.alamat,
            deskripsi:data.deskripsi
        },{
            headers: {
                'Authorization': localStorage.getItem('SavedToken')
              }
        }).then(res => {
            console.log("toko update",res.data)
            DispatchTokoState({type: "FETCH_SUCCESS", payload: res.data.data})
            setEditToko(true)
            setTokoLoad(false)
            setUpdateToko(true)
        }).catch(error => {
            setTokoLoad(false)
            console.log(error)
        })
    }

    if(localStorage.getItem('SavedToken') !== null){
        return (

            <div style={ TokoState.loading ? { height : "100%"} : {height: ""} }>
                    {
                        TokoState.loading ? <Loading color="loading-white"/>:
                                <div className="content">
                                    <div className="container">
                                        <div className="content-header">
                                            <h4>Profile User</h4>
                                        </div>
                                        {
                                            updateProfile && <Alert variant="success" onClose={() => setUpdateProfile(false)} dismissible>Profile berhasil di update</Alert>
                                        }
                                        <div className="profile-data">
                                            {/* <form onSubmit={handleSubmit(UpdateProfile)}>
                                                <div className="profile-cont"><b>Nama</b>   : 
                                                    {editProf ? UserState.data.username : 
                                                    <input className="profile-update-form" type="text" name="username" defaultValue={UserState.data.username} ref={register()}></input>  
                                                    } 
                                                </div>
                                                <div className="profile-cont"><b>Alamat</b> : 
                                                    {editProf ? UserState.data.alamat : 
                                                    <input className="profile-update-form" type="text" name="alamat" defaultValue={UserState.data.alamat} ref={register()} ></input>
                                                    } 
                                                </div>
                                                <div className="profile-cont"><b>Email</b>  : 
                                                    {editProf ? UserState.data.email : 
                                                    <input className="profile-update-form" type="text" name="email" defaultValue={UserState.data.email} ref={register()}></input> 
                                                    } 
                                                </div>
                                                <div className="profile-cont"><b>No HP</b>  : 
                                                    {editProf ? UserState.data.no_hp : 
                                                    <input className="profile-update-form" type="text" name="nohp" defaultValue={UserState.data.no_hp} ref={register()} ></input> 
                                                    } 
                                                </div>

                                                {
                                                    editProf ? <button onClick={() => setEditProf(false)} className="ubah" type="button">Ubah</button>:
                                                    <div  className="profile-update-confirm">
                                                        <button onClick={() => setEditProf(true)} className="cancel" type="button" >Batal</button>
                                                        <button className="simpan" type="submit">Simpan</button>{profLoad && <img src={MiniLoad} alt="loading" width="80" height="70"/>}
                                                    </div>
                                                }
                                            </form> */}
                                            <Row>
                                                <Col style={{textAlign: "center"}} xs={6} md={4}>
                                                    
                                                        <div className="previewProfilePic">
                                                            <FontAwesomeIcon icon={faUserCircle} size="6x"/>    
                                                        </div>
                                                    
                                                </Col>
                                                <Col xs={12} md={8}>
                                                   <form onSubmit={handleSubmit(UpdateProfile)}>
                                                       {
                                                           editProf ?
                                                           <div>
                                                               <div className="profile-cont"><b>Nama</b>   : {UserState.data.username} </div>
                                                               <div className="profile-cont"><b>Nama</b>   : {UserState.data.alamat} </div>
                                                               <div className="profile-cont"><b>Email</b>  : {UserState.data.email} </div>
                                                               <div className="profile-cont"><b>No HP</b>  : {UserState.data.no_hp} </div>
                                                           </div>
                                                           :
                                                           <div>
                                                               <InputGroup className="mb-3">
                                                                    <FormControl
                                                                    placeholder="Masukkan Nama Anda"
                                                                    aria-label="Username"
                                                                    aria-describedby="basic-addon1"
                                                                    name="username"
                                                                    defaultValue={UserState.data.username}
                                                                    ref={register()}
                                                                    required
                                                                    />
                                                                </InputGroup>
                                                                {/* <input type="text" name="nama" placeholder="Masukkan Nama Produk"  ref={register()} required/> */}
                                                                <InputGroup className="mb-3">
                                                                    <FormControl
                                                                    placeholder="Masukkan Alamat"
                                                                    aria-label="Username"
                                                                    aria-describedby="basic-addon1"
                                                                    defaultValue={UserState.data.alamat}
                                                                    name="alamat"
                                                                    ref={register()}
                                                                    required
                                                                    />
                                                                </InputGroup>
                                                                {/* <input type="number" name="harga" placeholder="Masukkan Harga"  ref={register} required/> */}
                                                                <InputGroup className="mb-3">
                                                                    <FormControl
                                                                    placeholder="Masukkan Enail"
                                                                    aria-label="Username"
                                                                    aria-describedby="basic-addon1"
                                                                    name="email"
                                                                    defaultValue={UserState.data.email}
                                                                    ref={register()}
                                                                    required
                                                                    />
                                                                </InputGroup>
                                                                <InputGroup className="mb-3">
                                                                    <FormControl
                                                                    placeholder="Masukkan No HP"
                                                                    aria-label="Username"
                                                                    aria-describedby="basic-addon1"
                                                                    name="nohp"
                                                                    defaultValue={UserState.data.no_hp}
                                                                    ref={register()}
                                                                    required
                                                                    />
                                                                </InputGroup>
                                                           </div>
                                                       }
                                                        {/* <div className="profile-cont"><b>Nama</b>   : 
                                                            {editProf ? UserState.data.username : 
                                                            <input className="profile-update-form" type="text" name="username" defaultValue={UserState.data.username} ref={register()}></input>  
                                                            } 
                                                        </div>
                                                        <div className="profile-cont"><b>Alamat</b> : 
                                                            {editProf ? UserState.data.alamat : 
                                                            <input className="profile-update-form" type="text" name="alamat" defaultValue={UserState.data.alamat} ref={register()} ></input>
                                                            } 
                                                        </div>
                                                        <div className="profile-cont"><b>Email</b>  : 
                                                            {editProf ? UserState.data.email : 
                                                            <input className="profile-update-form" type="text" name="email" defaultValue={UserState.data.email} ref={register()}></input> 
                                                            } 
                                                        </div>
                                                        <div className="profile-cont"><b>No HP</b>  : 
                                                            {editProf ? UserState.data.no_hp : 
                                                            <input className="profile-update-form" type="text" name="nohp" defaultValue={UserState.data.no_hp} ref={register()} ></input> 
                                                            } 
                                                        </div> */}

                                                        {
                                                            editProf ? <Button onClick={() => setEditProf(false)} size="lg" variant="outline-primary" type="submit">Edit</Button>:
                                                            <div  className="profile-update-confirm">
                                                                <Button  onClick={() => setEditProf(true)} size="lg" variant="outline-primary" type="submit">Cancel</Button>
                                                                <Button  type="submit" size="lg" variant="outline-primary" type="submit">Edit</Button>{profLoad && <img src={MiniLoad} alt="loading" width="80" height="70"/>}
                                                                
                                                            </div>
                                                        }
                                                    </form>
                                                   
                                                    
                                                    
                                                </Col>
                                            </Row>

                                            
                                        </div>



                                        <div className="content-header">
                                            <h4>Profile Toko</h4>
                                        </div>
                                       
                                        {
                                            updateToko && <Alert variant="success"  onClose={() => setUpdateToko(false)} dismissible>Profile Toko berhasil di update</Alert>
                                        }
                                        {
                                            TokoState.data == null ? <p>Anda belum memiliki toko</p> :
                                            <div className="Toko-data">
                                                 <Row>
                                                    <Col style={{textAlign: "center"}} xs={6} md={4}>
                                                        
                                                            <div className="previewProfilePic">
                                                            <img src={`http://localhost/keudepeunajoh-rest-api2/${TokoState.data.toko.gambar_toko}`} alt="gambar-toko"/>
                                                            </div>
                                                        
                                                    </Col>
                                                    <Col xs={12} md={8}>
                                                        <form onSubmit={handleSubmit(UpdateToko)}>
                                                            {editToko ? 
                                                            <div>
                                                                <div className="profile-cont"><b>Nama Toko</b>   : {TokoState.data.toko.nama_toko}</div>
                                                                <div className="profile-cont"><b>Alamat Toko</b> : {TokoState.data.toko.alamat_toko}</div>
                                                                <div className="profile-cont"><b>Deskripsi Toko</b>  : {TokoState.data.toko.deskripsi}</div>
                                                            </div> :
                                                            <div>
                                                                <InputGroup className="mb-3">
                                                                    <FormControl
                                                                    placeholder="Masukkan Nama Toko"
                                                                    name="nama"
                                                                    defaultValue={TokoState.data.toko.nama_toko}
                                                                    ref={register()}
                                                                    required
                                                                    />
                                                                </InputGroup>
                                                                {/* <input type="text" name="nama" placeholder="Masukkan Nama Produk"  ref={register()} required/> */}
                                                                <InputGroup className="mb-3">
                                                                    <FormControl
                                                                    placeholder="Masukkan Alamat"
                                                                    defaultValue={TokoState.data.toko.alamat_toko}
                                                                    name="alamat"
                                                                    ref={register()}
                                                                    required
                                                                    />
                                                                </InputGroup>
                                                                {/* <input type="number" name="harga" placeholder="Masukkan Harga"  ref={register} required/> */}
                                                                <InputGroup className="mb-3">
                                                                    <FormControl
                                                                    as="textarea"
                                                                    placeholder="Deskripsi Toko"
                                                                    name="deskripsi"
                                                                    defaultValue={TokoState.data.toko.deskripsi}
                                                                    ref={register()}
                                                                    required
                                                                    />
                                                                </InputGroup>
                                                            </div>
                                                            }
                                                            
                                                                {/* {editToko ? TokoState.data.toko.nama_toko : 
                                                                <input className="profile-update-form" type="text" name="nama" defaultValue={TokoState.data.toko.nama_toko} ref={register()}></input>  
                                                                }  */}
                                                            
                                                            
                                                                {/* {editToko ? TokoState.data.toko.alamat_toko : 
                                                                <input className="profile-update-form" type="text" name="alamat" defaultValue={TokoState.data.toko.alamat_toko} ref={register()} ></input>
                                                                }  */}
                                                            
                                                            
                                                                {/* {editToko ? TokoState.data.toko.deskripsi : 
                                                                <textarea className="profile-update-form textarea" type="text" name="deskripsi" defaultValue={TokoState.data.toko.deskripsi} ref={register()} ></textarea> 
                                                                }  */}
                                                            

                                                            {
                                                            editToko ? <Button onClick={() => setEditToko(false)} size="lg" variant="outline-primary">Edit</Button>:
                                                            <div  className="profile-update-confirm">
                                                                <Button  onClick={() => setEditToko(true)} size="lg" variant="outline-primary" >Cancel</Button>
                                                                <Button  type="submit" size="lg" variant="outline-primary" type="submit">Edit</Button>{profLoad && <img src={MiniLoad} alt="loading" width="80" height="70"/>}
                                                                
                                                            </div>
                                                        }
                                                        </form>
                                                                
                                                    </Col>
                                                </Row>

                                            
                                            
                                        </div>
                                        }
                                        
                                    </div>
                                    <div className="clear"></div>
                                </div>
                                            
                    } 

            </div>
        )
    } else{
        history.push('/Login')
        return null
    }
}

export default ProfileBody
