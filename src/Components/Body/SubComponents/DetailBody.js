import React,{useContext,useEffect} from 'react'
import '../style/DetailBody.css'
import {ProductContext} from '../../ParentComponent'
import Loading from "../../../assets/gifs/loading.gif"
import axios from 'axios'
function DetailBody() {
    const productContext = useContext(ProductContext)
    
    useEffect(() => {
        productContext.DetailProduct.DispatchDetailProState({type: 'SET_LOADING'})
        axios.get(`http://keudepeunajoh.jsmiot.com/Data/detail_product/${productContext.proId.ProId}`)
            .then(response => {
                console.log(response.data);
                productContext.DetailProduct.DispatchDetailProState({type: 'FETCH_SUCCESS', payload:response.data})
            })
            .catch(error =>{
                console.log('error')
                productContext.DetailProduct.DispatchDetailProState({type: 'FETCH_ERROR'})
            })
    },[])
    const Data = productContext.DetailProduct.DetailProState.data.product
    return (
        <div className="content product-responsive">
            <div className="container">
            {
                    productContext.DetailProduct.DetailProState.loading ? <img src={Loading} alt=""/> :
                <div className="food-detailed">
                    <div className="food-header">
                            <div className="food-img">
                                <img src={`http://jsmiot.com/KeudePeunajoh/${Data.gambar_product}`} alt=""/>
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
                                    <a href={`http://keudepeunajoh.jsmiot.com/Data/contact/${Data.no_hp}/${Data.id}`} target="_blank">Hubungi Penjual</a>
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
            }
            </div>
        </div>
    )
}

export default DetailBody
