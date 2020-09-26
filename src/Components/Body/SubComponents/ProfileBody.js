import Axios from 'axios'
import React ,{useContext,useState}from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useLocation } from 'react-router-dom'
import {ProductContext} from '../../ParentComponent'
import '../style/Profile.css'
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MiniLoad from '../../../assets/gifs/mini-loading.gif';

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
        Axios.post('http://localhost/keudepeunajoh-rest-api/api/Data/editData', {
            id: UserState.data.id,
            username:data.username,
            alamat:data.alamat,
            email:data.email,
            nohp:data.nohp
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
        Axios.post('http://localhost/keudepeunajoh-rest-api/api/Data/editToko', {
            id: TokoState.data.toko.id,
            user_id:UserState.data.id,
            nama_prev: TokoState.data.toko.nama_toko,
            nama:data.nama,
            alamat:data.alamat,
            deskripsi:data.deskripsi
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

    if(UserState.login){
        return (
            <div className="content">
                <div className="container">
                    <div className="content-header">
                        <h4>Profile User</h4>
                    </div>
                    {
                        updateProfile && <Alert variant="success" onClose={() => setUpdateProfile(false)} dismissible>Profile berhasil di update</Alert>
                    }
                    <div className="profile-data">
                        <form onSubmit={handleSubmit(UpdateProfile)}>
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
                        </form>
                        
                        
                        
                    </div>



                    <div className="content-header">
                        <h4>Profile Toko</h4>
                    </div>
                    {
                        updateToko && <Alert variant="success"  onClose={() => setUpdateToko(false)} dismissible>Profile Toko berhasil di update</Alert>
                    }
                    <div className="Toko-data">
                        <form onSubmit={handleSubmit(UpdateToko)}>
                            <div className="profile-cont"><b>Nama Toko</b>   : 
                                {editToko ? TokoState.data.toko.nama_toko : 
                                <input className="profile-update-form" type="text" name="nama" defaultValue={TokoState.data.toko.nama_toko} ref={register()}></input>  
                                } 
                            </div>
                            <div className="profile-cont"><b>Alamat Toko</b> : 
                                {editToko ? TokoState.data.toko.alamat_toko : 
                                <input className="profile-update-form" type="text" name="alamat" defaultValue={TokoState.data.toko.alamat_toko} ref={register()} ></input>
                                } 
                            </div>
                            <div className="profile-cont"><b>Deskripsi Toko</b>  : 
                                {editToko ? TokoState.data.toko.deskripsi : 
                                <textarea className="profile-update-form textarea" type="text" name="deskripsi" defaultValue={TokoState.data.toko.deskripsi} ref={register()} ></textarea> 
                                } 
                            </div>

                            {
                                editToko ? <button onClick={() => setEditToko(false)} className="ubah" type="button">Ubah</button>:
                                <div  className="profile-update-confirm" style={ !editToko && { marginTop : "60px"}}>
                                    <button onClick={() => setEditToko(true)} className="cancel" type="button" >Batal</button>
                                    <button className="simpan" type="submit">Simpan</button>{tokoLoad && <img src={MiniLoad} alt="loading" width="80" height="70"/>}
                                </div>
                            }
                        </form>
                        
                        
                        
                    </div>
                </div>
                <div className="clear"></div>
            </div>
        )
    } else{
        history.push('/Login')
        return null
    }
}

export default ProfileBody
