import React,{useContext,useEffect} from 'react'
import '../style/DetailBody.css'
import {ProductContext} from '../../ParentComponent'
import axios from 'axios'
import Loading from '../../general/Loading'
import { useParams } from 'react-router-dom'
function DetailBody() {
    const {
        DetailProduct:{
            DetailProState,
            DispatchDetailProState
        }, 
        Product:{
            ProductState
        }
    } = useContext(ProductContext)

    let {id} = useParams()
    useEffect(() => {
        DispatchDetailProState({type: 'SET_LOADING'})
        axios.get(`http://localhost/keudepeunajoh-rest-api/api/Data?id=${id}`)
            .then(response => {
                DispatchDetailProState({type: 'FETCH_SUCCESS', payload:response.data.data})
            })
            .catch(error =>{
                console.log('error')
                DispatchDetailProState({type: 'FETCH_ERROR'})
            })
    },[])
    const Data = DetailProState.data.product
    return (
        <div style={
            ProductState.loading ? { height : "100%"}:
            {height: ""}
        }>
            {
                DetailProState.loading ? <Loading color="loading-white"/> :
            <div className="content product-responsive"
            style={
                ProductState.loading ? { height : "100%"}:
                {height: "auto"}
            }
            >
               
                <div className="container">
                
                    <div className="food-detailed">
                        <div className="food-header">
                                <div className="food-img">
                                    <img src={`http://localhost/keudepeunajoh-rest-api/${Data.gambar_product}`} alt=""/>
                                </div>
                                <div className="food-detail">
                                    <h3>{Data.nama_product}</h3>
                                    <p><span className="p-left">Harga  </span><span className="p-right"> Rp {Data.harga}</span></p>
                                    <p><span className="p-left">Toko   </span><span className="p-right">{Data.nama_toko}</span></p>
                                    <p>
                                        <span className="alamat-style">
                                            <span className="p-left">Alamat </span><span className="p-right">{Data.alamat_toko}</span>
                                        </span>
                                    </p>
                                    <div className="prod-button">
                                        <a href={`http://localhost/keudepeunajoh-rest-api/${Data.no_hp}/${Data.id}`} target="_blank" rel="noopener noreferrer">Hubungi Penjual</a>
                                    </div>
                                </div>  
                                <div className="clear"></div>
                        </div>
                        <div className="food-desc">
                            <div className="content-header">
                                <h4>Deskripsi Produk</h4>
                            </div>
                            <p>{Data.deskripsi}</p>
                        </div>
                    </div>
                
                </div>
                
            </div>
            }
        </div>
    )
}

export default DetailBody
