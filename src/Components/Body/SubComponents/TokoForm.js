import React,{useContext, useState} from 'react'
import {useForm } from 'react-hook-form'
import Loading from '../../general/Loading';
import '../style/TokoBody.css'
import {ProductContext} from '../../ParentComponent'
import {useHistory} from "react-router-dom"
import Axios from 'axios';
import {Button, Row, Col,InputGroup , FormControl, Image, Badge} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faImage } from '@fortawesome/free-solid-svg-icons'
import MiniLoad from '../../../assets/gifs/mini-loading.gif';

function TokoForm() {
    document.title = `KeudePeunajoh Buat Toko`
    const { register, handleSubmit, errors } = useForm();
    
    const {
        User:{
            UserState
        },
        Toko:{
            TokoState,
            DispatchTokoState
        }
    } = useContext(ProductContext)

    const history = useHistory()
    const [addProd, setaddProd] = useState(false)
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    
    const onSubmit = data => {
    
        const fd = new FormData();
        fd.append('id', UserState.data.id)
        fd.append('nama', data.nama)
        fd.append('alamat', data.alamat)
        fd.append('deskripsi',data.deskripsi)
        if(data.gambar[0] != null){
            fd.append('gambar', data.gambar[0], data.gambar[0].name )
        }
        setaddProd(true)
        Axios.post('http://keudepeunajohapi.jsmiot.com/Data/BuatToko',fd,{
            headers: {
                'Authorization': localStorage.getItem('SavedToken')
              }
        })
        .then(res => {
            setaddProd(true)
            DispatchTokoState({type: "FETCH_SUCCESS", payload: res.data})
            history.push('/Toko_Saya')
        }).catch(error => {
            console.log(error)
        })

    };

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
    console.log(UserState.data)
    if(localStorage.getItem('SavedToken') !== null){
        if(UserState.data.role_id === "1"){
            history.push('/Toko_Saya')
            return null
        }else{
            return (
                <div style={ TokoState.loading ? { height : "100%"} : {height: ""} }>
                {
                    TokoState.loading ? <Loading color="loading-white"/>:
                        <div className="content">
                            <div className="container">
                                <div className="content-header">
                                    <h4>Profil Toko</h4>
                                </div>
                                <div className="message">
                                    <p>Anda belum memiliki toko</p>
                                </div>
                                <div className="toko-form">
                                    <h2>Buat Toko</h2>
                                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" action="" className="form2">
                                                <Row>
                                                    <Col style={{textAlign: "center"}} xs={6} md={4}>
                                                        
                                                            <div className="previewProfilePic">
                                                                {
                                                                    picture !== null ?
                                                                    <Image  src={imgData} fluid rounded />:
                                                                    <FontAwesomeIcon icon={faImage} size="6x"/>         
                                                                    
                                                                }
                                                            </div>
                                                        
                                                            {picture !== null && 
                                                                <p>{picture.name}</p>
                                                            }
                                                        <label className="file-label" htmlFor="file" >
                                                            <h3>
                                                                <Badge variant="secondary">Masukkan Gambar <FontAwesomeIcon icon={faUpload} /></Badge>
                                                            </h3>
                                                        </label>
                                                        <input id="file" className="file" type="file" name="gambar" onChange={onChangePicture} ref={register({
                                                        validate: (value) => {
                                                            if(value[0] != null){
                                                                return value[0].size < 2048000
                                                            }
                                                            return true;
                                                        }
                                                        })}/>
                                                        {errors.gambar && <p><small style={{color: "red"}}>ukuran gambar tidak boleh lebih dari 2MB </small></p>}
                                                        
                                                    </Col>
                                                    <Col xs={12} md={8}>
                                                            <InputGroup className="mb-3">
                                                                    <FormControl
                                                                    placeholder="Masukkan Alamat Toko Anda"
                                                                    aria-label="Username"
                                                                    aria-describedby="basic-addon1"
                                                                    name="nama"
                                                                    ref={register()}
                                                                    required
                                                                    />
                                                                </InputGroup>
                                                                <InputGroup className="mb-3">
                                                                    <FormControl
                                                                    placeholder="Masukkan Alamat Toko Anda"
                                                                    aria-label="Username"
                                                                    aria-describedby="basic-addon1"
                                                                    name="alamat"
                                                                    ref={register()}
                                                                    required
                                                                    />
                                                                </InputGroup>
                                                                <InputGroup className="mb-3">
                                                                    <FormControl
                                                                    as="textarea"
                                                                    placeholder="Deskripsi Toko (opsional)"
                                                                    aria-label="Username"
                                                                    aria-describedby="basic-addon1"
                                                                    name="deskripsi"
                                                                    ref={register()}
                                                                    required
                                                                    />
                                                                </InputGroup>
                                                                <Button size="lg" variant="outline-primary" type="submit">Buat</Button>{addProd && <img src={MiniLoad} alt="loading" width="80" height="70"/>}
                                                            
                                                    </Col>
                                                </Row>
                                            </form>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div> 
                      } 
                
                
                </div>
                    
            )
        }
    }else{
        history.push('/Login')
        return null
    }
}



export default TokoForm
