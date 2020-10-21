import Axios from 'axios'
import React ,{useContext,useState}from 'react'
import { useForm } from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import {ProductContext} from '../../ParentComponent'
import '../../../assets/style/Profile.css'
import { Alert, InputGroup , FormControl,Button, Row, Col, Image, Badge, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MiniLoad from '../../../assets/gifs/mini-loading.gif';
import Loading from '../../general/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function ProfileBody() {
    document.title = 'KeudePeunajoh Profile'
    const {
        User :{ 
            DispatchUserState, 
            UserState
        },
        Toko : {
            TokoState,
            DispatchTokoState
        },
        url
    } = useContext(ProductContext)
    const history = useHistory()
    const { register, handleSubmit, errors  } = useForm();
    const { register:register2, handleSubmit:handleSubmit2, errors:errors2 } = useForm();

    const [editProf, setEditProf] = useState(true)
    const [editToko, setEditToko] = useState(true)

    const[updateToko, setUpdateToko] = useState(false)
    const[updateProfile, setUpdateProfile] = useState(false)

    const [profLoad, setProfLoad] = useState(false)
    const [tokoLoad, setTokoLoad] = useState(false)
    const UpdateProfile = data => {
        setProfLoad(true)
        const fd = new FormData()
        fd.append('id', UserState.data.id)
        fd.append('username',data.username)
        fd.append('alamat', data.alamat)
        fd.append('email', data.email)
        fd.append('nohp', data.nohp)
        if(data.gambarProfile.length !== 0){
            fd.append('gambar', data.gambarProfile[0], data.gambarProfile[0].name )
        }
        Axios.post(`${url}Data/editData`, fd,{
            headers: {
                'Authorization': localStorage.getItem('SavedToken')
              }
        }).then(res => {
            DispatchUserState({type: "SET_USER_STATE", payload: res.data.data})
            setEditProf(true)
            setProfLoad(false)
            setUpdateProfile(true)
            console.log(res.data.data)
        }).catch(error => {
            setProfLoad(false)
            console.log(error)
        })
        console.log(data)
    }

    const UpdateToko = data => {
        setTokoLoad(true)
        const fd = new FormData();
        fd.append('id', TokoState.data.toko.id)
        fd.append('user_id', UserState.data.id)
        fd.append('nama_prev', TokoState.data.toko.nama_toko)
        fd.append('nama', data.nama)
        fd.append('alamat', data.alamat)
        fd.append('deskripsi', data.deskripsi)
        if(data.gambarToko.length !== 0){
            fd.append('gambar', data.gambarToko[0], data.gambarToko[0].name )
        }
        Axios.post(`${url}Data/editToko`,fd,{
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

    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const onChangePicture = e => {
        if (e.target.files[0]) {
        console.log("picture: ", e.target.files[0].name);
        setPicture(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
        }
        
    };

    const [pictureEdit, setPictureEdit] = useState(null);
    const [imgDataEdit, setImgDataEdit] = useState(null);
    const onChangePictureEdit = e => {
        if (e.target.files[0]) {
        console.log("picture: ", e.target.files[0].name);
        setPictureEdit(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImgDataEdit(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
        }
        console.log(pictureEdit)
    };
    if(localStorage.getItem('SavedToken') !== null){
        return (

            <div style={ TokoState.loading ? { height : "100%"} : {height: ""} }>
                    {
                        TokoState.loading ? <Loading color="loading-white"/>:
                                <div className="content">
                                    <Container>
                                        <div className="content-header">
                                            <h4>Profile User</h4>
                                        </div>
                                        {
                                            updateProfile && <Alert variant="success" onClose={() => setUpdateProfile(false)} dismissible>Profile berhasil di update</Alert>
                                        }
                                        <div className="profile-data">
                                            
                                            <Row>
                                                <Col style={{textAlign: "center"}} xs={6} md={4}>
                                                    
                                                        <div className="previewProfilePic">
                                                            {
                                                                picture !== null ?
                                                                <Image  src={imgData} fluid rounded />:
                                                                <div>
                                                                    {UserState.data.profile === "" ? <FontAwesomeIcon icon="usercircle" size="6x"/> :
                                                                        <Image src={`${url}${UserState.data.profile}`}  fluid rounded />
                                                                    }
                                                                </div>
                                                                        
                                                                
                                                            }
                                                                
                                                        </div>

                                                    {
                                                        !editProf &&
                                                        <div>
                                                            <label className="file-label" htmlFor="file" >
                                                                <h3>
                                                                    <Badge variant="secondary">Masukkan Gambar <FontAwesomeIcon icon="upload" /></Badge>
                                                                </h3>
                                                            </label>
                                                            <input id="file" className="file" type="file" name="gambarProfile" onChange={onChangePicture}  ref={register({
                                                            validate: (value) => {
                                                                if(value.length ===  0){
                                                                    return true
                                                                }
                                                                return value[0].size < 2048000
                                                            }
                                                            })} />
                                                            {errors.gambarProfile && <p><small style={{color: "red"}}>ukuran gambar tidak boleh lebih dari 2MB </small></p>}
                                                        </div>
                                                    }
                                                        
                                                </Col>
                                                <Col xs={12} md={8}>
                                                   <form onSubmit={handleSubmit(UpdateProfile)}>
                                                       {
                                                           editProf ?
                                                           <div>
                                                                <Row>
                                                                    <Col xs={3} md={1}><b>Nama</b></Col>
                                                                    <Col xs={12} md={11}><p>:  {UserState.data.username}</p></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={3} md={1}><b>Alamat</b></Col>
                                                                    <Col  xs={12} md={11}><p>:  {UserState.data.alamat}</p></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={3} md={1}><b>Email</b></Col>
                                                                    <Col  xs={12} md={11}><p>:  {UserState.data.email}</p></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={3} md={1}><b>No HP</b></Col>
                                                                    <Col  xs={12} md={11}><p>:  {UserState.data.no_hp}</p></Col>
                                                                </Row>
                                                               
                                                           </div>
                                                           :
                                                           <div>
                                                               <Row>
                                                                    <Col xs={3} md={1}><b>Nama</b></Col>
                                                                    <Col  xs={12} md={11}>
                                                                    <InputGroup className="mb-3">:
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
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={3} md={1}><b>Alamat</b></Col>
                                                                    <Col  xs={12} md={11}>
                                                                    <InputGroup className="mb-3">:
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
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={3} md={1}><b>Email</b></Col>
                                                                    <Col  xs={12} md={11}>
                                                                    <InputGroup className="mb-3">:
                                                                        <FormControl
                                                                        placeholder="Masukkan Email"
                                                                        aria-label="Username"
                                                                        aria-describedby="basic-addon1"
                                                                        name="email"
                                                                        defaultValue={UserState.data.email}
                                                                        ref={register()}
                                                                        required
                                                                        />
                                                                    </InputGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={3} md={1}><b>No HP</b></Col>
                                                                    <Col  xs={12} md={11}>
                                                                    <InputGroup className="mb-3">:
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
                                                                    </Col>
                                                                </Row>
                                                                
                                                           </div>
                                                       }
                                                       

                                                        {
                                                            editProf ? <Button onClick={() => setEditProf(false)} size="lg" variant="outline-primary" type="submit">Edit</Button>:
                                                            <div  className="profile-update-confirm">
                                                                <Button  onClick={() => {setEditProf(true);setPicture(null);setImgData(null)}} size="lg" variant="outline-primary" type="submit">Cancel</Button>
                                                                <Button  type="submit" size="lg" variant="outline-primary" >Simpan</Button>{profLoad && <img src={MiniLoad} alt="loading" width="80" height="70"/>}
                                                                
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
                                                                {
                                                                    pictureEdit !== null ?
                                                                    <Image  src={imgDataEdit} fluid rounded />:
                                                                    <Image  src={`${url}${TokoState.data.toko.gambar_toko}`} fluid rounded />       
                                                                    
                                                                }
                                                                
                                                            </div>
                                                            {
                                                        !editToko &&
                                                        <div>
                                                            <label className="file-label" htmlFor="file" >
                                                                <h3>
                                                                    <Badge variant="secondary">Masukkan Gambar <FontAwesomeIcon icon="upload" /></Badge>
                                                                </h3>
                                                            </label>
                                                            <input id="file" className="file" type="file" name="gambarToko" onChange={onChangePictureEdit} ref={register2({
                                                            validate: (value) => {
                                                                if(value.length === 0){
                                                                    return true
                                                                }
                                                                return value[0].size < 2048000
                                                            }
                                                            })}/>
                                                            {errors2.gambarToko && <p><small style={{color: "red"}}>ukuran gambar tidak boleh lebih dari 2MB </small></p>}
                                                        </div>
                                                    }
                                                        
                                                    </Col>
                                                    <Col xs={12} md={8}>
                                                        <form onSubmit={handleSubmit2(UpdateToko)}>
                                                            {editToko ? 
                                                            <div>
                                                                <Row>
                                                                    <Col xs={3} md={2}><b>Nama Toko</b></Col>
                                                                    <Col xs={12} md={10}><p>:  {TokoState.data.toko.nama_toko}</p></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={3} md={2}><b>Alamat Toko</b></Col>
                                                                    <Col xs={12} md={10}><p>:  {TokoState.data.toko.alamat_toko}</p></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={3} md={2}><b>Deskripsi Toko</b></Col>
                                                                    <Col xs={12} md={10}><p>:  {TokoState.data.toko.deskripsi}</p></Col>
                                                                </Row>
                                                                
                                                            </div> :
                                                            <div>
                                                                <Row>
                                                                    <Col xs={3} md={2}><b>Nama Toko</b></Col>
                                                                    <Col xs={12} md={10}>
                                                                    <InputGroup className="mb-3">:
                                                                        <FormControl
                                                                        placeholder="Masukkan Nama Toko"
                                                                        name="nama"
                                                                        defaultValue={TokoState.data.toko.nama_toko}
                                                                        ref={register2()}
                                                                        required
                                                                        />
                                                                    </InputGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={3} md={2}><b>Alamat Toko</b></Col>
                                                                    <Col xs={12} md={10}>
                                                                    <InputGroup className="mb-3">:
                                                                        <FormControl
                                                                        placeholder="Masukkan Alamat"
                                                                        defaultValue={TokoState.data.toko.alamat_toko}
                                                                        name="alamat"
                                                                        ref={register2()}
                                                                        required
                                                                        />
                                                                    </InputGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={3} md={2}><b>Deskripsi Toko</b></Col>
                                                                    <Col xs={12} md={10}>
                                                                    <InputGroup className="mb-3">:
                                                                        <FormControl
                                                                        as="textarea"
                                                                        placeholder="Deskripsi Toko"
                                                                        name="deskripsi"
                                                                        defaultValue={TokoState.data.toko.deskripsi}
                                                                        ref={register2()}
                                                                        required
                                                                        />
                                                                    </InputGroup>
                                                                    </Col>
                                                                </Row>
                                                                
                                                            </div>
                                                            }

                                                            {
                                                            editToko ? <Button onClick={() => setEditToko(false)} size="lg" variant="outline-primary">Edit</Button>:
                                                            <div  className="profile-update-confirm">
                                                                <Button  onClick={() => {setEditToko(true);setPictureEdit(null);setImgDataEdit(null)}} size="lg" variant="outline-primary" >Cancel</Button>
                                                                <Button  type="submit" size="lg" variant="outline-primary">Simpan</Button>{tokoLoad && <img src={MiniLoad} alt="loading" width="80" height="70"/>}
                                                                
                                                            </div>
                                                        }
                                                        </form>
                                                                
                                                    </Col>
                                                </Row>

                                            
                                            
                                        </div>
                                        }
                                        
                                    </Container>
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
