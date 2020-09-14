import React,{useContext,useEffect} from 'react'
import '../style/DetailBody.css'
import {ProductContext} from '../../ParentComponent'
import axios from 'axios'
import Loading from '../../general/Loading'
function DetailBody(props) {
    const productContext = useContext(ProductContext)
    const { match:{ params }}= props
    useEffect(() => {
        productContext.DetailProduct.DispatchDetailProState({type: 'SET_LOADING'})
        axios.get(`http://keudepeunajoh.jsmiot.com/Data/detail_product/${params.id}`)
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
        <div style={
            productContext.Product.ProductState.loading ? { height : "100%"}:
            {height: ""}
        }>
            {
                productContext.DetailProduct.DetailProState.loading ? <Loading color="loading-white"/> :
            <div className="content product-responsive"
            style={
                productContext.Product.ProductState.loading ? { height : "100%"}:
                {height: "auto"}
            }
            >
               
                <div className="container">
                
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
                                        <a href={`http://keudepeunajoh.jsmiot.com/Data/contact/${Data.no_hp}/${Data.id}`} target="_blank" rel="noopener noreferrer">Hubungi Penjual</a>
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
