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
import { Link} from 'react-router-dom'

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

    useEffect(()=> {
        document.title = `KeudePeunajoh`
        if(localStorage.getItem('SavedToken') !== null){
            setAlertLogin(true)
        }else{
            setAlertLogin(false)
        }  
    },[UserState])
    
    useEffect(()=> {
        Axios.post(`${url}Data/all_product`,{})
        .then(response => {
            dispatchProductState({type: 'FETCH_SUCCESS', payload:response.data.data})
        })
        .catch(error =>{
            dispatchProductState({type: 'FETCH_ERROR'})
        })
    },[dispatchProductState ,url])
    
    if(ProductState.error){
        return(
            <div style={{ height : "100%"}}>
               <Error/>
            </div>
        )
    }else{

        return (    
            <div style={
                ProductState.loading ? { height : "100%"}:
                {height: ""}
            }>
    
                {
                    ProductState.loading ? <Loading color="loading-white"/>:
                        <div className="content"
                            style={
                                ProductState.loading ? { height : "100%"}:
                                {height: "auto"}
                            }
                        >
                            
                            <Container style={{height: "100%"}}>
                               
                                
                                <div>
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
                                                <img
                                                    className="d-block w-100"
                                                    src={Logo}
                                                    alt="First slide"
                                                    width="800" height="300"
                                                />
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
                                </div>
                            </Container>
                            
                            <div className="clear"></div>
                        </div>
                }
            </div>
        )
    }
    
}

export default HomeBody
