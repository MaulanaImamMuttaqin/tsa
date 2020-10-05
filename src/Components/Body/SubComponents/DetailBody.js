import React,{useContext,useEffect,useState} from 'react'
import '../style/DetailBody.css'
import {ProductContext} from '../../ParentComponent'
import axios from 'axios'
import Loading from '../../general/Loading'
import { useParams } from 'react-router-dom'
function DetailBody() {
    const {
        Toko : {
            TokoState,
            DispatchTokoState
        }, 
        Product:{
            ProductState
        }
    } = useContext(ProductContext)

    let {id} = useParams()
    // const [detail,setDetail] = useState({})
    var detail = {}
    // useEffect(() => {
    //     DispatchDetailProState({type: 'SET_LOADING'})
    //     axios.get(`http://localhost/keudepeunajoh-rest-api2/Data?id=${id}`)
    //         .then(response => {
    //             DispatchDetailProState({type: 'FETCH_SUCCESS', payload:response.data.data})
    //         })
    //         .catch(error =>{
    //             console.log('error')
    //             DispatchDetailProState({type: 'FETCH_ERROR'})
    //         })

        
        
    
    
    // },[])
    // useEffect(()=>{
        for(var prod in ProductState.data.product){
            if(ProductState.data.product[prod].id == id){
                detail = ProductState.data.product[prod]
            }
        }
    // },[ProductState])
    // console.log(ProductState)

    const Data = detail
    return (
        // <div style={ TokoState.loading ? { height : "100%"} : {height: ""} }>
        //     {
        //         TokoState.loading ? <Loading color="loading-white"/>:
                    <div className="content product-responsive">
                    
                        <div className="container">
                        
                            <div className="food-detailed">
                                <div className="food-header">
                                        <div className="food-img">
                                            <img src={`http://localhost/keudepeunajoh-rest-api2/${Data.gambar_product}`} alt=""/>
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
                                                <a href={`http://localhost/keudepeunajoh-rest-api2/Data/contact/${Data.no_hp}/${Data.id}`} target="_blank" rel="noopener noreferrer">Hubungi Penjual</a>
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
    //         } 
    // </div>

    )
}

export default DetailBody
