import React,{useContext} from 'react'
import '../style/HomeBody.css'
import Logo from "../../../assets/image/logo5.png"
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Food from './Food';
import {ProductContext} from '../../ParentComponent'
import Loading from '../../general/Loading';
import Error from '../../general/Error';


function HomeBody() {
    const {
        Product:{
            ProductState
        }
    } = useContext(ProductContext)

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
                            
                            <div className="container" style={{height: "100%"}}>
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
                                                ProductState.data.popular.map(data => 
                                                    <Carousel.Item key={data.id}>
                                                        <img
                                                            className="d-block w-100"
                                                            src={`http://localhost/keudepeunajoh-rest-api2/${data.gambar_product}`}
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
                            </div>
                            
                            <div className="clear"></div>
                        </div>
                }
            </div>
        )
    }
    
}

export default HomeBody
