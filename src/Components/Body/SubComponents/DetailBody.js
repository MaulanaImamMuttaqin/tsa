import React,{useContext , useEffect} from 'react'
import '../../../assets/style/DetailBody.css'
import {ProductContext} from '../../ParentComponent'
import { useParams } from 'react-router-dom'
import nl2br from 'react-nl2br'
import axios from 'axios';
import Loading from '../../general/Loading';
import {Container} from 'react-bootstrap';
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
                                        <div className="food-img">
                                            <img src={`http://keudepeunajohapi.jsmiot.com/${Data.gambar_product}`} alt=""/>
                                        </div>
                                        <div className="food-detail">
                                            <h3>{Data.nama_product}</h3>
                                            <p><span className="p-left">Harga  </span><span className="p-right"> Rp {numberWithCommas(Data.harga)}</span></p>
                                            <p><span className="p-left">Toko   </span><span className="p-right">{Data.nama_toko}</span></p>
                                            <p>
                                                <span className="alamat-style">
                                                    <span className="p-left">Alamat </span><span className="p-right">{Data.alamat_toko}</span>
                                                </span>
                                            </p>
                                            <div className="prod-button">
                                                <a href={`http://keudepeunajohapi.jsmiot.com/Data/contact/${Data.no_hp}/${Data.id}`} target="_blank" rel="noopener noreferrer">Hubungi Penjual</a>
                                            </div>
                                        </div>  
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
