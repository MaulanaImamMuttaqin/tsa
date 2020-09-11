import React,{useContext, useEffect} from 'react'
import '../style/HomeBody.css'
import Logo from "../../../assets/image/logo5.png"
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Food from './Food';
import {ProductContext} from '../../ParentComponent'
import axios from 'axios'

function HomeBody() {
    const productContext = useContext(ProductContext)

    useEffect(() => {
        productContext.Product.dispatchProductState({type: 'SET_LOADING'})
        axios.get('http://keudepeunajoh.jsmiot.com/Data/list_product')
            .then(response => {
                productContext.Product.dispatchProductState({type: 'FETCH_SUCCESS', payload:response.data})
            })
            .catch(error =>{
                productContext.Product.dispatchProductState({type: 'FETCH_ERROR'})
            })
        
    },[])
    // console.log( productContext.Product.ProductState.data);
    return (
        <div className="content">
            <div className="container">
                {
                    productContext.Product.ProductState.loading ? <h2>bentar</h2> :
                    <div>
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
                            productContext.Product.ProductState.data.popular.map(data => 
                                <Carousel.Item key={data.id}>
                                    <img
                                        className="d-block w-100"
                                        src={`http://jsmiot.com/KeudePeunajoh/${data.gambar_product}`}
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
                        productContext.Product.ProductState.data.product.map(data => 
                            <Food key={data.id} Data={data}/>
                        )
                    }
                    
                </div>
                    </div>
                }
                
            </div>
            <div className="clear"></div>
        </div>
        
    )
    
}

export default HomeBody
