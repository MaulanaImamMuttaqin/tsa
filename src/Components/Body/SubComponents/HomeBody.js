import React,{useContext, useEffect, useState} from 'react'
import '../../../assets/style/HomeBody.css'
import Logo from "../../../assets/image/logo5.png"
import { Carousel, Alert, Container } from 'react-bootstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Food from './Food';
import {ProductContext} from '../../ParentComponent'
import Loading from '../../general/Loading';
import Error from '../../general/Error';
import { Link} from 'react-router-dom';
import MiniLoad from '../../../assets/gifs/mini-loading.gif'

function HomeBody() {
    const {
        Product:{
            ProductState,
            dispatchProductState
        },
        User:{
            UserState
        },
        url
    } = useContext(ProductContext)
    const [alertLogin, setAlertLogin] = useState(false)
    const [fetchdata, setFetchData] = useState(false)
    const [emptyResult, setEmptyResult] = useState(false)
    useEffect(()=> {
        document.title = `KeudePeunajoh`
        if(localStorage.getItem('SavedToken') !== null){
            setAlertLogin(true)
        }else{
            setAlertLogin(false)
        }  
    },[UserState])
    
    // useEffect(()=> {
    //     Axios.post(`${url}Data/all_product`,{})
    //     .then(response => {
    //         dispatchProductState({type: 'FETCH_SUCCESS', payload:response.data.data})
    //     })
    //     .catch(error =>{
    //         console.log(error)
    //         dispatchProductState({type: 'FETCH_ERROR'})
    //     })
    // },[dispatchProductState ,url])
    
    const fetchNextData = () => {
        let index = ProductState.data.product.length - 1;
        let last_id = ProductState.data.product[index].id;
        console.log(last_id)
        setFetchData(true)
        Axios.get(`${url}Data/NextProduct?prod_id=${last_id}`)
        .then(response => {
            console.log(response.data.data.length)
            if(response.data.data.length !== 0) {
                dispatchProductState({type: 'FETCH_APPEND', payload:response.data.data})
            }else{
                setEmptyResult(true)
            }
            
            setFetchData(false)
        })
        .catch(error =>{
            console.log(error)
            dispatchProductState({type: 'FETCH_ERROR'})
            setFetchData(false)
        })
        
       
    }
    
    if(ProductState.error){
        return(
               <Error/>
        )
    }else{

        return (    
            <div>

                {
                    ProductState.loading ? <Loading color="loading-white"/>:
                        <div className="content" id="content">
                            
                            <Container>
                                
                                {alertLogin ?
                                    <Alert variant="info" style={{marginTop:"10px"}}>
                                        Selamat Datang, <b>{UserState.data.username}</b>
                                    </Alert>:
                                     <Alert variant="warning" style={{marginTop:"10px"}}>
                                        Anda belum login, silahkan <Link to='/Login'><b>Login</b></Link> terlebih dahulu
                                    </Alert>
                                }
                                    <div className="content-header">
                                        <h4>Paling Populer</h4>
                                    </div>
                                    <div className="slide-makan">
                                        <Carousel className="gambar-makan">
                                            <Carousel.Item>
                                                {/* <img
                                                    className="d-block w-100"
                                                    src={Logo}
                                                    alt="First slide"
                                                    width="800" height="300"
                                                /> */}
                                                <div style={{height:"300px", width:"800px", display:"flex", justifyContent:"center", alignItems:"center" }}>
                                                    <h1 style={{color: "blue", letterSpacing: "5px", fontSize:"50px",fontWeight:"bolder"}}>
                                                        TSA
                                                    </h1>
                                                </div>
                                            </Carousel.Item>
                                            {
                                                ProductState.data.popular.map(data => 
                                                    <Carousel.Item key={data.id}>
                                                        <img
                                                            className="d-block w-100"
                                                            src={`${url}${data.gambar_product}`}
                                                            alt="Second slide"
                                                            width="800" height="300"
                                                        />
                                                    </Carousel.Item>
                                                )
                                            }
                                            
                                        </Carousel>
                                    </div>
                
                                    <div className="content-header">
                                        <h4>Upload</h4>
                                    </div>
                    
                                    <div className="foods">
                                        {
                                            ProductState.data.product.map(data => 
                                                <Food key={data.id} Data={data}/>
                                            )
                                        }
                                    </div>

                            <div className="clear"></div>

                            
                                <div className="load-more">
                                    {fetchdata ? 
                                    <img src={MiniLoad} alt="loading" width="80" height="70"/>:
                                    <div>
                                    {
                                        emptyResult ? <p>Yaah, Udah Habis :(</p>:
                                        <span className="more-button" onClick={fetchNextData}>Tampilkan Lebih Banyak</span>
                                    }
                                    
                                </div>
                                    }
                                </div>
                                
                           
                            </Container>
                            
                            
                        </div>
                }
            </div>
        )
    }
    
}

export default HomeBody
