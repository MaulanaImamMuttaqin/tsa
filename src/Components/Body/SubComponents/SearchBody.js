import React,{useContext, useEffect} from 'react'
import '../style/HomeBody.css'
import '../style/food.css'
import Food from './Food';
import {ProductContext} from '../../ParentComponent'
import axios from 'axios'
import Loading from '../../general/Loading';
import { useParams } from 'react-router-dom'
function SearchBody() {
    const productContext = useContext(ProductContext)
    let {key} = useParams()

    useEffect(() => {
        productContext.SearchProduct.DispatchSearchProductState({type: 'SET_LOADING'})
        axios.get(`http://keudepeunajoh.jsmiot.com/Data/search_product/${key}`)
            .then(response => {
                productContext.SearchProduct.DispatchSearchProductState({type: 'FETCH_SUCCESS', payload:response.data})
            })
            .catch(error =>{
                console.log('error')
                productContext.SearchProduct.DispatchSearchProductState({type: 'FETCH_ERROR'})
            })
    
    },[productContext.ButtClickSearch.ButtSearch])
    console.log("params",key)
    return (
        <div style={
            productContext.Product.ProductState.loading ? { height : "100%"}:
            {height: ""}
        }>
            {
                productContext.SearchProduct.SearchProductState.loading ? <Loading color="loading-white"/> :
            <div className="content"
            style={
                productContext.Product.ProductState.loading ? { height : "100%"}:
                {height: "auto"}
            }
            >
                
                <div className="container">
                    <div className="content-header">
                        <h4>Hasil berdasarkan pencarian "{key}"</h4>
                    </div>
                    <div className="foods">
                        
                                <div>
                                    {productContext.SearchProduct.SearchProductState.data.product === false
                                        ? <p>Tidak hasil pencarian untuk {productContext.ButtClickSearch.ButtSearch}</p>
                                        : <div className="foods">
                                        {
                                             productContext.SearchProduct.SearchProductState.data.product.map(data => 
                                                <Food key={data.id} Data={data}/>
                                            )
                                        }
                                        
                                    </div>
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

export default SearchBody
