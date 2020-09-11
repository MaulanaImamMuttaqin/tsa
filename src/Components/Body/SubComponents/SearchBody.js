import React,{useContext, useEffect} from 'react'

import '../style/HomeBody.css'
import '../style/food.css'
import Food from './Food';
import {ProductContext} from '../../ParentComponent'
import axios from 'axios'

function SearchBody() {
    const productContext = useContext(ProductContext)

    useEffect(() => {
        productContext.SearchProduct.DispatchSearchProductState({type: 'SET_LOADING'})
        axios.get(`http://keudepeunajoh.jsmiot.com/Data/search_product/${productContext.Search.SearchState}`)
            .then(response => {
                console.log(response.data)
                productContext.SearchProduct.DispatchSearchProductState({type: 'FETCH_SUCCESS', payload:response.data})
            })
            .catch(error =>{
                console.log('error')
                productContext.SearchProduct.DispatchSearchProductState({type: 'FETCH_ERROR'})
            })
            console.log(productContext.SearchProduct.SearchProductState.loading)
    },[productContext.ButtClickSearch.ButtSearch])
    console.log(productContext.SearchProduct.SearchProductState.data.product)
    return (
        <div className="content">
            <div className="container">
                <div className="content-header">
                    <h4>Hasil berdasarkan pencarian "{productContext.ButtClickSearch.ButtSearch}"</h4>
                </div>
                <div className="foods">
                    {
                            productContext.SearchProduct.SearchProductState.loading ? <h2>bentar</h2> :
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
                        }   
                </div>
            </div>
        </div>
        
    )
}

export default SearchBody
