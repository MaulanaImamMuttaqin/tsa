import React, {useContext, useState} from 'react'
import {useForm} from 'react-hook-form'
import {ProductContext} from '../../ParentComponent'
import Loading from '../../general/Loading';
import MiniLoad from '../../../assets/gifs/mini-loading.gif';
import Food from './Food'
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faImage } from '@fortawesome/free-solid-svg-icons'
import '../style/TokoBody.css'
import {useHistory} from "react-router-dom";
import { Alert, Button, Modal, Container, Row, Col,InputGroup , FormControl, Image, Badge} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TokoUser() {
    document.title = `KeudePeunajoh Toko Anda`
    const { register, handleSubmit, errors, reset  } = useForm();
    const { register:register2, handleSubmit:handleSubmit2, errors:errors2 } = useForm();
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


    const[update, setUpdate] = useState(false)//buat manggil notifikasi kalo tambah produk berhasil
    const[addProd, setaddProd] = useState(false)//buat manggil miniload
    const[wichProd, setWichProd] = useState('')
    const[show, setShow] = useState(false)
    const[editData, setEditData] = useState({})


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
    const onSubmit = data => {
        
        const fd = new FormData();
        fd.append('user_id', UserState.data.id)
        fd.append('id', TokoState.data.toko.id)
        fd.append('nama', data.nama)    
        fd.append('nama_toko', TokoState.data.toko.nama_toko)
        fd.append('harga', data.harga)
        fd.append('deskripsi',data.deskripsi)
        fd.append('gambar', data.gambar[0], data.gambar[0].name )
        setaddProd(true)
        Axios.post('http://keudepeunajohapi.jsmiot.com//Data/TambahProduk',fd,{
            headers: {
                'Authorization': localStorage.getItem('SavedToken')
              }
        })
        .then(res => {
            console.log(res.data.data)
            setaddProd(false)
            setUpdate(true)
            reset()
            setPicture(null)
            DispatchTokoState({type: "FETCH_SUCCESS", payload: res.data.data})
            setWichProd(data.nama)
        }).catch(error => {
            setaddProd(false)
            console.log(error)
        })

    }
    
    const editForm = fooddata => {
        setShow(true)
        setEditData(fooddata)
        console.log(fooddata)
        
    }

    const [del, setDelete] = useState(false)
    const [delData, setDelData] = useState({})
    const [delsuc, setDelsuc] = useState(false)
    const [delProd, setDelProd]  = useState(false)
    const delModal = deleteData => {
        setDelete(true)
        setDelData(deleteData)
        
    }
    const deleteProduct = data => {
        setDelProd(true)
        Axios.post('http://keudepeunajohapi.jsmiot.com//Data/HapusProduk',
        {
            prodId : data.id,
            userId : UserState.data.id,
            name: data.nama_product,
            nama_toko: TokoState.data.toko.nama_toko
        },{
            headers: {
                'Authorization': localStorage.getItem('SavedToken')
              }
        })
        .then(res => {
            console.log(res)
            DispatchTokoState({type: "FETCH_SUCCESS", payload: res.data.data})
            setDelProd(false)
            setDelsuc(true)
            setDelete(false)
            setWichProd(data.nama_product)
        }).catch(error => {
            setDelProd(false)
            console.log(error)
        })
    }

    const [editProd, setEditProd]  = useState(false)
    const [editSuc, setEditSuc] = useState(false)
    const onEdit = data => {
        console.log(data)
        const fd = new FormData();
        fd.append('user_id', UserState.data.id)
        fd.append('id', editData.id)    
        fd.append('nama', data.editNama)   
        fd.append('nama_toko', TokoState.data.toko.nama_toko)
        fd.append('harga', data.editHarga)
        fd.append('deskripsi',data.editDesc)
        fd.append('nama_prev',editData.nama_product)
        if(data.editGambar.length !== 0){
            fd.append('gambar', data.editGambar[0], data.editGambar[0].name )
        }
        
        setEditProd(true)
        Axios.post('http://keudepeunajohapi.jsmiot.com//Data/EditProduk',fd,{
            headers: {
                'Authorization': localStorage.getItem('SavedToken')
              }
        })
        .then(res => {
            console.log(res.data)
            setEditProd(false)
            setEditSuc(true)
            DispatchTokoState({type: "FETCH_SUCCESS", payload: res.data.data})
        }).catch(error => {
            setaddProd(false)
            console.log(error)
        })
    } 

    const cancel = () => {
        setShow(false)
        setImgDataEdit(null)
        setPictureEdit(null)
    }
    if(localStorage.getItem('SavedToken') !== null){
        return (
                
                <div style={ TokoState.loading ? { height : "100%"} : {height: ""} }>
                    {
                        TokoState.loading ? <Loading color="loading-white"/>:
                            <div className="content" style={TokoState.loading ? { height : "100%"}:{height: "auto"}}>
                                
                                <div className="container" style={{height: "100%"}}>
                                    <div className="content-header">
                                        <h4>Profil Toko</h4>
                                    </div>
                                    <div className="toko">
                                        <div className="logo-toko">
                                            <img src={`http://keudepeunajohapi.jsmiot.com//${TokoState.data.toko.gambar_toko}`} alt="gambar-toko"/>
                                        </div>
                                        <h2>{TokoState.data.toko.nama_toko}</h2>
                                        <p className="toko-ex">Alamat Toko: </p>
                                        <p>{TokoState.data.toko.alamat_toko}</p>
                                        <p className="toko-ex">Deskripsi: </p>
                                        <p className="toko-desc">{TokoState.data.toko.deskripsi}</p>
                                    </div>
                                    <div className="content-header">
                                        <h4>Tambah Produk</h4>
                                    </div>
                                    {
                                        update && <Alert variant="success" onClose={() => setUpdate(false)} dismissible>Produk {wichProd} berhasil di promosikan</Alert>
                                    }
                                    
                                    
                                    <div className="toko-form2">
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
                                                    <input id="file" className="file" type="file" name="gambar" onChange={onChangePicture} required ref={register({
                                                    validate: (value) => {
                                                        
                                                        return value[0].size < 2048000
                                                    }
                                                    })} />
                                                    {errors.gambar && <p><small style={{color: "red"}}>ukuran gambar tidak boleh lebih dari 2MB </small></p>}
                                                    
                                                </Col>
                                                <Col xs={12} md={8}>
                                                        <InputGroup className="mb-3">
                                                                <FormControl
                                                                placeholder="Masukkan Nama Produk"
                                                                aria-label="Username"
                                                                aria-describedby="basic-addon1"
                                                                name="nama"
                                                                ref={register()}
                                                                required
                                                                />
                                                            </InputGroup>
                                                            {/* <input type="text" name="nama" placeholder="Masukkan Nama Produk"  ref={register()} required/> */}
                                                            <InputGroup className="mb-3">
                                                                <FormControl
                                                                type="number"
                                                                placeholder="Masukkan Harga"
                                                                aria-label="Username"
                                                                aria-describedby="basic-addon1"
                                                                name="harga"
                                                                ref={register()}
                                                                required
                                                                />
                                                            </InputGroup>
                                                            {/* <input type="number" name="harga" placeholder="Masukkan Harga"  ref={register} required/> */}
                                                            <InputGroup className="mb-3">
                                                                <FormControl
                                                                as="textarea"
                                                                placeholder="Deskripsi Produk"
                                                                aria-label="Username"
                                                                aria-describedby="basic-addon1"
                                                                name="deskripsi"
                                                                ref={register()}
                                                                required
                                                                />
                                                            </InputGroup>
                                                            {/* <textarea name="deskripsi" id="" cols="80" rows="8" placeholder="Deskripsi Produk"  ref={register} required></textarea> */}
                                                            <Button size="lg" variant="outline-primary" type="submit">Buat</Button>{addProd && <img src={MiniLoad} alt="loading" width="80" height="70"/>}
                                                        
                                                </Col>
                                            </Row>
                                        </form>
                                    </div>
                                    

                                    <div className="content-header">
                                        <h4>Product Yang di Promosikan</h4>
                                    </div>
                                    {
                                        delsuc && <Alert variant="success" onClose={() => setDelsuc(false)} dismissible>Produk {wichProd} berhasil di hapus</Alert>
                                    }
                                    
                                    {
                                        TokoState.data.product.j_prod === 0 ?
                                        <p>Belum ada Produk yang di promosikan</p>:
                                        TokoState.data.product.map(data => 
                                            <Food key={data.id} Data={data} edit={fooddata => editForm(fooddata)} delete={deleteData => delModal(deleteData)} />
                                        )
                                    }
                                    <div className="clear"></div>
                            </div>
                                <Modal
                                    show={show}
                                    size="lg"
                                    onHide={() => {setShow(false);setPictureEdit(null);setImgDataEdit(null)}}
                                    dialogClassName="modal-90w"
                                    aria-labelledby="example-custom-modal-styling-title"
                                    centered
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-custom-modal-styling-title">
                                            Ubah Data Produk
                                        </Modal.Title>
                                    </Modal.Header>
                                    <form onSubmit={handleSubmit2(onEdit)} encType="multipart/form-data">
                                        <Modal.Body>
                                            <Container>
                                                <Row>
                                                <Col style={{textAlign: "center"}} xs={6} md={4}>
                                                    
                                                        <div className="previewProfilePic">
                                                            {
                                                                pictureEdit !== null ?
                                                                <Image  src={imgDataEdit} fluid rounded />:
                                                                <Image  src={`http://keudepeunajohapi.jsmiot.com//${editData.gambar_product}`} fluid rounded />       
                                                                
                                                            }
                                                        </div>
                                                    
                                                        {pictureEdit !== null && 
                                                            <p>{pictureEdit.name}</p>
                                                        }
                                                    <label className="file-label" htmlFor="editfile" >
                                                        <h3>
                                                            <Badge variant="secondary">Masukkan Gambar <FontAwesomeIcon icon={faUpload} /></Badge>
                                                        </h3>
                                                    </label>
                                                    <input id="editfile" className="file" type="file" name="editGambar" onChange={onChangePictureEdit} ref={register2({
                                                    validate: (value) => {
                                                        if(value.length === 0){
                                                            return true
                                                        }
                                                        return value[0].size < 2048000
                                                        
                                                    }
                                                    })}/>
                                                    {errors2.editGambar && <p><small style={{color: "red"}}>ukuran gambar tidak boleh lebih dari 2MB </small></p>}
                                                    
                                                </Col>
                                                    <Col xs={12} md={8}>
                                                            <label htmlFor="nama">Nama Produk:</label>
                                                            <InputGroup className="mb-3">
                                                                <FormControl
                                                                placeholder="Nama Produk"
                                                                aria-label="Username"
                                                                aria-describedby="basic-addon1"
                                                                defaultValue={editData.nama_product}
                                                                name="editNama"
                                                                ref={register2()}
                                                                />
                                                            </InputGroup>
                                                            <label htmlFor="harga">Harga Produk:</label>
                                                            <InputGroup className="mb-3">
                                                                <FormControl
                                                                type="number"
                                                                placeholder="Harga Produk"
                                                                aria-label="Username"
                                                                aria-describedby="basic-addon1"
                                                                defaultValue={editData.harga}
                                                                name="editHarga"
                                                                ref={register2()}
                                                                />
                                                            </InputGroup>
                                                            <label htmlFor="desc">Deskripsi:</label>
                                                            <InputGroup className="mb-3">
                                                                <FormControl
                                                                as="textarea"
                                                                placeholder="Deskripsi Produk"
                                                                aria-label="Username"
                                                                aria-describedby="basic-addon1"
                                                                defaultValue={editData.deskripsi}
                                                                name="editDesc"
                                                                ref={register2()}
                                                                />
                                                            </InputGroup>
                                                            {editProd && <img src={MiniLoad} alt="loading" width="80" height="70"/>}
                                                            {
                                                                editSuc && <Alert variant="success" onClose={() => setEditSuc(false)} dismissible>Produk berhasil di perbaharui</Alert>
                                                            }
                                                    </Col>
                                                    
                                                </Row>
                                            </Container>
                                            
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={cancel}>Batal</Button>
                                            <Button type="submit">Simpan</Button>
                                        </Modal.Footer>
                                    </form>
                                </Modal>


                                <Modal show={del} onHide={()=> setDelete(false)} centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Hapus Produk</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Hapus produk "{delData.nama_product}"?
                                        {delProd && <img src={MiniLoad} alt="loading" width="80" height="70"/>}
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={()=> setDelete(false)}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={()=>deleteProduct(delData)}>
                                        Hapus
                                    </Button>
                                    </Modal.Footer>
                                </Modal>

                            
                        </div>
                        
                    } 
                    
                    
                </div>
        )
    }
    else{
        history.push('/Login')
        return null
    }
}
    


export default TokoUser
