import React,{useContext , useEffect} from 'react'
import '../../../assets/style/DetailBody.css'
import {ProductContext} from '../../ParentComponent'
import { useParams } from 'react-router-dom'
import nl2br from 'react-nl2br'
import axios from 'axios';
import Loading from '../../general/Loading';
import {Container,Row, Col} from 'react-bootstrap';
function DetailBody() {
    const {
        DetailProduct: {
            DetailProState,
            DispatchDetailProState
        }
    } = useContext(ProductContext)

    let {id} = useParams()
    
    useEffect(() => {
        document.title = `KeudePeunajoh Produk`
        DispatchDetailProState({type: 'SET_LOADING'})
        axios.get(`http://keudepeunajohapi.jsmiot.com/Data?id=${id}`)
            .then(response => {
                DispatchDetailProState({type: 'FETCH_SUCCESS', payload:response.data.data})
                
            })
            .catch(error =>{
                console.log('error')
                DispatchDetailProState({type: 'FETCH_ERROR'})
            })
            // 
    },[])
    const numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const Data = DetailProState.data.product

    return (
        <div style={ DetailProState.loading ? { height : "100%"} : {height: ""} }>
            {
                DetailProState.loading ? <Loading color="loading-white"/>:
                    <div className="content product-responsive">
                    
                        <Container>
                        
                            <div className="food-detailed">
                                <div className="food-header">
                                    <Row>
                                        <Col sm={5} >
                                            <div className="food-img">
                                                <img src={`http://keudepeunajohapi.jsmiot.com/${Data.gambar_product}`} alt=""/>
                                            </div>
                                        </Col>
                                        <Col sm={7}>
                                            <div className="food-detail" >
                                                <h3>{Data.nama_product}</h3>
                                                <Row className="detailed">
                                                    <Col xs={2}><span>Harga</span></Col>
                                                    <Col xs={10}><span>Rp {numberWithCommas(Data.harga)}</span></Col>
                                                </Row>
                                                <Row className="detailed">
                                                    <Col xs={2}><span>Toko</span></Col>
                                                    <Col xs={10}><span>{Data.nama_toko}</span></Col>
                                                </Row>
                                                <Row className="detailed">
                                                    <Col xs={2}><span>Alamat</span></Col>
                                                    <Col xs={10}><span>{Data.alamat_toko}</span></Col>
                                                </Row>
                                                <div className="prod-button">
                                                    <a href={`http://keudepeunajohapi.jsmiot.com/Data/contact/${Data.no_hp}/${Data.id}`} target="_blank" rel="noopener noreferrer">Hubungi Penjual</a>
                                                </div>
                                            </div>  
                                        </Col>
                                    </Row>
                                        
                                        
                                        <div className="clear"></div>
                                </div>
                                <div className="food-desc">
                                    <div className="content-header">
                                        <h4>Deskripsi Produk</h4>
                                    </div>
                                    <p>{nl2br(Data.deskripsi)}</p>
                                </div>
                            </div>
                        
                        </Container>
                        
                    </div>
            } 
    </div>

    )
}

export default DetailBody
